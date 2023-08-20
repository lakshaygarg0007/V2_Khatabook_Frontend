import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import {useEffect, useState} from "react";

const Cards = () => {
  const [earnings, setEarnings] = useState(0);
  const request = {
        "id": "63c3cc724a4ed3fd4bc79cfb"
  };

  const options = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
  };

  useEffect(() => {
        // Fetch earnings data from the API
        const baseUrl = "http://192.168.29.13:8000";
        async function fetchEarnings() {
            try {
                const totalEarningsResponse = await fetch(baseUrl + '/getTotalEarning', options);
                const totalEarningsData = await totalEarningsResponse.json();
                const totalEarnings = totalEarningsData[0].total_earning;
                setEarnings(totalEarnings);
            } catch (error) {
                console.error("Error fetching earnings:", error);
            }
        }
        console.log("abc" + earnings)
        fetchEarnings();
  }, []);

  return (
    <div className="grid-one-item grid-common grid-c1">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Earning</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addEarning'}/>
            </button>
        </div>
        <div className="grid-c1-content">
            <p>Earnings</p>
            <div className="lg-value">{earnings}</div>
            <div className="card-wrapper">
                <span className="card-pin-hidden">**** **** **** </span>
                <span>1234</span>
            </div>
            <div className="card-logo-wrapper">
                <div>
                    <p className="text text-silver-v1 expiry-text">Expires</p>
                    <p className="text text-sm text-white">12/22</p>
                </div>
                <div className="card-logo">
                    <div className="logo-shape1"></div>
                    <div className="logo-shape2"></div>
                </div>
                <div className="card-wrapper">
                    <span className="card-pin-hidden">{earnings}</span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Cards
