import React from "react";
import { useNavigate } from "react-router-dom";

export const ModelView = ({ model }) => {
    const navigate = useNavigate();

    // Navigate to the detailed view
    const handleCardClick = () => {
        navigate(`/model/${model.id}`, { state: model });
    };

    return (
        <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
            <img src={model.image} className="card-img-top" alt={model.title} />
            <div className="card-body">
                <h5 className="card-title text-center">{model.title}</h5>
            </div>
        </div>
    );
};
