import React, { useState, useEffect } from "react";
import ContentTop from "../components/ContentTop/ContentTop.jsx";

const StockPrices = () => {
    const [stockData, setStockData] = useState([]);
    const basePath = "https://finnhub.io/api/v1";
    const stockSymbolToName = {
        "AAPL": "Apple",
        "GOOGL": "Google",
        "MSFT": "Microsoft",
        "AMZN": "Amazon",
        "META": "Meta"
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
        <div className="main-content">
            <ContentTop />
            <div className="grid-two-item grid-common grid-c4">
                <h2>Latest Stock Prices</h2>
                <br/>
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
    );
};

export default StockPrices;
