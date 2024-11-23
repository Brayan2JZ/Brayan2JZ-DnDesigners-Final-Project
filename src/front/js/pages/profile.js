import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
   
  const { store, actions } = useContext(Context);

  useEffect(() => {
	const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
	if (userLoggedIn !== store.isLoggedIn) {
	  actions.setIsLoggedIn(userLoggedIn);
	}
  }, [actions, store.isLoggedIn]);

    return (
        <div className="container mt-5">
        {/* Profile Card */}
        <div className="mx-auto mb-4" style={{ maxWidth: "500px" }}>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-circle mb-3"

            />
            {/* Display Username */}
            <h3 className="card-title">Username</h3>
          </div>
        </div>
  
  
        {/* Tabs Section */}
        <ul className="nav nav-pills flex-column me-3" id="profileTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="favorites-tab"
              data-bs-toggle="tab"
              data-bs-target="#favorites"
              type="button"
              role="tab"
              aria-controls="favorites"
              aria-selected="true"
            >
              Favorites
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="logout-tab"
              data-bs-toggle="tab"
              data-bs-target="#logout"
              type="button"
              role="tab"
              aria-controls="logout"
              aria-selected="false"
            >
              Logout
            </button>
          </li>
        </ul>
  
        {/* Tab Content */}
        <div className="tab-content mt-4">
          {/* Favorites Tab */}
          <div
            className="tab-pane fade show active"
            id="favorites"
            role="tabpanel"
            aria-labelledby="favorites-tab"
          >
            <h5>Your Favorites</h5>
            <ul className="list-group">

            </ul>
          </div>
  
          {/* Settings Tab */}
          <div
            className="tab-pane fade"
            id="settings"
            role="tabpanel"
            aria-labelledby="settings-tab"
          >
            <h5>Account Settings</h5>
            <p>Update your profile or manage your account preferences.</p>
            <button className="btn btn-secondary btn-sm">Edit Profile</button>
            <button className="btn btn-secondary btn-sm ms-2">Change Password</button>
          </div>
  
          {/* Logout Tab */}
          <div
            className="tab-pane fade"
            id="logout"
            role="tabpanel"
            aria-labelledby="logout-tab"
          >
            <h5>Logout</h5>
            <p>Are you sure you want to log out?</p>
            <button className="btn btn-danger" onClick={() => {
                    localStorage.setItem('userLoggedIn', 'false');
                    actions.setIsLoggedIn(false);
                  }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };