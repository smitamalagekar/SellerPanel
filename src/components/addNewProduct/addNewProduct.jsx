import "./addNewProduct.scss";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddNewProductMain() {
    const [activeTab, setActiveTab] = useState("general");
    const tabs = [
        { name: "General", path: "general" },
        { name: "Files & Media", path: "add" },
        { name: "Price & Stock", path: "price-stock" },
        { name: "SEO", path: "seo" },
        { name: "Shipping", path: "shipping" },
        { name: "Warranty", path: "warranty" },
        { name: "Frequently Bought", path: "frequently-bought" }
    ];

    return (
        <div className="addNewProductMain">
            <div className="addNewProductBox">
                <div className="header">
                    <h2>Add New Product</h2>
                    <button className="clearTempData">Clear Tempdata</button>
                </div>

                <div className="tabContainer">
                    {tabs.map((tab) => (
                        <Link 
                            to={`/products/create/${tab.path}`}
                            key={tab.path}
                            className={`tabItem ${activeTab === tab.path ? "active" : "disabled"}`}
                            onClick={() => setActiveTab(tab.path)}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </div>

                <div className="addNewProductOutlet">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
