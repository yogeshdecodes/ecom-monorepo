import { React, useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error || data.errors) {
          const err = data.error ? data.error : data.errors[0].msg;
          setValues({ ...values, error: err, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log('signin failed'));
  };

  const signinForm = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input
                      onChange={handleChange('email')}
                      value={email}
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      onChange={handleChange('password')}
                      value={password}
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label" for="customCheck1">
                      Remember password
                    </label>
                  </div>
                  <button
                    onClick={onSubmit}
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <hr className="my-4" />
                  {/* <button
                    class="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i class="fab fa-google mr-2"></i> Sign in with Google
                  </button>
                  <button
                    class="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook
                  </button> */}
                  <Link className="d-block text-center mt-2 small" to="/signup">
                    Don't have an account? Sign Up
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="signin page" description="A page for user signin">
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
