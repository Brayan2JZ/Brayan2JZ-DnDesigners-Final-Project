import React, { useState, useEffect } from "react";
import { ModelView } from "../component/modelView"; // Import the ModelView component
import UploadModelForm from "../component/uploadModelForm"; // Import the UploadModelForm component
import { Link } from "react-router-dom"; // Import Link for navigation

export const Models = () => {
    const [showUploadForm, setShowUploadForm] = useState(false); // Modal visibility state
    const [models, setModels] = useState([]); // State to store fetched models
    const [error, setError] = useState(null); // State to handle errors

    // Fetch models from the backend when the component mounts
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch("/api/models");
                if (!response.ok) throw new Error("Failed to fetch models");
                const data = await response.json();
                setModels(data); // Update state with fetched models
            } catch (error) {
                setError("Unable to load models. Please try again later.");
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, []); // Runs once when the component is mounted

    return (
        <div className="container my-5">
            {/* Upload Model Button */}
            <div className="text-center mb-4">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowUploadForm(true)}
                >
                    Upload Model
                </button>
            </div>

            <h1 className="text-center mb-4">3D Models</h1>
            {/* Display error message if fetching fails */}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <div className="row">
                {models.map((model) => (
                    <div key={model.id} className="col-md-4 mb-4">
                        {/* Wrap ModelView with Link */}
                        <Link
                            to={{
                                pathname: `/models/${model.id}`,
                                state: {
                                    title: model.title,
                                    image: model.picture_url,
                                    description: model.description,
                                },
                            }}
                            style={{ textDecoration: "none", color: "inherit" }} // Optional styling for links
                        >
                            <ModelView
                                model={{
                                    id: model.id,
                                    title: model.title,
                                    image: model.picture_url,
                                    description: model.description,
                                }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="text-center mt-5">
                <h2>More will be added soon!</h2>
            </div>

            {/* Modal for Upload Model Form */}
            {showUploadForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-button"
                            onClick={() => setShowUploadForm(false)}
                        >
                            &times;
                        </button>
                        <UploadModelForm />
                    </div>
                </div>
            )}
        </div>
    );
};
