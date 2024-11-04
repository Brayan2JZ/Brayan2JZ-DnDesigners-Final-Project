import React, { useState, useEffect, useContext } from "react";
import { SignIn } from "../component/signIn";
import { Register } from "./register";

export const HomePage = () => {
    return (
        <div className="container">
            <SignIn/>
            <h1 class="text-center">Featured</h1>
            <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-Hollow-Purple.jpg" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-Hollow-Purple.jpg" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-Hollow-Purple.jpg" class="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <img src="https://ih1.redbubble.net/image.297818462.4187/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                </div>

                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-3">Tags</h1>
                    <p class="lead">Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" class="btn btn-info btn-lg px-4 me-md-2">Search Tags</button>
                    <button type="button" class="btn btn-outline-primary btn-lg px-4">Create</button>
                    </div>
                </div>
            </div>
        <Register/>
        </div>
    );
};