import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logowide.png"

// Hey Bradley, Brayan here!!, Edited the navbar a little to add logo =D dont beat me up!!!!

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
		  <div class="container-fluid">
													{/* Adjust "to=/home" to proper home page when home page is finalized in layout */}
		  <Link className="navbar-brand" to="/home">
			<img 
				src={logo} 
				alt="Logo" 
				className="navbar-logo" 
				style={{ width: '150px', height: 'auto' }} 
			/>
			</Link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon"></span>
			</button>
			<div className="d-flex" id="navbarNavDropdown">
			  <ul className="navbar-nav">
				<li className="nav-item mx-2">
				  <a className="nav-link" href="#">Tags</a>
				</li>
				<li className="nav-item mx-2">
				  <a className="nav-link" href="#">Cards</a>
				</li>
				<li>
					<button className="nav-item mx-2 btn btn-success">Create Now</button>
				</li>
				<li className="nav-item dropdown">
				  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					User pic
				  </a>
				  <ul className="dropdown-menu">
					  <li><a className="dropdown-item" href="#">Profile</a></li>
					<li><a className="dropdown-item" href="#">Upload</a></li>
					<li><a className="dropdown-item" href="#">Favorites</a></li>
					<li><a className="dropdown-item" href="#">Settings</a></li>
				  </ul>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
			);
		};		
