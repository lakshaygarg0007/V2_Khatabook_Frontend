import {useEffect, useState} from "react";
import ipAddress from "../ipAddress.jsx";
import {iconsImgs} from "../utils/images.js";

const StockCard2 = () => {
    const [stocks, setStocks] = useState(0);
    const [user_data, set_user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)
    const request = {
        "user_id": userData.id
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
        set_user_data(user_data);

        const apiUrl = ipAddress + '/getTotalStockValue';

        // Using fetch to make the API call
        fetch(apiUrl, options)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setStocks(data))     // Update the state with the fetched data
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text text-black">Total Stock</h3>
                <button className="grid-c-title-icon">
                    <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addStock'}/>
                </button>
            </div>
            <div className="earning-card">
                <span className="card-pin-hidden">{formatNumberWithCommas(stocks)}</span>
            </div>
        </div>
    )
}

export default StockCard2
