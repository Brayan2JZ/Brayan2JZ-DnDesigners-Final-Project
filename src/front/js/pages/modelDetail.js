import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export const ModelDetail = () => {
    const { id } = useParams(); // Get the model ID from the URL
    const location = useLocation();
    const [model, setModel] = useState(location.state || null); // Use passed state if available
    const [error, setError] = useState(null); // Handle API fetch errors

    useEffect(() => {
        if (!model) {
            const fetchModel = async () => {
                try {
                    const response = await fetch(`/api/models/${id}`);
                    if (!response.ok) throw new Error("Failed to fetch model details");
                    const data = await response.json();
                    setModel(data); // Update state with fetched model data
                } catch (error) {
                    setError("Unable to load model details. Please try again later.");
                    console.error("Error fetching model details:", error);
                }
            };

            fetchModel();
        }
    }, [id, model]);

    if (error) {
        return (
            <div className="container my-5 text-center">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!model) {
        return (
            <div className="container my-5 text-center">
                <h1>Loading...</h1>
                <p>Fetching model details...</p>
            </div>
        );
    }

    const { title, picture_url, description, model_url } = model;

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={picture_url}
                        className="img-fluid rounded shadow"
                        alt={title}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{title}</h1>
                    <p className="lead mb-4">{description}</p>
                    <a
                        href={model_url}
                        download
                        className="btn btn-primary btn-lg"
                    >
                        Download Model
                    </a>
                </div>
            </div>
        </div>
    );
};
