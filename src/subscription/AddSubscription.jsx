import {iconsImgs} from "../utils/images.js";
import "./SubscriptionsPage.css";
import {useEffect, useState, useCallback} from "react";
import ipAddress from "../ipAddress.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";
import ContentTop from "../components/ContentTop/ContentTop.jsx";

const AddSubscription = () => {
    const navigate = useNavigate();
    const [subscriptions, set_subscription] = useState(null);
    const [amount, set_amount] = useState(null);
    const [start_date, set_start_date] = useState(null);
    const [expiry_date, set_expiry_date] = useState(null);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)

    const request1 = {
        "user_id": userData.id
    };


    const add_subscription = useCallback(() => {
        const options1 = {
            method: "POST",
            body: JSON.stringify(request1),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`
            },
        };

        try {
            const response = fetch(ipAddress + '/addSubscription', options1);
            navigate('/subscriptions');
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
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Subscription
                                        Name</label>
                                    <input
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        type="text"
                                        placeholder="Subscription Name"
                                        onChange={(e) => set_subscription(e.target.value)} // Define handleAmountChange function
                                    />
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Subscription Price</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Price"
                                        onChange={(e) => set_amount(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        id="amount"
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Start Date"
                                        onChange={(e) => set_start_date(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-gray-700 mb-2">Expiry Date</label>
                                    <input
                                        type="date"
                                        id="amount"
                                        className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                        placeholder="Expiry Date"
                                        onChange={(e) => set_expiry_date(e.target.value)}
                                    />
                                </div>

                            </div>
                            <br/>
                            <div className="mt-4">
                                <button
                                    className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                                    onClick={() => add_subscription()}
                                >
                                    Add Subscription
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
