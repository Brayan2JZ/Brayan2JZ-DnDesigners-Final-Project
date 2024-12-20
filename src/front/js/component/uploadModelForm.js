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
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "#3c1b1b" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Upload a New 3D Model</h1>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Title:
                </label>
                <input
                    className="bg-transparent"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Description:
                </label>
                <textarea
                    className="bg-transparent"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box", minHeight: "100px" }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Picture:
                </label>
                <input
                    className="bg-transparent"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPicture(e.target.files[0])}
                    required
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    3D File:
                </label>
                <input
                    className="bg-transparent"
                    type="file"
                    accept=".stl,.obj,.glb,.gltf"
                    onChange={(e) => setModelFile(e.target.files[0])}
                    required
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
            </div>

            {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

            <button
                type="submit"
                disabled={loading}
                style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Uploading..." : "Submit"}
            </button>
        </form>
    );
};

export default UploadModelForm;
