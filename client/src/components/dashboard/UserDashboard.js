import React, { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import { getAllCandidates } from '../../actions/candidate';
import { addUserVote, getUserVote } from '../../actions/user';
import { selectFields } from 'express-validator/lib/field-selection';

const UserDashboard = ({
  getAllCandidates,
  auth: { user },
  candidate: { loading, candidates },
  addUserVote,
  getUserVote,
}) => {
  useEffect(() => {
    getAllCandidates();
  }, [getAllCandidates]);

  const navigate = useNavigate();

  const [selectedChairman, setSelectedChairman] = useState('');
  const [selectedSKChairman, setSelectedSKChairman] = useState('');
  const [selectedCouncelors, setSelectedCouncelors] = useState([]);
  const minSelection = 7;

  const handleOnChangeChairman = (e) => {
    const { value, checked } = e.target;
    setSelectedChairman(value);
  };

  const handleOnChangeSKChairman = (e) => {
    const { value, checked } = e.target;
    setSelectedSKChairman(value);
  };

  const handleOnChangeCouncelors = (e) => {
    // Destructuring
    const { value, checked } = e.target;

    // Case 1 : The user checks the box
    if (checked) {
      if (selectedCouncelors.length >= minSelection) {
        alert(`Select only ${minSelection} councelors!`);
        e.target.checked = false;
        return;
      }
      setSelectedCouncelors([...selectedCouncelors, value]);
    }
    // Case 2  : The user unchecks the box
    else {
      setSelectedCouncelors(
        selectedCouncelors.filter((item) => item !== value)
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (selectedCouncelors.length < minSelection) {
      alert(`Please select up to ${minSelection} councelors!`);
    } else {
      //check for confirmation
      const confirmation = window.confirm(
        'Are you sure you want to submit your vote now?'
      );

      if (confirmation === false) {
        return false;
      } else {
        const formData = {
          user: user._id,
          chairman: selectedChairman,
          councelors: selectedCouncelors,
          skchairman: selectedSKChairman,
        };

        addUserVote(formData).then(() => {
          if (user) {
            getUserVote(user._id);
          }
          navigate('/user-receipt');
        });
      }
    }
  };

  return (
    <>
      {candidates === null ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <>
            <h1 className='large text-primary'>User Dashboard</h1>
            <p>Chairman</p>
            {candidates.map((item) =>
              item.position === 'Chairman' ? (
                <>
                  <input
                    type='radio'
                    value={item._id}
                    checked={selectedChairman === item._id}
                    onChange={handleOnChangeChairman}
                  />{' '}
                  <label htmlFor={`custom-checkbox-${item._id}`}>
                    {item.firstname} {item.lastname}
                  </label>
                  <br></br>
                </>
              ) : (
                <></>
              )
            )}
            <br />
            <p>Councelors</p>
            {candidates.map((item, index) =>
              item.position === 'Councelor' ? (
                <>
                  <div key={item._id} className='form-group'>
                    <input
                      type='checkbox'
                      id={`custom-checkbox-${item._id}`}
                      value={item._id}
                      onChange={handleOnChangeCouncelors}
                    />{' '}
                    <label htmlFor={`custom-checkbox-${item._id}`}>
                      {item.firstname} {item.lastname}{' '}
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
            <br />
            <p>SK Chairman</p>
            {candidates.map((item, index) =>
              item.position === 'SK Chairman' ? (
                <>
                  <input
                    type='radio'
                    value={item._id}
                    checked={selectedSKChairman === item._id}
                    onChange={handleOnChangeSKChairman}
                  />{' '}
                  <label htmlFor={`custom-checkbox-${item._id}`}>
                    {item.firstname} {item.lastname}
                  </label>
                  <br></br>
                </>
              ) : (
                <></>
              )
            )}
            <br />
            <input type='submit' value='Submit' />
          </>
        </form>
      )}
    </>
  );
};

UserDashboard.propTypes = {
  getAllCandidates: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
  addUserVote: PropTypes.func.isRequired,
  getUserVote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  candidate: state.candidate,
});

export default connect(mapStateToProps, {
  getAllCandidates,
  addUserVote,
  getUserVote,
})(UserDashboard);
