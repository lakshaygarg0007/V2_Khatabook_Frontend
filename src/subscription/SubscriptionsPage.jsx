import {iconsImgs} from "../utils/images.js";
import "./SubscriptionsPage.css";
import {useEffect, useState} from "react";
import ipAddress from "../ipAddress.jsx";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import React from "react";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";

const Subscriptions = () => {
    const [subscriptions, setSubscription] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)

    const request1 = {
        "user_id": userData.user_id
    };

    const options1 = {
        method: "POST",
        body: JSON.stringify(request1),
        headers: {
            "Content-Type": "application/json",
        },
    };

    const handleKebabClick = (itemId) => {
        if (selectedRow === itemId) {
            setSelectedRow(null); // Close the dropdown if already open
        } else {
            setSelectedRow(itemId); // Open the dropdown
        }
    };

    const delete_record = (async (id) => {
        const response = await fetch( ipAddress + '/deleteSubscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ subscription_id: id }),
        }).then(() => {
            window.location.reload();
        });
    });

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
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
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
                                        <td className="px-4 py-3">
                                            <button className="w-6 h-6 rounded-lg mr-2 p-1 bg-gray-300 hover:bg-gray-400
                        flex items-center justify-center"
                                                    onClick={() => handleKebabClick(subscription._id)}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"
                                                                                              strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            {selectedRow === subscription._id && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg">
                                                    <button
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                        //onClick={() => edit_record(budgetItem)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                       onClick={() => delete_record(selectedRow)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
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
