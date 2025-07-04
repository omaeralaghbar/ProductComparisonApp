import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleCompare = () => {
        let current = JSON.parse(localStorage.getItem("compare") || "[]");

        if (current.find(p => p.id === product.id)) {
            alert("Already in comparison!");
            return;
        }

        if (current.length >= 4) {
            alert("You can only compare up to 4 products.");
            return;
        }

        if (current.length > 0 && current[0].category !== product.category) {
            alert("All products must be of the same type (category).");
            return;
        }

        current.push(product);
        localStorage.setItem("compare", JSON.stringify(current));
        window.dispatchEvent(new Event("comparisonUpdated"));
        navigate("/compare");
    };

    return (
        <div className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.category}</p>
            <p>Rating: {product.rating?.rate}</p>
            <button onClick={() => navigate(`/details/${product.id}`)}>View Details</button>
            <button onClick={handleCompare}>Add to Comparison</button>
        </div>
    );
}
