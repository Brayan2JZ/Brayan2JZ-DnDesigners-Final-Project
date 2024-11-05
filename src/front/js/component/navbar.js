import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
		  <div className="container-fluid">
			<a className="navbar-brand" href="#">DnDecorations</a>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			  <span className="navbar-toggler-icon"></span>
			</button>
			<div className="d-flex" id="navbarNavDropdown">
			  <ul className="navbar-nav">
				<li className="nav-item mx-2">
					<a to='/home' className="nav-link active" aria-current="page" href="#">Home</a>
				</li>
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
