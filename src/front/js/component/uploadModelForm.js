import React, { useState } from "react";

const UploadModelForm = ({ onUploadSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState(null);
    const [modelFile, setModelFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Success message state

    const handleFileUpload = async (file, resourceType) => {
        if (!file) throw new Error("No file selected for upload");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

        const cloudName = process.env.CLOUDINARY_URL.split('@')[1]; // Extract cloud name from CLOUDINARY_URL
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        // Log the response for debugging
        if (!response.ok) {
            console.error("Cloudinary Upload Error Response:", data);
            throw new Error(data.error.message || "Failed to upload file");
        }

        return data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const pictureURL = await handleFileUpload(picture, "image");
            const modelURL = await handleFileUpload(modelFile, "raw");

            const modelData = {
                title,
                description,
                pictureURL,
                modelURL,
            };

            const backendUrl = process.env.BACKEND_URL; // Use BACKEND_URL from .env
            const response = await fetch(`${backendUrl}/api/models`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modelData),
            });

            if (!response.ok) throw new Error("Failed to save model data");

            // Notify parent component of success
            onUploadSuccess();

            // Show success message
            setSuccessMessage("Model uploaded successfully!");
        } catch (error) {
            setErrorMessage("An error occurred during upload. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Upload a New 3D Model</h1>

            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>

            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>

            <label>
                Picture:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPicture(e.target.files[0])}
                    required
                />
            </label>

            <label>
                3D File:
                <input
                    type="file"
                    accept=".stl,.obj,.glb,.gltf"
                    onChange={(e) => setModelFile(e.target.files[0])}
                    required
                />
            </label>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Submit"}
            </button>
        </form>
    );
};

export default UploadModelForm;
