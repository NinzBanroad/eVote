import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <h1 className='large text-primary'>Admin Dashboard</h1>
      <div>
        <ul className='tab-list'>
          <li
            key={'Home'}
            className={`tab-list-item ${'Home' === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick('Home')}
          >
            Home
          </li>
          <li
            key={'Profile'}
            className={`tab-list-item ${
              'Profile' === activeTab ? 'active' : ''
            }`}
            onClick={() => handleTabClick('Profile')}
          >
            Profile
          </li>
        </ul>
        <div className='tab-content'>
          {'Home' === activeTab ? (
            <div key={'Home'}>This is Home</div>
          ) : (
            <div key={'Profile'}>This is Profile</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
