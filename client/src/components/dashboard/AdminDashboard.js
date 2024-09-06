import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllCandidatesFromAdmin,
  getAllUsersFromAdmin,
  addCandidate,
  addUser,
  deleteCandidate,
  deleteUser,
  updateUser,
  updateCandidate,
} from '../../actions/admin';
import Spinner from '../layout/Spinner';
import Modal from '../layout/Modal';
import formatDate from '../../utils/formatDate';
import Moment from 'react-moment';

const initialState = {
  role: '',
  position: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  age: '',
  birthdate: '',
  address: '',
  civilstatus: '',
  citizenship: '',
};

const AdminDashboard = ({
  addCandidate,
  addUser,
  getAllCandidatesFromAdmin,
  getAllUsersFromAdmin,
  deleteCandidate,
  deleteUser,
  updateCandidate,
  updateUser,
  admin: { loading, candidates, users },
}) => {
  useEffect(() => {
    getAllCandidatesFromAdmin();
    getAllUsersFromAdmin();
  }, [getAllUsersFromAdmin, getAllCandidatesFromAdmin]);

  const [formData, setFormData] = useState(initialState);

  const {
    role,
    position,
    firstname,
    lastname,
    email,
    password,
    age,
    birthdate,
    address,
    civilstatus,
    citizenship,
  } = formData;

  const [activeTab, setActiveTab] = useState('Users');
  const [file, setFile] = useState(null);
  const [isModalOpenAddUserForm, setIsModalOpenAddUserForm] = useState(false);
  const [isModalOpenAddCandidateForm, setIsModalOpenAddCandidateForm] =
    useState(false);
  const [isModalOpenUpdateUserForm, setIsModalOpenUpdateUserForm] =
    useState(false);
  const [isModalOpenUpdateCandidateForm, setIsModalOpenUpdateCandidateForm] =
    useState(false);

  const [filename, setFilename] = useState('Choose File');
  const [userId, setUserId] = useState('');
  const [candidateId, setcandidateId] = useState('');

  //open modal when trigger and set the isModalOpen state to true
  const openModalAddUserForm = () => {
    setIsModalOpenAddUserForm(true);
  };

  //close modal when trigger and set the isModalOpen state to false
  const closeModalAddUserForm = () => {
    setIsModalOpenAddUserForm(false);
    setFormData(initialState);
  };

  //open modal when trigger and set the isModalOpen state to true
  const openModalUpdateUserForm = (user) => {
    const userData = { ...initialState };
    for (const key in user) {
      if (key in userData) userData[key] = user[key];
    }

    setFormData(userData);
    setUserId(user._id);
    setIsModalOpenUpdateUserForm(true);
  };

  //close modal when trigger and set the isModalOpen state to false
  const closeModalUpdateUserForm = () => {
    setIsModalOpenUpdateUserForm(false);
    setFormData(initialState);
  };

  //open modal when trigger and set the isModalOpen state to true
  const openModalAddCandidateForm = () => {
    setIsModalOpenAddCandidateForm(true);
  };

  //close modal when trigger and set the isModalOpen state to false
  const closeModalAddCandidateForm = () => {
    setIsModalOpenAddCandidateForm(false);
    setFormData(initialState);
  };

  //open modal when trigger and set the isModalOpen state to true
  const openModalUpdateCandidateForm = (candidate) => {
    const candidateData = { ...initialState };
    for (const key in candidate) {
      if (key in candidateData) candidateData[key] = candidate[key];
    }

    setFormData(candidateData);
    setcandidateId(candidate._id);
    setIsModalOpenUpdateCandidateForm(true);
  };

  //close modal when trigger and set the isModalOpen state to false
  const closeModalUpdateCandidateForm = () => {
    setIsModalOpenUpdateCandidateForm(false);
    setFormData(initialState);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onChangeProfile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChangePosition = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeDate = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitAddUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', 'user');
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('age', age);
    formData.append('birthdate', birthdate);
    formData.append('address', address);
    formData.append('civilstatus', civilstatus);
    formData.append('citizenship', citizenship);

    if (file) formData.append('image', file);

    addUser(formData);
    setFormData(initialState);
    setIsModalOpenAddUserForm(false);
  };

  const onSubmitAddCandidate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', 'candidate');
    formData.append('position', position);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('age', age);
    formData.append('birthdate', birthdate);
    formData.append('address', address);
    formData.append('civilstatus', civilstatus);
    formData.append('citizenship', citizenship);

    if (file) formData.append('image', file);

    addCandidate(formData);
    setFormData(initialState);
    setIsModalOpenAddCandidateForm(false);
  };

  const onSubmitUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', 'user');
    formData.append('position', position);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('birthdate', birthdate);
    formData.append('address', address);
    formData.append('civilstatus', civilstatus);
    formData.append('citizenship', citizenship);

    if (file) formData.append('image', file);

    updateUser(userId, formData);
    setFormData(initialState);
    setIsModalOpenUpdateUserForm(false);
  };
  const onSubmitUpdateCandidate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', 'candidate');
    formData.append('position', position);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('birthdate', birthdate);
    formData.append('address', address);
    formData.append('civilstatus', civilstatus);
    formData.append('citizenship', citizenship);

    if (file) formData.append('image', file);

    updateCandidate(candidateId, formData);
    setFormData(initialState);
    setIsModalOpenUpdateCandidateForm(false);
  };

  const onDeleteUser = (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirmation === false) {
      return false;
    } else {
      deleteUser(id);
    }
  };

  const onDeleteCandidate = (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this candidate?'
    );

    if (confirmation === false) {
      return false;
    } else {
      deleteCandidate(id);
    }
  };

  return (
    <>
      <h1 className='large text-primary'>Admin Dashboard</h1>
      <div>
        <ul className='tab-list'>
          <li
            key={'Users'}
            className={`tab-list-item ${'Users' === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick('Users')}
          >
            Users
          </li>
          <li
            key={'Candidates'}
            className={`tab-list-item ${
              'Candidates' === activeTab ? 'active' : ''
            }`}
            onClick={() => handleTabClick('Candidates')}
          >
            Candidates
          </li>
        </ul>
        <div className='tab-content'>
          {'Users' === activeTab ? (
            <div key={'Users'}>
              <button
                onClick={openModalAddUserForm}
                className='btn btn-primary'
              >
                <i className='fa-solid fa-user-plus' /> Add User&nbsp;
              </button>
              <table className='styled-table'>
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Birthdate</th>
                    <th>Address</th>
                    <th>Civil Status</th>
                    <th>Citizenship</th>
                    <th>Has Voted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users === null ? (
                    <Spinner />
                  ) : (
                    <>
                      {users.map((user) => (
                        <tr>
                          <td>{user.firstname}</td>
                          <td>{user.lastname}</td>
                          <td>{user.email}</td>
                          <td>{user.age}</td>
                          <td>{formatDate(user.birthdate)}</td>
                          <td>{user.address}</td>
                          <td>{user.civilstatus}</td>
                          <td>{user.citizenship}</td>
                          <td>{user.hasvoted === true ? 'Yes' : 'No'}</td>
                          <td>
                            <i
                              className='fa-solid fa-pen-to-square text-primary'
                              onClick={() => openModalUpdateUserForm(user)}
                            />
                            &nbsp;&nbsp;
                            <i
                              className='fa-solid fa-trash text-danger'
                              onClick={() => onDeleteUser(user._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div key={'Candidates'}>
              <button
                onClick={openModalAddCandidateForm}
                className='btn btn-primary'
              >
                <i className='fa-solid fa-user-plus' /> Add Candidate&nbsp;
              </button>
              <table className='styled-table'>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Birthdate</th>
                    <th>Address</th>
                    <th>Civil Status</th>
                    <th>Citizenship</th>
                    <th>Has Voted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates === null ? (
                    <Spinner />
                  ) : (
                    <>
                      {candidates.map((candidate) => (
                        <tr>
                          <td>{candidate.position}</td>
                          <td>{candidate.firstname}</td>
                          <td>{candidate.lastname}</td>
                          <td>{candidate.email}</td>
                          <td>{candidate.age}</td>
                          <td>{formatDate(candidate.birthdate)}</td>
                          <td>{candidate.address}</td>
                          <td>{candidate.civilstatus}</td>
                          <td>{candidate.citizenship}</td>
                          <td>{candidate.hasvoted === true ? 'Yes' : 'No'}</td>
                          <td>
                            <i
                              className='fa-solid fa-pen-to-square text-primary'
                              onClick={() =>
                                openModalUpdateCandidateForm(candidate)
                              }
                            />
                            &nbsp;&nbsp;
                            <i
                              className='fa-solid fa-trash text-danger'
                              onClick={() => onDeleteCandidate(candidate._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* Add User Form */}
      <Modal show={isModalOpenAddUserForm} onClose={closeModalAddUserForm}>
        <form className='form' onSubmit={onSubmitAddUser}>
          <h1>ADD USER FORM</h1>
          <label>Choose Profile:</label>
          <input type='file' onChange={onChangeProfile} />
          <br />
          <label>Role:</label>&nbsp;
          <label>User</label>
          <br />
          <label>Firstname:</label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            onChange={onChange}
            required
          />
          <br />
          <label>Lastname:</label>
          <input
            type='text'
            name='lastname'
            value={lastname}
            onChange={onChange}
            required
          />
          <br />
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <br />
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
          <br />
          <label>Age:</label>
          <input
            type='text'
            name='age'
            value={age}
            onChange={onChange}
            required
          />
          <br />
          <label for='birthday'>Birthday:</label>
          <input
            type='date'
            name='birthdate'
            value={birthdate}
            onChange={onChangeDate}
            required
          />
          <br />
          <label>Address:</label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={onChange}
            required
          />
          <br />
          <label>Civil Status:</label>
          <input
            type='text'
            name='civilstatus'
            value={civilstatus}
            onChange={onChange}
            required
          />
          <br />
          <label>Citizenship:</label>
          <input
            type='text'
            name='citizenship'
            value={citizenship}
            onChange={onChange}
            required
          />
          <br />
          <input type='submit' value='Submit' />
        </form>
      </Modal>
      {/* Add Candidate Form */}
      <Modal
        show={isModalOpenAddCandidateForm}
        onClose={closeModalAddCandidateForm}
      >
        <form className='form' onSubmit={onSubmitAddCandidate}>
          <h1>ADD CANDIDATE FORM</h1>
          <label>Choose Profile:</label>
          <input type='file' onChange={onChangeProfile} />
          <label>Role:</label>&nbsp;
          <label>Candidate</label>
          <br />
          <label>Position:</label>
          <select
            name='position'
            id='position'
            onChange={onChangePosition}
            required
          >
            <option value=''></option>
            <option value='Chairman'>Chairman</option>
            <option value='Councelor'>Councelor</option>
            <option value='SK Chairman'>SK Chairman</option>
          </select>
          <br />
          <label>Firstname:</label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            onChange={onChange}
            required
          />
          <br />
          <label>Lastname:</label>
          <input
            type='text'
            name='lastname'
            value={lastname}
            onChange={onChange}
            required
          />
          <br />
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <br />
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
          <br />
          <label>Age:</label>
          <input
            type='text'
            name='age'
            value={age}
            onChange={onChange}
            required
          />
          <br />
          <label for='birthday'>Birthday:</label>
          <input
            type='date'
            name='birthdate'
            value={birthdate}
            onChange={onChangeDate}
            required
          />
          <br />
          <label>Address:</label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={onChange}
            required
          />
          <br />
          <label>Civil Status:</label>
          <input
            type='text'
            name='civilstatus'
            value={civilstatus}
            onChange={onChange}
            required
          />
          <br />
          <label>Citizenship:</label>
          <input
            type='text'
            name='citizenship'
            value={citizenship}
            onChange={onChange}
            required
          />
          <br />
          <input type='submit' value='Submit' />
        </form>
      </Modal>
      {/* Update User Form */}
      <Modal
        show={isModalOpenUpdateUserForm}
        onClose={closeModalUpdateUserForm}
      >
        <form className='form' onSubmit={onSubmitUpdateUser}>
          <h1>UPDATE USER FORM</h1>
          <label>Choose Profile:</label>
          <input type='file' onChange={onChangeProfile} />
          <br />
          <label>Role:</label>&nbsp;
          <label>User</label>
          <br />
          <label>First name:</label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            onChange={onChange}
          />
          <br />
          <label>Lastname:</label>
          <input
            type='text'
            name='lastname'
            value={lastname}
            onChange={onChange}
          />
          <br />
          <label>Email:</label>
          <input type='email' name='email' value={email} onChange={onChange} />
          <br />
          <label>Age:</label>
          <input type='text' name='age' value={age} onChange={onChange} />
          <br />
          <label for='birthday'>Birthday:</label>
          <input
            type='date'
            name='birthdate'
            value={formatDate(birthdate)}
            onChange={onChangeDate}
          />
          <br />
          <label>Address:</label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={onChange}
          />
          <br />
          <label>Civil Status:</label>
          <input
            type='text'
            name='civilstatus'
            value={civilstatus}
            onChange={onChange}
          />
          <br />
          <label>Citizenship:</label>
          <input
            type='text'
            name='citizenship'
            value={citizenship}
            onChange={onChange}
          />
          <br />
          <input type='submit' value='Submit' />
        </form>
      </Modal>
      {/* Update Candidate Form */}
      <Modal
        show={isModalOpenUpdateCandidateForm}
        onClose={closeModalUpdateCandidateForm}
      >
        <form className='form' onSubmit={onSubmitUpdateCandidate}>
          <h1>UPDATE CANDIDATE FORM</h1>
          <label>Choose Profile:</label>
          <input type='file' onChange={onChangeProfile} />
          <label>Role:</label>&nbsp;
          <label>Candidate</label>
          <br />
          <label>Position:</label>
          <select name='position' id='position' onChange={onChangePosition}>
            <option value='Chairman'>Chairman</option>
            <option value='Councelor'>Councelor</option>
            <option value='SK Chairman'>SK Chairman</option>
          </select>
          <br />
          <label>First name:</label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            onChange={onChange}
          />
          <br />
          <label>Lastname:</label>
          <input
            type='text'
            name='lastname'
            value={lastname}
            onChange={onChange}
          />
          <br />
          <label>Email:</label>
          <input type='email' name='email' value={email} onChange={onChange} />
          <br />
          <label>Age:</label>
          <input type='text' name='age' value={age} onChange={onChange} />
          <br />
          <label for='birthday'>Birthday:</label>
          <input
            type='date'
            name='birthdate'
            value={formatDate(birthdate)}
            onChange={onChangeDate}
          />
          <br />
          <label>Address:</label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={onChange}
          />
          <br />
          <label>Civil Status:</label>
          <input
            type='text'
            name='civilstatus'
            value={civilstatus}
            onChange={onChange}
          />
          <br />
          <label>Citizenship:</label>
          <input
            type='text'
            name='citizenship'
            value={citizenship}
            onChange={onChange}
          />
          <br />
          <input type='submit' value='Submit' />
        </form>
      </Modal>
    </>
  );
};

AdminDashboard.propTypes = {
  addCandidate: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  getAllCandidatesFromAdmin: PropTypes.func.isRequired,
  getAllUsersFromAdmin: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteCandidate: PropTypes.func.isRequired,
  updateCandidate: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  candidate: state.candidate,
  user: state.user,
  admin: state.admin,
});

export default connect(mapStateToProps, {
  addCandidate,
  addUser,
  getAllCandidatesFromAdmin,
  getAllUsersFromAdmin,
  deleteUser,
  deleteCandidate,
  updateCandidate,
  updateUser,
})(AdminDashboard);
