import React, { useState } from "react";

const UploadModelForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState(null);
    const [modelFile, setModelFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileUpload = async (file, resourceType) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_URL.split('@')[1]}/${resourceType}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        if (!response.ok) throw new Error("Failed to upload file");
        return data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Upload the files to Cloudinary
            const pictureURL = await handleFileUpload(picture, "image");
            const modelURL = await handleFileUpload(modelFile, "raw");

            // Prepare the data payload
            const modelData = {
                title,
                description,
                pictureURL,
                modelURL,
            };

            // Send the data to the backend
            const response = await fetch(`${process.env.BACKEND_URL}/api/models`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modelData),
            });

            if (!response.ok) {
                throw new Error("Failed to save model data");
            }

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
