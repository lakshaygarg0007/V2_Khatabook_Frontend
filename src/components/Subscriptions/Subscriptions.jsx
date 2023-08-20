import { iconsImgs } from "../../utils/images"
import "./Subscriptions.css";
import {useEffect, useState} from "react";
import ipAddress from "../../ipAddress.jsx";

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
                console.error('Error fetching pie chart data:', error);
            }
        }

        getSubscriptionsList()
    }, []);

  return (

    <div className="subgrid-two-item grid-common grid-c5">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Subscriptions</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addSubscriptions'} />
            </button>
        </div>
        <div className="grid-c5-content">
            <div className="grid-items">
                {
                    subscriptions.map((subscription) => (
                        <div className="grid-item" key = {subscription._id}>
                            <div className="grid-item-l">
                                <div className="icon">
                                    <img src={ iconsImgs.alert } />
                                </div>
                                <p className="text text-silver-v1">{ subscription.subscription } <span>
                                        </span></p>
                            </div>
                            <div >
                                <span className="text text-silver-v1">Till { new Date(subscription.expiry_date).toLocaleDateString("en-GB")}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Subscriptions
