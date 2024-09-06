import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Philippines Barangay Election</h1>
          <p className='lead'>The choice for better change. Vote Wisely!</p>
          <div className='buttons'>
            <a
              href='https://pcij.org/2024/07/11/2025-philippine-elections-blog-midterm-polls/'
              target='_blank'
              className='btn btn-primary'
            >
              Read more
            </a>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
          <br />
          <div>
            <small>Powered by eVote. All Rights Reserved 2024.</small>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
