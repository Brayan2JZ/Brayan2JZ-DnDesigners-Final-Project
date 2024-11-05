import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
		  <div class="container-fluid">
			<a class="navbar-brand" href="#">DnDesigners</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon"></span>
			</button>
			<div class="d-flex" id="navbarNavDropdown">
			  <ul class="navbar-nav">
				<li class="nav-item mx-2">
				  <a class="nav-link active" aria-current="page" href="#">Home</a>
				</li>
				<li class="nav-item mx-2">
				  <a class="nav-link" href="#">Tags</a>
				</li>
				<li class="nav-item mx-2">
				  <a class="nav-link" href="#">Cards</a>
				</li>
				<li>
					<button class="nav-item mx-2 btn btn-success">Create Now</button>
				</li>
				<li class="nav-item dropdown">
				  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					User pic
				  </a>
				  <ul class="dropdown-menu">
					  <li><a class="dropdown-item" href="#">Profile</a></li>
					<li><a class="dropdown-item" href="#">Upload</a></li>
					<li><a class="dropdown-item" href="#">Favorites</a></li>
					<li><a class="dropdown-item" href="#">Settings</a></li>
				  </ul>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
			);
		};		
