import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [compareCount, setCompareCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const data = JSON.parse(localStorage.getItem("compare") || "[]");
            setCompareCount(data.length);
        };

        updateCount();
        window.addEventListener("comparisonUpdated", updateCount);
        return () => window.removeEventListener("comparisonUpdated", updateCount);
    }, []);

    return (
        <nav className="navbar">
            <Link to="/">🏠 Home</Link>
            <Link to="/compare">📊 Compare ({compareCount})</Link>
        </nav>
    );
}
