import React, { useState, useEffect} from 'react';

export const Gallery = () => {
    const [cardList,setCardList]=useState([])
    const [imageTitle, setImageTitle] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    const getImageURLs=()=>{
        fetch(localStorage.getItem('backendUrl')+'api/cards',{
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')}
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                setImageFile(file);
            } else {
                alert('Only JPEG and PNG images are allowed.');
            }
        }
    };

    const handleUpload = () => {
        if (!imageTitle || !imageCaption || !imageFile) {
            alert('Please provide a title, caption, and select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('title', imageTitle);
        formData.append('caption', imageCaption);

        fetch(localStorage.getItem('backendUrl') + 'api/upload-art', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUploadedImages((prev) => [...prev, data.url]);
                    alert('Art uploaded successfully!');
                } else {
                    alert('Upload failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error uploading art:', error);
                alert('Error uploading art.');
            });
    };

    return (
        <div>
            <h1 className="text-center">Gallery</h1>
            <div className="container">
                {/* Pills Tab */}
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

                {/* Tab Content */}
                <div className="tab-content" id="pills-tabContent">
                    {/* Cards Tab */}
                    <div className="tab-pane fade" id="pills-cards" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                        <div className="container mb-0 pb-0">
                            <div className="row row-cols-3">
                                {cardList.map((cardObj) => {
                                    return (
                                        <div className="col m-0 p-1" key={cardObj.id}>
                                            <h3>{cardObj.filename}</h3>
                                            <img width={200} height={282} src={cardObj.url} alt={cardObj.filename} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Art Tab */}
                    <div className="tab-pane fade" id="pills-art" role="tabpanel" aria-labelledby="pills-art-tab" tabIndex="0">
                        <div className="container d-flex flex-column align-items-center">
                            {/* Upload Button and Modal */}
                            <button type="button" className="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Upload Art Here
                            </button>

                            {/* Modal */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><strong>Upload New Art</strong></h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="Title" className="form-label"><strong>Title:</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={imageTitle}
                                                    onChange={(e) => setImageTitle(e.target.value)}
                                                    placeholder="Add a title for your artwork"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="Description" className="form-label"><strong>Caption:</strong></label>
                                                <textarea
                                                    className="form-control"
                                                    value={imageCaption}
                                                    onChange={(e) => setImageCaption(e.target.value)}
                                                    placeholder="Add a caption for your artwork"
                                                    rows="3"
                                                />
                                            </div>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="inputArtGroupFile"
                                                accept=".png, .jpeg, .jpg"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-success" onClick={handleUpload}>Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Display Uploaded Art */}
                            <div className="row mt-3">
                                {uploadedImages.map((imageUrl, index) => (
                                    <div key={index} className="col-3">
                                        <div className="card">
                                            <img src={imageUrl} className="card-img-top" alt="Uploaded Art" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3D Models Tab */}
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