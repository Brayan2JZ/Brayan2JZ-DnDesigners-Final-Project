import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Gallery = () => {
    const [cardList, setCardList] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [models, setModels] = useState([]);
    const [activeTab, setActiveTab] = useState("cards");
    const navigate = useNavigate();

    // Fetch cards
    useEffect(() => {
        if (activeTab === "cards") {
            fetch(localStorage.getItem('backendUrl') + 'api/cards')
                .then((response) => response.json())
                .then((jsonRes) => setCardList(jsonRes));
        }
    }, [activeTab]);

    // Fetch uploaded art
    useEffect(() => {
        if (activeTab === "art") {
            fetch(localStorage.getItem('backendUrl') + 'api/arts')
                .then((response) => response.json())
                .then((respJson) => setUploadedImages(respJson));
        }
    }, [activeTab]);

    // Fetch 3D Models
    useEffect(() => {
        if (activeTab === "models") {
            fetch(localStorage.getItem('backendUrl') + 'api/models')
                .then((response) => response.json())
                .then((data) => setModels(data));
        }
    }, [activeTab]);

    return (
        <div>
            <h1 className="text-center mb-4">Gallery</h1>
            <div className="container">
                {/* Pills Tab */}
                <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "cards" ? "active" : ""}`}
                            onClick={() => setActiveTab("cards")}
                        >
                            Cards
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "art" ? "active" : ""}`}
                            onClick={() => setActiveTab("art")}
                        >
                            Art
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "models" ? "active" : ""}`}
                            onClick={() => setActiveTab("models")}
                        >
                            3D Models
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Cards Tab */}
                    {activeTab === "cards" && (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {cardList.map((cardObj) => (
                                <div key={cardObj.id} className="col mb-4">
                                    <img
                                        src={cardObj.url}
                                        alt={cardObj.filename}
                                        className="img-fluid rounded shadow"
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Art Tab */}
                    {activeTab === "art" && (
                        <div>
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#uploadArtModal"
                                >
                                    Upload Your Art
                                </button>
                            </div>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {uploadedImages.map((art, index) => (
                                    <div key={index} className="col mb-4">
                                        <img
                                            src={art.imageUrl}
                                            alt={art.title}
                                            className="img-fluid rounded shadow"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3D Models Tab */}
                    {activeTab === "models" && (
                        <div>
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/models")}
                                >
                                    See All 3D Models
                                </button>
                            </div>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {models.map((model) => (
                                    <div
                                        key={model.id}
                                        className="col mb-4 text-center"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate(`/model/${model.id}`)}
                                    >
                                        <div className="card h-100 shadow">
                                            <img
                                                src={model.picture_url}
                                                alt={model.title}
                                                className="card-img-top"
                                                style={{
                                                    height: "200px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{model.title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
