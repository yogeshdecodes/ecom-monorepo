import React from 'react';
import Menu from './Menu';

const Base = ({
  title = 'default title',
  description = 'defalt description',
  className = ' p-4',
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron   text-center">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={className}>{children}</div>
        </div>
      </div>
      <footer className="footer mt-auto py">
        <div className="container-fluid bg-success text-white text-center">
          <h4>If you have question please reach out</h4>
          <button className="btn btn-warning btn-lg">contact-us</button>
        </div>
      </footer>
    </div>
  );
};

export default Base;
