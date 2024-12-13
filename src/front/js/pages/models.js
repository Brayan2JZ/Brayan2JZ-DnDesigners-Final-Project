import React, { useState, useEffect } from "react";
import { ModelView } from "../component/modelView";
import UploadModelForm from "../component/uploadModelForm";

export const Models = () => {
    const [showUploadForm, setShowUploadForm] = useState(false); // Modal visibility state
    const [models, setModels] = useState([]); // State to store models
    const [error, setError] = useState(null); // State for errors

    // Function to fetch models from the backend
    const fetchModels = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/models`);
            if (!response.ok) throw new Error("Failed to fetch models");
            const data = await response.json();
            setModels(data); // Update models state
        } catch (error) {
            setError("Unable to load models. Please try again later.");
            console.error("Error fetching models:", error);
        }
    };

    // Fetch models on component mount
    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">3D Models</h1>

            <div className="row">
                {models.map((model) => (
                    <div key={model.id} className="col-md-4 mb-4">
                        <ModelView
                            model={{
                                id: model.id,
                                title: model.title,
                                image: model.pictureURL,
                                description: model.description,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Big Upload Model Button */}
            <div className="text-center mt-5">
                <button
                    className="btn btn-primary"
                    style={{
                        fontSize: "24px",
                        padding: "20px 40px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                    }}
                    onClick={() => setShowUploadForm(true)}
                >
                    Upload a Model
                </button>
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
                        <UploadModelForm
                            onUploadSuccess={() => {
                                fetchModels(); // Refresh models after a successful upload
                                setShowUploadForm(false); // Close the modal
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
