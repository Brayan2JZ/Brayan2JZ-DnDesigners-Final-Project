import React from "react";
import { useLocation } from "react-router-dom";

export const ModelDetail = () => {
    const location = useLocation();
    const { title, image, description } = location.state || {}; // Handle cases where state might be undefined

    if (!title || !image || !description) {
        return (
            <div className="container my-5 text-center">
                <h1>Model Not Found</h1>
                <p>Sorry, we couldn't find the model you were looking for.</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={image}
                        className="img-fluid rounded shadow"
                        alt={title}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{title}</h1>
                    <p className="lead mb-4">{description}</p>
                    <a
                        href="/path/to/model/file.zip"
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
