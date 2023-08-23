import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import {useEffect, useState} from "react";
import ipAddress from "../../ipAddress.jsx";

const EarningCard = () => {
  const [earnings, setEarnings] = useState(0);
  const [user_data] = useState(sessionStorage.getItem("user_data"))
  const userData = JSON.parse(user_data)
  const request = {
        "id": userData.id
  };

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        const baseUrl = ipAddress;
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
            <h3 className="grid-c-title-text text-black">Earning</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addEarning'}/>
            </button>
        </div>
        <div className="grid-c1-content">
            <p className="text-black">Earnings</p>
            <div className="card-logo-wrapper">
                <div className="card-wrapper">
                    <span className="card-pin-hidden">{formatNumberWithCommas(earnings)}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EarningCard
