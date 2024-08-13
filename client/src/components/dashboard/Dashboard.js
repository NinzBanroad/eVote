import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import { getAllCandidates } from '../../actions/candidate';
import AdminDashboard from './AdminDashboard';
import CandidateDashboard from './CandidateDashboard';
import UserDashboard from './UserDashboard';
import UserReceipt from '../users/UserReceipt';
import CandidateReceipt from '../candidates/CandidateReceipt';

const Dashboard = ({
  getAllCandidates,
  auth: { user },
  candidate: { loading, candidates },
}) => {
  useEffect(() => {
    getAllCandidates();
  }, [getAllCandidates]);

  return (
    <>
      <Navbar />
      {user === null ? (
        <Spinner />
      ) : (
        <section className='container'>
          {user.role === 'admin' ? <AdminDashboard /> : <></>}
          {user.role === 'candidate' ? <CandidateDashboard /> : <></>}
          {user.role === 'user' ? <UserDashboard /> : <></>}
        </section>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getAllCandidates: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  candidate: state.candidate,
});

export default connect(mapStateToProps, { getAllCandidates })(Dashboard);
