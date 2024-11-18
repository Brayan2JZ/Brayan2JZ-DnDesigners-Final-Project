import React, { useState, useEffect} from 'react';

export const Gallery = () => {
    const [cardList,setCardList]=useState([])

    const getImageURLs=()=>{
        fetch('https://wild-spooky-crypt-v6gwqqp7g44jfqr9-3001.app.github.dev/api/cards',{
        method:'GET',
        headers: {'Content-Type':'application/json', 'Authorization':'Bearer '+ localStorage.getItem('token')}
        }).then((response)=>{
        console.log(response)
        return response.json()
        }).then((jsonRes)=>{
        console.log(jsonRes)
        setCardList(jsonRes)
        })
    }

    useEffect(()=>{
        getImageURLs()
    },[])

    return(
        <div>
            <h1 className="text-center">Gallery</h1>

            <div className="container">
                                             .image-container
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
                                                                                            {/* <--Card Tab--> */}
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade" id="pills-cards" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                        <div className="container mb-0 pb-0">
                            <div className="row row-cols-3">
                                {cardList.map((cardObj)=>{
                                    return(
                                        <div className="col m-0 p-1">
                                            <h3>{cardObj.filename}</h3>
                                            <img src={cardObj.url}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                                                                                            {/* <!-- Art Tab --> */}
                    <div className="tab-pane fade" id="pills-art" role="tabpanel" aria-labelledby="pills-art-tab" tabIndex="0">
                        <div className="container d-flex flex-column align-items-center">
                                                                                            {/* Upload Button and Modal */}
                            <button type="button" class="btn btn-success me-2" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                Upload Art Here
                            </button>
                                                                                            {/* Modal */}
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel"><strong>Upload New Art</strong></h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="Title"
                                                    class="form-label"><strong>Title:</strong></label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                                                    placeholder="Add a Title for your Artwork here"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="Description"
                                                    class="form-label"><strong>Caption:</strong></label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                    placeholder="Add a caption for your Artwork here"></textarea>
                                            </div>
                                            <button type="button" class="btn btn-light">Select File From Computer</button>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-success">Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                                                            {/* Art */}
                            <div className="card mt-3" style={{ width: '635px' }}>
                                <div className="card-body d-flex justify-content-between">
                                    <h5 className="card-title">Art 1</h5>
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
}