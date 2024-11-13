import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logowide.png"
import { SignIn } from "../component/signIn";
import { Register } from "./register";

// Hey Bradley, Brayan here!!, Edited the navbar a little to add logo, rearranged buttons and added a gallery button. Also made tags and gallery button route to proper pages =D dont beat me up!!!!

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
			<SignIn/>
			<Register/>
		  <div className="container-fluid">
													{/* Adjust "to=/home" to proper home page when home page is finalized in layout */}
		  <Link className="navbar-brand" to="/">
			<img 
				src={logo} 
				alt="Logo" 
				className="navbar-logo" 
				style={{ width: '200px', height: 'auto' }} 
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
					<div className="dropdown">
						<button className="btn dropdown-toggle nav-item mx-2 btn btn-success" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Create A Card
						</button>
						<ul className="dropdown-menu">
							<li><Link to='/charimageCreator' className="dropdown-item">Character</Link></li>
							<li><Link to='/itemimageCreator' className="dropdown-item">Item</Link></li>
							<li><Link to='/spellimageCreator' className="dropdown-item">Spell</Link></li>
						</ul>
					</div>
				</li>
				<li className="nav-item dropdown">
				  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					User pic
				  </a>
				  <ul className="dropdown-menu">
					<li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#signInModal">Profile</a></li>
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
