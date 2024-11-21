import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // Track login success
  const { store, actions } = useContext(Context);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors
    setLoginSuccess(false); // Reset the success message on each submit

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Call signIn function after validating inputs
    signIn();
  };

  const signIn = () => {
    fetch(localStorage.getItem('backendUrl') + 'api/token', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((jsonRes) => {
      if (jsonRes.token) {
        // Save token and user ID to localStorage
        localStorage.setItem('token', jsonRes.token);
        localStorage.setItem('userId', jsonRes.id);
        localStorage.setItem('userLoggedIn', 'true'); // Add this line to set login status
  
        console.log("Token retrieved for user ID:", jsonRes.id);
  
        // Update the global state to reflect the signed-in state
        actions.setIsLoggedIn(true);
  
        // Show success message
        setLoginSuccess(true);
      } else {
        // Handle case when token is not returned (authentication failure)
        setError("Invalid credentials.");
        setLoginSuccess(false);
      }
    })
    .catch((e) => {
      console.log(e);
      setError("An error occurred during sign-in.");
      setLoginSuccess(false);
    });
  };

  return (
    <div className="modal fade" id="signInModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog d-flex justify-content-center">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalLabel1">Sign In</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="container p-4">
              {error && <p className="text-danger">{error}</p>}

              {/* Display success message after successful login */}
              {loginSuccess && (
                <div className="alert alert-success" role="alert">
                  Login Successful! Welcome back.
                </div>
              )}

              <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                  <button type="submit" className="btn btn-primary m-2">
                    Sign In
                  </button>
                  <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};