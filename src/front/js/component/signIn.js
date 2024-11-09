import React, { useState } from "react";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");  // Clear previous errors
  
      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    };

    const signIn=()=>{
      fetch('https://laughing-space-winner-69vqxv9qrjj934rw-3001.app.github.dev/api/token',{
        method:'POST',
        body: JSON.stringify({
          username:email,
          password:password
        }),
        headers: {'Content-Type': 'application/json'}
      }).then((response)=>{
        return response.json()
      }).then((jsonRes)=>{
        localStorage.setItem('token',jsonRes.token)
        localStorage.setItem('userId',jsonRes.id)
        console.log("token retrieved for user ID: ",jsonRes.id)
      }).catch((e)=>{
        console.log(e)
      })
    }
  
    return (
      <div class="modal fade" id="signInModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog d-flex justify-content-center">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="exampleModalLabel1">Sign In</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        <div class="modal-body">
      <form onSubmit={handleSubmit} className="container p-4">
        {error && <p className="text-danger">{error}</p>}
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
            <button type="submit" className="btn btn-primary m-2" onClick={signIn}>
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