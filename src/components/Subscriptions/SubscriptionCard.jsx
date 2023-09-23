import {iconsImgs} from "../../utils/images"
import "./Subscriptions.css";
import {useEffect, useState, React} from "react";
import ipAddress from "../../ipAddress.jsx";
import Sidebar from "../../layout/Sidebar/Sidebar.jsx";

const SubscriptionCard = () => {

    const [subscriptions, setSubscription] = useState([]);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)


    const options1 = {
        method: "POST",
        body: JSON.stringify({ user_id: userData.id }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userData.token}`
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
                <h3 className="grid-c-title-text text-black ">Subscriptions</h3>
                <button className="grid-c-title-icon">
                    <img src={iconsImgs.plus} onClick={() => window.location.href = '/addSubscriptions'}/>
                </button>
            </div>
            <div className="grid-c5-content">
                <div className="grid-items">
                    {
                        subscriptions.length === 0 ? (
                                    <p className="text-black">
                                        No subscriptions available. Try adding some! 📅🚀
                                    </p>
                                ) :
                        subscriptions.map((subscription) => (
                            <div className="grid-item" key={subscription._id}>
                                <div className="grid-item-l">
                                    <div className="icon">
                                        <img src={iconsImgs.alert}/>
                                    </div>
                                    <p className="text-black">{subscription.subscription} <span>
                                        </span></p>
                                </div>
                                <div>
                                        <span
                                            className="text text-black">Till {new Date(subscription.expiry_date).toLocaleDateString("en-GB")}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCard
