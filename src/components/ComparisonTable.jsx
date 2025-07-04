import React from "react";

export default function ComparisonTable({ products }) {
    const lowestPrice = Math.min(...products.map(p => p.price));

    return (
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    {products.map(p => (
                        <th key={p.id}>{p.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Price</td>
                    {products.map(p => (
                        <td key={p.id} style={{ color: p.price === lowestPrice ? "green" : "black" }}>
                            ${p.price}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Brand</td>
                    {products.map(p => <td key={p.id}>{p.category}</td>)}
                </tr>
                <tr>
                    <td>Rating</td>
                    {products.map(p => <td key={p.id}>{p.rating?.rate}</td>)}
                </tr>
            </tbody>
        </table>
    );
}
