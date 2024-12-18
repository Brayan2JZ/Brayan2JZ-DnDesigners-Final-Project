import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GalleryCard } from '../component/galleryCard';

export const Gallery = () => {
    const [cardList, setCardList] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [models, setModels] = useState([]); // State for 3D models
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Fetch cards
    useEffect(() => {
        async function getCards() {
            const response = await fetch(localStorage.getItem('backendUrl') + 'api/cards');
            const jsonRes = await response.json();
            setCardList(jsonRes);
        }
        getCards();
    }, []);

    // Fetch uploaded art
    useEffect(() => {
        async function getArt() {
            const response = await fetch(localStorage.getItem('backendUrl') + 'api/arts');
            const respJson = await response.json();
            setUploadedImages(respJson);
        }
        getArt();
    }, []);

    // Fetch 3D models
    useEffect(() => {
        async function getModels() {
            const response = await fetch(localStorage.getItem('backendUrl') + 'api/models');
            const modelData = await response.json();
            setModels(modelData);
        }
        getModels();
    }, []);

    const handleImageClick = (image, isCard, type) => {
        const selectedImage = {
            url: image.imageUrl || image.url,
            filename: image.fileName || image.filename,
            caption: isCard ? null : image.caption,
            id: image.id || image.filename,
            type: type
        };
        setSelectedImage(selectedImage);
        setShowModal(true);
    };

    return (
        <div>
            <h1 className="text-center mb-4">Gallery</h1>
            <div className="container">
                {/* Pills Tab */}
                <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
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
                            className="nav-link"
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
                            className="nav-link"
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
                        <div className="row row-cols-3">
                            {cardList.map((cardObj) => (
                                <div key={cardObj.id} className="col mb-4" onClick={() => handleImageClick(cardObj, true, 'card')}>
                                    <img src={cardObj.url} alt={cardObj.filename} className="img-fluid rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Art Tab */}
                    <div className="tab-pane fade" id="pills-art" role="tabpanel" aria-labelledby="pills-art-tab">
                        <div className="container mb-4 text-center">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#uploadArtModal">
                                Upload Your Art
                            </button>
                        </div>
                        <div className="row row-cols-3">
                            {uploadedImages.map((art, index) => (
                                <div key={index} className="col mb-4" onClick={() => handleImageClick(art, false, 'art')}>
                                    <img src={art.imageUrl} alt={art.title} className="img-fluid rounded" />
                                </div>
                            ))}
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
