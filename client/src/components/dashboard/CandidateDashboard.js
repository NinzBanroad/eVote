import React, { useEffect, useState, Fragment } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Modal from '../layout/Modal';
import Spinner from '../layout/Spinner';
import {
  getAllCandidates,
  addCandidateVote,
  getCandidateVote,
  addUpdatePlatform,
  deletePlatform,
  getPlatform,
  getCurrentCandidate,
} from '../../actions/candidate';

const CandidateDashboard = ({
  getAllCandidates,
  auth: { user },
  candidate: { hasvoted, platform, loading, candidates },
  addCandidateVote,
  getCandidateVote,
  getPlatform,
  addUpdatePlatform,
  deletePlatform,
  getCurrentCandidate,
}) => {
  useEffect(() => {
    getAllCandidates();
    getPlatform(user._id);
    getCurrentCandidate(user._id);
  }, [getAllCandidates]);

  const [selectedChairman, setSelectedChairman] = useState('');
  const [selectedSKChairman, setSelectedSKChairman] = useState('');
  const [selectedCouncelors, setSelectedCouncelors] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [activeTab, setActiveTab] = useState('Vote');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCandidateInfo, setIsModalOpenCandidateInfo] =
    useState(false);
  const [platformData, setPlatformData] = useState({ candidateplatform: '' });
  const minSelection = 7;
  const navigate = useNavigate();
  const { candidateplatform } = platformData;

  //open modal when trigger and set the isModalOpen state to true
  const openModal = () => {
    setIsModalOpen(true);
  };

  //close modal when trigger and set the isModalOpen state to false
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //open modal when trigger and set the isModalOpen state to true
  const openModalCandidateInfo = (item) => {
    setIsModalOpenCandidateInfo(true);
    setSelectedCandidate(item);
  };

  //close modal when trigger and set the isModalOpen state to false
  const closeModalCandidateInfo = () => {
    setIsModalOpenCandidateInfo(false);
  };

  const handleDeletePlatform = () => {
    deletePlatform(user._id);
  };

  //when tab is click the activeTab state will change depends on which tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

    // Case 1 : The candidate checks the box
    if (checked) {
      if (selectedCouncelors.length >= minSelection) {
        alert(`Select only ${minSelection} councelors!`);
        e.target.checked = false;
        return;
      }
      setSelectedCouncelors([...selectedCouncelors, value]);
    }
    // Case 2  : The candidate unchecks the box
    else {
      setSelectedCouncelors(
        selectedCouncelors.filter((item) => item !== value)
      );
    }
  };

  const noPlatform = (
    <p>
      No Added Platform <button onClick={openModal}>ADD</button>
    </p>
  );

  const withPlatform = (
    <p>
      {platform} <button onClick={openModal}>UPDATE</button>{' '}
      <button onClick={handleDeletePlatform}>DELETE</button>
    </p>
  );

  const onChangePlatform = (e) =>
    setPlatformData({ ...platformData, [e.target.name]: e.target.value });

  const onSubmitPlatform = (e) => {
    e.preventDefault();

    const formData = {
      candidate: user._id,
      platform: candidateplatform,
    };

    addUpdatePlatform(formData);

    //after submitting will close the modal
    setIsModalOpen(false);
  };

  const onSubmitVote = (e) => {
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
          candidate: user._id,
          chairman: selectedChairman,
          councelors: selectedCouncelors,
          skchairman: selectedSKChairman,
        };

        addCandidateVote(formData).then(() => {
          if (user) {
            getCandidateVote(user._id);
          }
          navigate('/candidate-receipt');
        });
      }
    }
  };

  return (
    <>
      {candidates === null ? (
        <Spinner />
      ) : (
        <>
          {hasvoted && hasvoted === true ? (
            navigate('/candidate-receipt')
          ) : (
            <>
              <div>
                <h1 className='large text-primary'>Candidate Dashboard</h1>
                <ul className='tab-list'>
                  <li
                    key={'Vote'}
                    className={`tab-list-item ${
                      'Vote' === activeTab ? 'active' : ''
                    }`}
                    onClick={() => handleTabClick('Vote')}
                  >
                    Vote
                  </li>
                  <li
                    key={'Platform'}
                    className={`tab-list-item ${
                      'Platform' === activeTab ? 'active' : ''
                    }`}
                    onClick={() => handleTabClick('Platform')}
                  >
                    Platform
                  </li>
                </ul>
                <div className='tab-content'>
                  {'Vote' === activeTab ? (
                    <div key={'Vote'}>
                      <form onSubmit={onSubmitVote}>
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
                              <label
                                htmlFor={`custom-checkbox-${item._id}`}
                                onClick={() => openModalCandidateInfo(item)}
                                style={{ cursor: 'pointer' }}
                              >
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
                                  value={item._id}
                                  onChange={handleOnChangeCouncelors}
                                />{' '}
                                <label
                                  onClick={() => openModalCandidateInfo(item)}
                                  style={{ cursor: 'pointer' }}
                                >
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
                              <label
                                onClick={() => openModalCandidateInfo(item)}
                                style={{ cursor: 'pointer' }}
                              >
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
                      </form>
                    </div>
                  ) : (
                    <div key={'Platform'}>
                      <Fragment>
                        {platform === null ? noPlatform : withPlatform}
                      </Fragment>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
      <Modal show={isModalOpen} onClose={closeModal}>
        <form onSubmit={onSubmitPlatform}>
          <textarea
            type='candidateplatform'
            className='platform-textarea'
            placeholder='Enter a platform...'
            maxlength='1000'
            minlength='100'
            name='candidateplatform'
            onChange={onChangePlatform}
            value={candidateplatform}
            required
          ></textarea>
          <br />
          <input type='submit' value='Submit' />
        </form>
      </Modal>
      <Modal show={isModalOpenCandidateInfo} onClose={closeModalCandidateInfo}>
        <div>
          <h1>
            {selectedCandidate.firstname} {selectedCandidate.lastname}
          </h1>
          {selectedCandidate.image && (
            <img
              src={require(`../../../../uploads/${selectedCandidate.image}`)}
              alt='Uploaded'
            />
          )}
          <p>{selectedCandidate.platform}</p>
        </div>
      </Modal>
    </>
  );
};

CandidateDashboard.propTypes = {
  getAllCandidates: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
  addCandidateVote: PropTypes.func.isRequired,
  getCandidateVote: PropTypes.func.isRequired,
  getPlatform: PropTypes.func.isRequired,
  addUpdatePlatform: PropTypes.func.isRequired,
  deletePlatform: PropTypes.func.isRequired,
  getCurrentCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  candidate: state.candidate,
});

export default connect(mapStateToProps, {
  getAllCandidates,
  addCandidateVote,
  getCandidateVote,
  getPlatform,
  addUpdatePlatform,
  deletePlatform,
  getCurrentCandidate,
})(CandidateDashboard);
