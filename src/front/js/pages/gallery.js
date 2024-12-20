import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GalleryCard } from '../component/galleryCard';

export const Gallery = () => {
    const [cardList, setCardList] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [models, setModels] = useState([]); // State for 3D models
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imageTitle, setImageTitle] = useState('')
    const [imageCaption, setImageCaption] = useState('')
    const [imageFile, setImageFile] = useState(null)
    imageCaption
    const navigate = useNavigate();

    // Fetch cards
    useEffect(() => {
        async function getCards() {
            fetch(localStorage.getItem('backendUrl') + 'api/cards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((response) => {
                return response.json();
            }).then((jsonRes) => {
                setCardList(jsonRes);
            });
        }
        getCards();
    }, []);

    // Fetch uploaded art
    async function getArt() {
        fetch(localStorage.getItem('backendUrl') + 'api/arts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            return response.json();
        }).then((respJson) => {
            setUploadedImages(respJson);
        });
    }

    useEffect(() => {
        getArt();
    }, []);

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

    const handleUpload = async () => {
        if (!imageTitle || !imageCaption || !imageFile) {
            alert('Please provide a title, caption, and select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('title', imageTitle);
        formData.append('caption', imageCaption);

        await fetch(localStorage.getItem('backendUrl') + 'api/upload-art', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Upload failed: ' + data.message);
                } else {
                    setUploadedImages((prev) => [...prev, { data, caption: imageCaption },]);
                    getArt();
                    alert('Art uploaded successfully!');
                }
            })
            .catch((error) => {
                console.error('Error uploading art:', error);
                alert('Error uploading art.');
            });
    };

    // Fetch 3D models
    useEffect(() => {
        async function getModels() {
            const response = await fetch(localStorage.getItem('backendUrl') + 'api/models');
            const modelData = await response.json();
            setModels(modelData);
        }
        getModels();
    }, []);

    const handleImageClick = (image, isCard) => {
        const selectedImage = {
            url: image.imageUrl || image.url,
            filename: image.fileName || image.filename,
            caption: isCard ? null : image.caption,
            id: image.id || image.filename,
            type: image.type || image.filename
        };
        setSelectedImage(selectedImage);
        setShowModal(true);
    };

    return (
        <div>
            <h1 className="text-center mb-4 text-light">Gallery</h1>
            <div className="container">
                {/* Pills Tab */}
                <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active "
                            id="pills-cards-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-cards"
                            type="button"
                            role="tab"
                            aria-controls="pills-cards"
                            aria-selected="true"
                        >
                            Cards
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link "
                            id="pills-art-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-art"
                            type="button"
                            role="tab"
                            aria-controls="pills-art"
                            aria-selected="false"
                        >
                            Art
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link "
                            id="pills-3d-models-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-models"
                            type="button"
                            role="tab"
                            aria-controls="pills-models"
                            aria-selected="false"
                        >
                            3D Models
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content" id="pills-tabContent">
                    {/* Cards Tab */}
                    <div className="tab-pane fade show active" id="pills-cards" role="tabpanel" aria-labelledby="pills-cards-tab">
                        <div className="row">
                            {cardList &&
                                cardList.map((cardObj) => (
                                    <div className='col' key={cardObj.filename} onClick={() => handleImageClick({ ...cardObj, type: 'card' }, true)}>
                                        <img id={cardObj.id} alt={cardObj.filename} src={cardObj.url} />
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Art Tab */}
                    <div className="tab-pane fade" id="pills-art" role="tabpanel" aria-labelledby="pills-art-tab" tabIndex="0">
                        <div className="container d-flex flex-column align-items-center">
                            {/* Upload Button and Modal */}
                            <button
                                type="button"
                                className="btn btn-warning me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Upload Art Here
                            </button>

                            {/* Upload Art Modal */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{ maxHeight: '800px', overflowY: 'auto', backgroundColor: "#3c1b1b" }}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                <strong>Upload New Art</strong>
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="Title" className="form-label">
                                                    <strong>Title:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    value={imageTitle}
                                                    onChange={(e) => setImageTitle(e.target.value)}
                                                    placeholder="Add a title for your artwork"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="Description" className="form-label">
                                                    <strong>Caption:</strong>
                                                </label>
                                                <textarea
                                                    className="form-control bg-transparent"
                                                    value={imageCaption}
                                                    onChange={(e) => setImageCaption(e.target.value)}
                                                    placeholder="Add a caption for your artwork"
                                                    rows="3"
                                                />
                                            </div>
                                            <input
                                                type="file"
                                                className="form-control bg-transparent"
                                                id="inputArtGroupFile"
                                                accept=".png, .jpeg, .jpg"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={handleUpload}>
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Art Gallery */}
                        <div className="container mb-0 pb-0">
                            <div className="row row-cols-3">
                                {uploadedImages &&
                                    uploadedImages.map((art, index) => (
                                        <div
                                            className="col m-0 p-1"
                                            key={index}
                                            onClick={() => handleImageClick({ ...art, type: 'art' }, false)}
                                        >
                                            <img width={200} src={art.imageUrl} alt={art.title} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* 3D Models Tab */}
                    <div className="tab-pane fade" id="pills-models" role="tabpanel" aria-labelledby="pills-3d-models-tab">
                        <div className="text-center mb-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/models")}
                            >
                                See All 3D Models
                            </button>
                        </div>
                        <div className="row row-cols-3">
                            {models.map((model) => (
                                <div
                                    key={model.id}
                                    className="col mb-4 text-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/model/${model.id}`)}
                                >
                                    <img
                                        src={model.picture_url}
                                        alt={model.title}
                                        className="img-fluid rounded shadow"
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <h5 className="mt-2">{model.title}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal to show image and comments */}
            {selectedImage && showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <GalleryCard
                            selectedImage={selectedImage}
                            setShowModal={setShowModal}
                            setSelectedImage={setSelectedImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
