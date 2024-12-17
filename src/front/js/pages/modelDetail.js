import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Context to access login state
import { SignIn } from "../component/signIn"; // SignIn modal component

export const ModelDetail = () => {
    const { id } = useParams(); // Get the model ID from the URL
    const navigate = useNavigate(); // To redirect after deletion
    const [model, setModel] = useState(null); // State to store model data
    const [error, setError] = useState(null); // Handle API fetch errors
    const [loading, setLoading] = useState(false); // Handle loading state
    const { store } = useContext(Context); // Access login state
    const [comments, setComments] = useState([]); // State for comments
    const [newComment, setNewComment] = useState(""); // State for new comment

    // Fetch model details
    useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/models/${id}`);
                if (!response.ok) throw new Error("Failed to fetch model details");
                const data = await response.json();
                setModel(data); // Update state with fetched model data
            } catch (error) {
                setError("Unable to load model details. Please try again later.");
                console.error("Error fetching model details:", error);
            }
        };

        fetchModel();
        fetchComments();
    }, [id]); // Runs when the component mounts or the ID changes

    // Fetch comments for the model
    const fetchComments = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/models/${id}/comments`);
            if (!response.ok) throw new Error("Failed to fetch comments");
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // Post a new comment
    const handlePostComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/models/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) throw new Error("Failed to post comment");

            setNewComment(""); // Reset input field
            fetchComments(); // Refresh comments
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment. Please try again.");
        }
    };

    // Delete the model
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/models/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete the model");
            const data = await response.json();
            alert(data.message); // Show a success message
            navigate("/models"); // Redirect to models page
        } catch (error) {
            alert("An error occurred while deleting the model. Please try again.");
            console.error("Error deleting model:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to open the SignIn modal
    const openSignInModal = () => {
        const modalElement = document.getElementById("signInModal");
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    };

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
                    <img src={picture_url} className="img-fluid rounded shadow" alt={title} />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{title}</h1>
                    <p className="lead mb-4">{description}</p>

                    {/* Conditional Rendering for Buttons */}
                    {store.isLoggedIn ? (
                        <>
                            <a href={model_url} download className="btn btn-primary btn-lg me-2">
                                Download Model
                            </a>
                            <button
                                className="btn btn-danger btn-lg"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete Model"}
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-warning btn-lg" onClick={openSignInModal}>
                            Sign in to Download/Delete Model
                        </button>
                    )}
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-5">
                <h3>Comments</h3>
                <div className="mb-3">
                    {store.isLoggedIn ? (
                        <>
                            <textarea
                                className="form-control"
                                placeholder="Add your comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows="3"
                            />
                            <button
                                className="btn btn-primary mt-2"
                                onClick={handlePostComment}
                            >
                                Post Comment
                            </button>
                        </>
                    ) : (
                        <p>
                            <button className="btn btn-link p-0" onClick={openSignInModal}>
                                Sign in
                            </button>{" "}
                            to add a comment.
                        </p>
                    )}
                </div>

                {/* Display Comments */}
                <ul className="list-group">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <li key={comment.id} className="list-group-item">
                                <strong>{comment.username}</strong>: {comment.comment}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No comments yet. Be the first!</li>
                    )}
                </ul>
            </div>

            {/* Include SignIn Modal */}
            <SignIn />
        </div>
    );
};
