import { React, useState } from 'react';
import { signup } from '../auth/helper/index';
import Base from '../core/Base';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
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
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in signup'));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                onChange={handleChange('name')}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Email</label>

              <input
                className="form-control"
                onChange={handleChange('email')}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>

              <input
                className="form-control"
                onChange={handleChange('password')}
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn-success btn-block">
              submit
            </button>
          </form>
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
