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
      <form onSubmit={handleSubmit} className="container p-4">
        <h2>Sign In</h2>
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
            <button type="submit" className="btn btn-primary" onClick={signIn}>
              Sign In
            </button>
          </div>
        </div>
      </form>
    );
  };