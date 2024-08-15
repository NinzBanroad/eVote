import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import formatDate from '../../utils/formatDate';
import { getCandidateVote, getCurrentCandidate } from '../../actions/candidate';

const CandidateReceipt = ({
  getCandidateVote,
  getCurrentCandidate,
  auth: { user },
  candidate: { hasvoted, loading, vote },
}) => {
  useEffect(() => {
    getCandidateVote(user._id);
    getCurrentCandidate(user._id);
  }, [getCandidateVote]);

  return (
    <>
      <Navbar />
      {vote === null ? (
        <Spinner />
      ) : hasvoted === true ? (
        <section className='container'>
          <h1 className='large text-primary'>Thanks for Voting!</h1>

          <div className='receipt-header'>
            <h1>Your Vote</h1>
            <p>
              Date: {vote && formatDate(vote.date)}
              <br />
              Receipt #: {vote && vote.id}
            </p>
          </div>

          {vote && (
            <>
              <div className='receipt-content'>
                <div className='receipt-item'>
                  <span>Chairman</span>
                  <span>
                    {vote.chairman.firstname} {vote.chairman.lastname}
                  </span>
                </div>
              </div>
            </>
          )}

          {vote &&
            vote.councelors.map((item, index) => (
              <div className='receipt-content'>
                <div className='receipt-item'>
                  <span>Councelor {index + 1}</span>
                  <span>
                    {item.firstname} {item.lastname}
                  </span>
                </div>
              </div>
            ))}

          {vote && (
            <>
              <div className='receipt-content'>
                <div className='receipt-item'>
                  <span>SK Chairman</span>
                  <span>
                    {vote.skchairman.firstname} {vote.skchairman.lastname}
                  </span>
                </div>
              </div>
            </>
          )}
        </section>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

CandidateReceipt.propTypes = {
  getCandidateVote: PropTypes.func.isRequired,
  getCurrentCandidate: PropTypes.func.isRequired,
  candidate: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  candidate: state.candidate,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCandidateVote,
  getCurrentCandidate,
})(CandidateReceipt);
