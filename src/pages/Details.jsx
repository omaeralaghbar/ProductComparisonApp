
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    const addToCompare = () => {
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

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <button onClick={addToCompare}>Add to Comparison</button>
            <button
                onClick={() =>
                    navigator.share?.({
                        title: product.title,
                        url: window.location.href,
                    })
                }
            >
                Share
            </button>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} style={{ width: "200px" }} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.category}</p>
            <p>Rating: {product.rating?.rate}</p>
        </div>
    );
};

export default Details;
