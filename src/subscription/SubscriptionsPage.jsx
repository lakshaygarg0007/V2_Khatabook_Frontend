import {iconsImgs} from "../utils/images.js";
import "./SubscriptionsPage.css";
import {useEffect, useState} from "react";
import ipAddress from "../ipAddress.jsx";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import React from "react";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";

const Subscriptions = () => {
    const [subscriptions, setSubscription] = useState([]);

    const request1 = {
        "user_id": "63c3cc724a4ed3fd4bc79cfb"
    };

    const options1 = {
        method: "POST",
        body: JSON.stringify(request1),
        headers: {
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        async function getSubscriptionsList() {
            try {
                const response = await fetch(ipAddress + '/getSubscriptionsList', options1);
                const chartData = await response.json();
                setSubscription(chartData);
            } catch (error) {
                console.error('Error fetching subscription data:', error);
            }
        }

        getSubscriptionsList();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <ContentTop/>
                <div className="grid-two-item grid-common grid-c5">
                    <div className="grid-c-title">
                        <h3 className="grid-c-title-text">Subscriptions</h3>
                        <button className="grid-c-title-icon">
                            <img src={iconsImgs.plus} alt="Add"
                                 onClick={() => window.location.href = '/addSubscriptions'}/>
                        </button>
                    </div>
                    <div className="grid-c5-content">
                        <div className="grid-items">
                            <div className="grid-item heading">
                                <div className="grid-item-l text-black">
                                    <span>Subscription Name</span>
                                </div>
                                <div className="text-black">
                                    <span>Price</span>
                                </div>
                                <div className="text-black">
                                    <span>Start Date</span>
                                </div>
                                <div className="text-black">
                                    <span>Valid Till</span>
                                </div>
                            </div>
                            {subscriptions.map((subscription) => (
                                <div className="grid-item" key={subscription._id}>
                                    <div className="grid-item-l">
                                        <div className="icon">
                                            <img src={iconsImgs.alert} alt="Alert"
                                                 onClick={() => window.location.href = '/addSubscriptions'}/>
                                        </div>
                                        <p className=" text-black">{subscription.subscription}</p>
                                    </div>
                                    <div>
                                        <span className="text text-black">{subscription.amount}</span>
                                    </div>
                                    <div>
                                        <span
                                            className="text text-black">{new Date(subscription.start_date).toLocaleDateString("en-GB")}</span>
                                    </div>
                                    <div>
                                        <span
                                            className="text text-black">{new Date(subscription.expiry_date).toLocaleDateString("en-GB")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscriptions;
