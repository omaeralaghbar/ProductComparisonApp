import React, { useMemo, useEffect, useState } from "react";

export default function Comparison() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleUpdate = () => {
            const stored = JSON.parse(localStorage.getItem("compare") || "[]");
            // تحقق من الحد الأقصى وعدم اختلاف الأنواع
            if (stored.length > 4) {
                alert("🚫 لا يمكنك مقارنة أكثر من 4 منتجات.");
                return;
            }
            const types = [...new Set(stored.map(p => p.category))];
            if (types.length > 1) {
                alert("⚠️ يجب أن تكون كل المنتجات من نفس النوع للمقارنة.");
                return;
            }
            setProducts(stored);
        };
        handleUpdate();
        window.addEventListener("comparisonUpdated", handleUpdate);
        return () => {
            window.removeEventListener("comparisonUpdated", handleUpdate);
        };
    }, []);

    const lowestPrice = useMemo(() => {
        return products.length ? Math.min(...products.map(p => p.price)) : null;
    }, [products]);

    const highestRating = useMemo(() => {
        return products.length ? Math.max(...products.map(p => p.rating?.rate || 0)) : null;
    }, [products]);

    const mostCommonBrand = useMemo(() => {
        const freq = {};
        products.forEach(p => {
            freq[p.category] = (freq[p.category] || 0) + 1;
        });
        const max = Math.max(...Object.values(freq));
        return Object.keys(freq).find(k => freq[k] === max);
    }, [products]);

    const bestProduct = useMemo(() => {
        if (products.length === 0) return null;
        return products.reduce((best, current) => {
            const score = (current.rating?.rate || 0) * 2 - current.price;
            const bestScore = (best.rating?.rate || 0) * 2 - best.price;
            return score > bestScore ? current : best;
        });
    }, [products]);

    const getScore = (p) => {
        return ((p.rating?.rate || 0) * 2 - p.price).toFixed(2);
    };

    const removeFromComparison = (id) => {
        const updated = products.filter(p => p.id !== id);
        localStorage.setItem("compare", JSON.stringify(updated));
        window.dispatchEvent(new Event("comparisonUpdated"));
    };

    return (
        <div className="container">
            <h2>🔍 جدول المقارنة</h2>
            {products.length === 0 ? (
                <p>لم يتم اختيار أي منتجات للمقارنة.</p>
            ) : (
                <>
                    <div className="comparison-scroll">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>الميزة</th>
                                    {products.map(p => (
                                        <th key={p.id} className="product-column">
                                            <img src={p.image} alt={p.title} className="product-img" />
                                            <div className="product-title">{p.title}</div>
                                            <button onClick={() => removeFromComparison(p.id)}>
                                                حذف
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>السعر</td>
                                    {products.map(p => (
                                        <td
                                            key={p.id}
                                            className={p.price === lowestPrice ? "highlight" : ""}
                                        >
                                            ${p.price}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>الماركة</td>
                                    {products.map(p => (
                                        <td
                                            key={p.id}
                                            className={p.category === mostCommonBrand ? "highlight" : ""}
                                        >
                                            {p.category}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>التقييم</td>
                                    {products.map(p => (
                                        <td
                                            key={p.id}
                                            className={p.rating?.rate === highestRating ? "highlight" : ""}
                                        >
                                            {p.rating?.rate}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>نقاط الأفضلية</td>
                                    {products.map(p => (
                                        <td
                                            key={p.id}
                                            className={p.id === bestProduct?.id ? "highlight" : ""}
                                        >
                                            {getScore(p)}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {bestProduct && (
                        <div className="best-product-box">
                            📢 <strong>{bestProduct.title}</strong> هو أفضل منتج بناءً على السعر والتقييم.
                        </div>
                    )}
                    <button
                        onClick={() => {
                            localStorage.removeItem("compare");
                            window.dispatchEvent(new Event("comparisonUpdated"));
                        }}
                    >
                        🗑️ مسح الكل
                    </button>
                </>
            )}
        </div>
    );
}

