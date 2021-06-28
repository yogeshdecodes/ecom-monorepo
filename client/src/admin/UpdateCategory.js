import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCategory = ({ match }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //   const [category, setCategory] = useState('');
  const [name, setName] = useState('');

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError('');
          setSuccess(true);
          setName('');
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to update category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead text-dark">change category name</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            defaultValue={name}
            placeholder="for ex. summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            update category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="categories"
      description="update category here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <h1>
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
          </h1>
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
