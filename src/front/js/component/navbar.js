import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logowide.png"

// Hey Bradley, Brayan here!!, Edited the navbar a little to add logo, rearranged buttons and added a gallery button. Also made tags and gallery button route to proper pages =D dont beat me up!!!!

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
		  <div className="container-fluid">
													{/* Adjust "to=/home" to proper home page when home page is finalized in layout */}
		  <Link className="navbar-brand" to="/home">
			<img 
				src={logo} 
				alt="Logo" 
				className="navbar-logo" 
				style={{ width: '150px', height: 'auto' }} 
			/>
			</Link>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			  <span className="navbar-toggler-icon"></span>
			</button>
			<div className="d-flex" id="navbarNavDropdown">
			  <ul className="navbar-nav">
			  <li className="nav-item mx-2">
				  <a className="nav-link" href="#">Cards</a>
				</li>
			  <li className="nav-item mx-2">
				  <a className="nav-link" href="/gallery">Gallery</a>
				</li>
				<li className="nav-item mx-2">
				  <a className="nav-link" href="/tags">Tags</a>
				</li>
				<li>
					<Link to='/imageCreator'>
						<button className="nav-item mx-2 btn btn-success">Create A Card</button>
					</Link>
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
