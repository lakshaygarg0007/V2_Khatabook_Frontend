import React, {useState, useEffect} from "react";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";
import _ from "lodash";
import ipAddress from "../ipAddress.jsx";

const StockPrices = () => {
    const [stockData, setStockData] = useState([]);
    const [myStocksData, setMyStocksData] = useState([]);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)
    const [selectedRow, setSelectedRow] = useState(null);
    const basePath = "https://finnhub.io/api/v1";
    const stockSymbolToName = {
        "AAPL": "Apple",
        "GOOGL": "Google",
        "MSFT": "Microsoft",
        "AMZN": "Amazon",
        "META": "Meta"
    };
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const page_size = 5;

    const [index, setIndex] = useState(null);

    const getIndex = (i) => {
        setIndex(i)
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: userData.id})
    }


    useEffect(async () => {
        const apiUrl = ipAddress + '/getStocksData';
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


        fetch(apiUrl, options)
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((item, index) => ({
                    _id: item._id,
                    user_id: item.user_id,
                    stock_name: item.stock_name,
                    purchase_date: new Date(item.purchase_date).toLocaleDateString(),
                    purchase_rate: item.purchase_rate,
                    current_rate: item.current_rate,
                }));
                setPaginatedPosts(_(transformedData).slice(0).take(page_size).value());
                setMyStocksData(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const page_count = myStocksData ? Math.ceil(myStocksData.length / page_size) : 0;
    const pages = _.range(1, page_count + 1)


    const pagination = (page_no) => {
        setCurrentPage(page_no)
        const start_index = (page_no - 1) * page_size;
        const paginatedPosts = _(myStocksData).slice(start_index).take(page_size).value()
        setPaginatedPosts(paginatedPosts)
    }


    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <ContentTop/>
                <div className="grid-two-item text-black  grid-common grid-c4">
                    <h2 className="heading-1">Latest Stock Prices</h2>
                    <br/>
                    {Object.keys(stockSymbolToName).map(symbol => (
                        <div>
                            <div className="grid-c1-content ">
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


                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        {/* Column headings */}
                        <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Stock
                                Name
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Purchase
                                Date
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Purchase
                                Rate
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Current
                                Rate
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                Action
                            </th>
                        </tr>
                        </thead>
                        {/* Data rows */}
                        <tbody>
                        {paginatedPosts.map((budgetItem) => (
                            <tr key={getIndex}>
                                <td className="px-4 py-3 text-gray-900">{budgetItem.stock_name}</td>
                                <td className="px-4 py-3 text-gray-900">{budgetItem.purchase_date}</td>
                                <td className="px-4 py-3 text-gray-900">{budgetItem.purchase_rate}</td>
                                <td className="px-4 py-3 text-lg text-gray-900">{budgetItem.current_rate}</td>
                                <td className="px-4 py-3">
                                    <button className="w-6 h-6 rounded-lg mr-2 p-1 bg-gray-300 hover:bg-gray-400
                        flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                        </svg>
                                    </button>
                                    {selectedRow === budgetItem._id && (
                                        <div
                                            className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg">
                                            <button
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                //onClick={() => edit_record(budgetItem)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                //onClick={() => delete_record(selectedRow, budgetItem.Amount)}
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

                    <br></br>

                    <div className="mt-4">
                        <button
                            className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                            onClick={() => window.location.href = '/addStock'}
                        >
                            Add Stock
                        </button>
                    </div>

                </div>

            </div>
        </>
    );
};

export default StockPrices;
