import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
   
  const { store, actions } = useContext(Context);
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeUsername = async () => {
    try {
      const response = await fetch(localStorage.getItem('backendUrl')+'api/user/username', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
        },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Username updated to: ${data.username}`);
      } else {
        setMessage(data.error || "Failed to update username.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

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
              <div className="form-group">
          <label htmlFor="username">Change Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleChangeUsername}>
          Update Username
        </button>
        {message && <p className="mt-3">{message}</p>}
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