import React, { useState, useEffect } from "react";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import {iconsImgs} from "../utils/images.js";

const StockPrices1 = () => {
    const [stockData, setStockData] = useState([]);
    const basePath = "https://finnhub.io/api/v1";
    const stockSymbolToName = {
        "AAPL": "Apple",
        "GOOGL": "Google",
        "MSFT": "Microsoft",
        "AMZN": "Amazon",
    };

    useEffect(() => {
        const apiKey = "cjh20ohr01qu5vptg37gcjh20ohr01qu5vptg380";


        const fetchStockPrice = async (symbol) => {
            try {
                const response = await fetch(
                    `${basePath}/quote?symbol=${symbol}&token=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setStockData(prevData => ({
                        ...prevData,
                        [symbol]: data
                    }));
                } else {
                    console.error(`Error fetching stock price for ${symbol}`);
                }
            } catch (error) {
                console.error(`Error fetching stock price for ${symbol}:`, error);
            }
        };

        Object.keys(stockSymbolToName).forEach(symbol => {
            fetchStockPrice(symbol);
        });

    }, []);


    return (
        <div className="grid-two-item grid-common grid-c4">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Stocks</h3>
                <button className="grid-c-title-icon">
                    <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addSubscriptions'} />
                </button>
            </div>
            <div className="grid-c4-content">
                <div className="grid-items">
                {Object.keys(stockSymbolToName).map(symbol => (
                    <div>
                        <div className="grid-c1-content">
                            <div key={symbol}>
                                <h3>{stockSymbolToName[symbol]}</h3>
                                {stockData[symbol] && stockData[symbol].c !== undefined ? (
                                    <p>Current Price: <span className="red-price"> ${stockData[symbol].c}</span></p>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                        <br/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default StockPrices1;
