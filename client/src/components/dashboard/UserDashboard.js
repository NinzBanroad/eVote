import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import { getAllCandidates } from '../../actions/candidate';

const UserDashboard = ({
  getAllCandidates,
  auth: { user },
  candidate: { loading, candidates },
}) => {
  useEffect(() => {
    getAllCandidates();
  }, [getAllCandidates]);

  console.log(candidates);

  return (
    <form>
      <>
        <h1 className='large text-primary'>User Dashboard</h1>
        <p>Chairman</p>
        <input type='checkbox' id='vehicle1' name='vehicle1' value='Bike' />
        <label for='vehicle1'>Nino</label>
        <br />
        <br />
        <p>Counselors</p>
        <input type='checkbox' id='vehicle2' name='vehicle2' value='Car' />
        <label for='vehicle2'>Ivy</label>
        <br />
        <br />
        <p>SK Chairman</p>
        <input type='checkbox' id='vehicle3' name='vehicle3' value='Boat' />
        <label for='vehicle3'>Pedro</label>
        <br />
        <br />
        <input type='submit' value='Submit' />
      </>
    </form>
  );
};

UserDashboard.propTypes = {
  getAllCandidates: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  candidate: state.candidate,
});

export default connect(mapStateToProps, { getAllCandidates })(UserDashboard);
