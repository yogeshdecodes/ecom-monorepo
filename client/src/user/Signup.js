import { React, useState } from 'react';
import { signup } from '../auth/helper/index';
import Base from '../core/Base';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    error: '',
    success: false,
  });

  const { name, email, password, confirm_password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });

    if (name === 'confirm_password' && event.target.value != password) {
      event.target.setCustomValidity("Passwords Don't Match");
    } else {
      event.target.setCustomValidity('');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error || data.errors) {
          const err = data.error ? data.error : data.errors[0].msg;
          setValues({ ...values, error: err, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch((err) => console.log('Error in signup', err));
  };

  const signupForm = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input
                      onChange={handleChange('name')}
                      value={name}
                      type="text"
                      id="inputUserame"
                      className="form-control"
                      placeholder="Username"
                      required
                      autoFocus
                    />
                    <label for="inputUserame">Name</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      onChange={handleChange('email')}
                      value={email}
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <hr />

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

                  <div className="form-label-group">
                    <input
                      onChange={handleChange('confirm_password')}
                      value={confirm_password}
                      type="password"
                      id="inputConfirmPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputConfirmPassword">Confirm password</label>
                  </div>

                  <button
                    onClick={onSubmit}
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Register
                  </button>

                  <hr className="my-4" />
                  {/* <button
                    class="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i class="fab fa-google mr-2"></i> Sign up with Google
                  </button>
                  <button
                    class="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i class="fab fa-facebook-f mr-2"></i> Sign up with Facebook
                  </button> */}
                  <Link className="d-block text-center mt-2 small" to="/signin">
                    Already have an account? Sign In
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
          >
            New account was created successfully. Please{' '}
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
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
    <Base title="signup page" description="A page for user signup">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </Base>
  );
};

export default Signup;
