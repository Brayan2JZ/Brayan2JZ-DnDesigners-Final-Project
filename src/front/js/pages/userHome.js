import React, { useState, useEffect, useContext } from "react";
import { SignIn } from "../component/signIn";
import { Register } from "../component/register";

export const UserHome = () => {
    return (
        <div className="container">
            
            <h1 className="text-center">Featured</h1>
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-Hollow-Purple.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-Hollow-Purple.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-Hollow-Purple.jpg" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src="https://ih1.redbubble.net/image.297818462.4187/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                </div>

                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">Some Tags You Might Like!</h1>
                    <p className="lead">Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">

                    <a className="nav-link" href="/tags">
                    <button type="button" className="btn btn-info btn-lg px-4 me-md-2">Search Tags</button>
                    </a>
                    
                    <button type="button" className="btn btn-outline-primary btn-lg px-4">Create</button>
                    </div>
                </div>
            </div>
            <div class="px-4 pt-5 my-5 text-center border-bottom">
    <h1 class="display-4 fw-bold">Centered screenshot</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the worlds most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Primary button</button>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
        <div class="container px-5">
        <img
        src="https://static.wikia.nocookie.net/forgottenrealms/images/6/60/Owlbear_AFR.jpg/revision/latest?cb=20210702071532"
        className="img-fluid border rounded-3 shadow-lg mb-4"
        alt="Example image"
        width="700"
        height="500"
        loading="lazy"
        />
        </div>
      </div>
    </div>
  </div>
        </div>
    );
};