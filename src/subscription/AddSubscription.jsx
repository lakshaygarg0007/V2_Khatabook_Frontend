import { iconsImgs } from "../utils/images.js";
import "./SubscriptionsPage.css";
import { useEffect, useState, useCallback } from "react";
import ipAddress from "../ipAddress.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

const AddSubscription = () => {
    const navigate = useNavigate();
    const [subscriptions, set_subscription] = useState(null);
    const [amount, set_amount] = useState(null);
    const [start_date, set_start_date] = useState(null);
    const [expiry_date, set_expiry_date] = useState(null);



    const request1 = {
        "user_id": "63c3cc724a4ed3fd4bc79cfb"
    };


    const add_subscription = useCallback(() => {

        const data = {
            "user_id": "63c3cc724a4ed3fd4bc79cfb",
            "amount": amount,
            "subscription": subscriptions,
            "start_date": start_date,
            "expiry_date": expiry_date
        };

        const options1 = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };


        try {
            const response =  fetch(ipAddress + '/addSubscription', options1);
            //navigate('/earnings');
        } catch (error) {
            console.error('Error fetching subscription data:', error);
        }

    });

    return (
        <div className="main-content">
            <div className="subgrid-two-item grid-common grid-c5">
                <div className="grid-c-title">
                    <h3 className="grid-c-title-text">Subscriptions</h3>
                    <button className="grid-c-title-icon">
                        <img src={iconsImgs.plus} alt="Add" />
                    </button>
                </div>
                <div className="grid-c5-content">
                    <div className="grid-items">
                        <div className="grid-item heading">
                            <div className="grid-item-l">
                                <span>Subscription Name</span>
                            </div>
                            <div>
                                <span>Price</span>
                            </div>
                            <div>
                                <span>Start Date</span>
                            </div>
                            <div>
                                <span>Valid Till</span>
                            </div>
                        </div>
                            <div className="grid-item">
                                <div className="grid-item-l">
                                    <div className="icon">
                                        <img src={iconsImgs.alert} alt="Alert" />
                                    </div>
                                    <input
                                        className="subscription-amount-input"
                                        type="text"
                                        onChange={(e) => set_subscription(e.target.value)} // Define handleAmountChange function
                                    />
                                </div>
                                <div>
                                    <input
                                        className="subscription-amount-input"
                                        type="number"
                                        onChange={(e) => set_amount(e.target.value)} // Define handleAmountChange function
                                    />

                                </div>
                                <div>
                                    <input
                                        className="subscription-amount-input"
                                        type="date"
                                        onChange={(e) => set_start_date(e.target.value)} // Define handleAmountChange function
                                    />
                                </div>
                                <div>
                                    <input
                                        className="subscription-amount-input"
                                        type="date"
                                        onChange={(e) => set_expiry_date(e.target.value)} // Define handleAmountChange function
                                    />
                                </div>

                            </div>
                        <br/>
                        <button className="edit-button" onClick={() => { add_subscription(); }}>
                            Add Subscription
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AddSubscription;
