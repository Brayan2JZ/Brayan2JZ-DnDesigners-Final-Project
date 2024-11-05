import React from 'react';
import { MyComponent } from './makeImage';

export const Gallery = () => (
    <div>
        <h1 className='title align-items-center'>Gallery</h1>

        <div className="container">
            {/* Pills Tab !!! */}
            <ul className="nav nav-pills mb-3 d-flex justify-content-center align-items-center" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-cards"
                        type="button" role="tab" aria-controls="pills-cards" aria-selected="false">Cards</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-art-tab" data-bs-toggle="pill" data-bs-target="#pills-art"
                        type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Art</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-3d-models-tab" data-bs-toggle="pill" data-bs-target="#pills-models"
                        type="button" role="tab" aria-controls="pills-models" aria-selected="false">3D Models</button>
                </li>
            </ul>
            {/* <--Pills Tab Content--> */}
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade" id="pills-cards" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="container mb-0 pb-0">
                        <div className="row row-cols-3">
                            <div className="col m-0 p-1">Card one</div>
                            <div className="col m-0 p-1">Card 2</div>
                            <div className="col m-0 p-1">Card 3</div>
                            <div className="col m-0 p-1">Card 4</div>
                            <div className="col m-0 p-1">Card 5</div>
                            <div className="col m-0 p-1">Card 6</div>
                            <div className="col m-0 p-1">Card 7</div>
                            <div className="col m-0 p-1">Card 8</div>
                            <div className="col m-0 p-1">Card 9</div>
                        </div>
                    </div>
                </div>
                {/* <!-- Pill Tab 2 --> */}
                <div className="tab-pane fade" id="pills-art" role="tabpanel" aria-labelledby="pills-art-tab" tabIndex="0">
                    <div className="container d-flex flex-column align-items-center">
                        <div className="card mt-3" style={{ width: '635px' }}>
                            <div className="card-body d-flex justify-content-between">
                                <h5 className="card-title">Art 1</h5>
                            </div>
                        </div>
                        <div className="card mt-3" style={{ width: '635px' }}>
                            <div className="card-body d-flex justify-content-between">
                                <h5 className="card-title">Art 2</h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 3D Models */}
                <div className="tab-pane fade" id="pills-models" role="tabpanel" aria-labelledby="pills-3d-models-tab" tabIndex="0">
                    <div className="container mb-0 pb-0">
                        <div className="row row-cols-3">
                            <div className="col m-0 p-1">Model one</div>
                            <div className="col m-0 p-1">Model 2</div>
                            <div className="col m-0 p-1">Model 3</div>
                            <div className="col m-0 p-1">Model 4</div>
                            <div className="col m-0 p-1">Model 5</div>
                            <div className="col m-0 p-1">Model 6</div>
                            <div className="col m-0 p-1">Model 7</div>
                            <div className="col m-0 p-1">Model 8</div>
                            <div className="col m-0 p-1">Model 9</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
