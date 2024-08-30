import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import AdminDashboard from '../dashboard/AdminDashboard';
import CandidateDashboard from '../dashboard/CandidateDashboard';
import UserDashboard from '../dashboard/UserDashboard';
import Dashboard from '../dashboard/Dashboard';

const PrivateRoute = ({
  component: Component,
  auth: { user, isAuthenticated, loading },
}) => {
  if (loading) {
    <Spinner />;
    if (user && user.role === 'admin') return <Dashboard />;
    if (user && user.role === 'user') return <Dashboard />;
    if (user && user.role === 'candidate') return <Dashboard />;
  }
  if (isAuthenticated) return <Component />;

  return <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
