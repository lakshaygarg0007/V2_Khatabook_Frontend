import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import {useEffect, useState} from "react";
import ipAddress from "../../ipAddress.jsx";

const EarningCard = () => {
  const [earnings, setEarnings] = useState(0);
  const [user_data, set_user_data] = useState(sessionStorage.getItem("user_data"))
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
      const user_data = sessionStorage.getItem("user_data");
      set_user_data(user_data)
      if (user_data) {
          const userDataObj = JSON.parse(user_data);
          setEarnings(userDataObj.earning);
      }
  }, []);

  return (
    <div className="grid-one-item grid-common grid-c1">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text text-black">Total Earning</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addEarning'}/>
            </button>
        </div>
        <div className="earning-card">
                    <span className="card-pin-hidden">{formatNumberWithCommas(earnings)}</span>
        </div>
    </div>
  )
}

export default EarningCard
