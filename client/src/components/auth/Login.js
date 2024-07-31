import React, { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='container'>
      <div className='wrapper'>
        <div className='title'>eVote</div>
        <form onSubmit={onSubmit}>
          <div className='field'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
            <label>Email Address</label>
          </div>
          <div className='field'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
              minLength='6'
              required
            />
            <label>Password</label>
          </div>
          <div className='field'>
            <input type='submit' value='Login' />
          </div>
          <div className='signup-link'>
            Don't have an account? <span>Visit Comelec</span>
          </div>
        </form>
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
