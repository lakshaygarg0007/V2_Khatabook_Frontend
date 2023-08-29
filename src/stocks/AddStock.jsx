import {iconsImgs} from "../utils/images.js";
import {useEffect, useState, useCallback} from "react";
import ipAddress from "../ipAddress.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";
import ContentTop from "../components/ContentTop/ContentTop.jsx";

const AddSubscription = () => {
    const navigate = useNavigate();
    const [stock_name, set_stock_name] = useState(null);
    const [purchase_date, set_purchase_date] = useState(null);
    const [purchase_rate, set_purchase_rate] = useState(null);
    const [current_rate, set_current_rate] = useState(null);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)



    const add_stock = useCallback(() => {
        const data = {
            "user_id": userData.id,
            "stock_name": stock_name,
            "purchase_date": purchase_date,
            "purchase_rate": purchase_rate,
            "current_rate": current_rate
        };


        const options1 = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = fetch(ipAddress + '/addStock', options1);
            navigate('/stocks');
        } catch (error) {
            console.error('Error fetching subscription data:', error);
        }

    });

    return (
        <><Sidebar/>
            <div className="main-content">
                <ContentTop/>
                <div className="grid-two-item grid-common grid-c4">
                    <div className="grid-c-title">
                        <h3 className="grid-c-title-text">Subscriptions</h3>
                    </div>
                    <div className="grid-c5-content">
                        <div className="grid-items">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Stock
                                        Name</label>
                                    <input
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        type="text"
                                        placeholder="Stock Name"
                                        onChange={(e) => set_stock_name(e.target.value)} // Define handleAmountChange function
                                    />
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Purchase Date</label>
                                    <input
                                        type="date"
                                        id="amount"
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Purchase Date"
                                        onChange={(e) => set_purchase_date(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Purchase Rate</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Purchase Rate"
                                        onChange={(e) => set_purchase_rate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Current Rate</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Current Rate"
                                        onChange={(e) => set_current_rate(e.target.value)}
                                    />
                                </div>

                            </div>
                            <br/>
                            <div className="mt-4">
                                <button
                                    className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                                    onClick={() => add_stock()}
                                >
                                    Add Stock
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default AddSubscription;
