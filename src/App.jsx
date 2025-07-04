import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Comparison from "./pages/Comparison";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";
import "./styles.css";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/compare" element={<Comparison />} />
                <Route path="/details/:id" element={<Details />} />
            </Routes>
        </Router>
    );
}
