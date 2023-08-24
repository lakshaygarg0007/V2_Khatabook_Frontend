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
                        <h3 className="grid-c-title-text text-black">Subscriptions</h3>
                        <button className="grid-c-title-icon">
                        </button>
                    </div>
                    <div className="lg:w-3/3 w-full mx-auto overflow-auto">
                            <table className="table-auto w-full text-left whitespace-no-wrap">
                                <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Subscription
                                        Name
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Payment
                                        Start Date
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Valid
                                        Till
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {subscriptions.map((subscription) => (
                                    <tr key={subscription._id}>
                                        <td className="px-4 py-3 text-gray-900">
                                                {subscription.subscription}
                                        </td>
                                        <td className="px-4 py-3 text-gray-900">{subscription.amount}</td>
                                        <td className="px-4 py-3 text-lg text-gray-900">{new Date(subscription.start_date).toLocaleDateString("en-GB")}</td>
                                        <td className="px-4 py-3 text-lg text-gray-900">{new Date(subscription.expiry_date).toLocaleDateString("en-GB")}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    <div className="mt-4">
                        <button
                            className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                            onClick={() => window.location.href = '/addSubscriptions'}
                        >
                            Add Subscription
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Subscriptions;
