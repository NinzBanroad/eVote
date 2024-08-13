import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import formatDate from '../../utils/formatDate';
import { getUserVote } from '../../actions/user';

const UserReceipt = ({
  getUserVote,
  auth: { user },
  user: { loading, vote },
}) => {
  useEffect(() => {
    getUserVote(user._id);
  }, [getUserVote]);

  return (
    <>
      <Navbar />
      {vote === null ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

UserReceipt.propTypes = {
  getUserVote: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserVote })(UserReceipt);
