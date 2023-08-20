import React, { useEffect, useState } from "react";
import "./Earnings.css";
import { iconsImgs } from "../utils/images";
import { budget } from "../data/data";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import ContentMain from "../components/ContentMain/ContentMain.jsx";
import ipAddress from "../ipAddress.jsx";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis} from "recharts";

const data1 = [
    { name: "January", Total: 800 },
    { name: "February", Total: 700 },
    { name: "March", Total: 400 },
    { name: "April", Total: 300 },
    { name: "May", Total: 900 },
    { name: "June", Total: 800 },
];


const Earnings = () => {
    const [earning, setEarning] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: "63c3cc724a4ed3fd4bc79cfb" })
    }



    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Expense Report', 10, 10); // Add a title

        const tableHeaders = ['Amount', 'Description', 'Payment Method', 'Date'];
        const tableData = earning.map((budgetItem) => [
            `$${budgetItem.Amount}`,
            budgetItem.description,
            budgetItem.payment_method,
            budgetItem.date
        ]);

        // Create the table
        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 20
        });

        doc.save('earning_report.pdf');
    };

    const delete_record = (async (id) => {
        const response = await fetch( ipAddress + '/deleteEarning', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ earning_id: id }),
        }).then(() => {
            window.location.reload();
        });
    });

    useEffect(() => {
        const apiUrl = ipAddress + '/getEarning'; // Replace with your API endpoint
        fetch(apiUrl, options)
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((item, index) => ({
                    _id: item._id,
                    id: index + 1,
                    Amount: item.amount,
                    payment_method: item.payment_method,
                    date: new Date(item.date).toLocaleDateString(),
                    description: item.description,
                }));
                setEarning(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleCheckboxChange = (itemId) => {
        if (selectedRow === itemId) {
            setSelectedRow(null); // Deselect the row
        } else {
            setSelectedRow(itemId); // Select the row
        }
    };

    return (
        <div className="main-content">
            <ContentTop />
            <div className="grid-two-item grid-common grid-c4">
                <div className="grid-c-title">
                    <h3 className="grid-c-title-text">My Earnings</h3>
                    <button className=" orange-button grid-c-title-icon" onClick={() => window.location.href = '/addEarning'}>
                        <img src={iconsImgs.plus} alt="Plus Icon" />
                    </button>
                    <button className="grid-c-title-text" onClick={generatePDF}>
                        Export as PDF
                    </button>
                </div>
                <div>
                    <div className="grid-items">
                        {/* Column headings */}
                        <div className="grid-item heading">
                            <div className="grid-item-l">
                                <div className="icon"></div>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-silver-v1 ">Amount</span>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-silver-v1">Description</span>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-silver-v1">Payment Method</span>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-silver-v1">Date</span>
                            </div>
                        </div>
                        {/* Data rows */}
                        {earning.map((budgetItem) => (
                            <div className="grid-item" key={budgetItem._id}>
                                <div className="grid-item-l">
                                    <div className="icon">
                                        <input
                                            type="checkbox"
                                            checked={selectedRow === budgetItem._id}
                                            onChange={() => handleCheckboxChange(budgetItem._id)}
                                        />
                                    </div>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1">$ {budgetItem.Amount}</span>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1 wide-column">{budgetItem.description}</span>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1">{budgetItem.payment_method}</span>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1">{budgetItem.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid-item-r">
                        <div className="button-container">
                        <button className="edit-button" onClick={() => handleEdit(selectedRow)}
                                disabled={!selectedRow}
                        >
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => delete_record(selectedRow)}
                                disabled={!selectedRow}
                        >
                            Delete
                        </button>
                            </div>
                    </div>
                </div>
            </div>


            <div className="chart">
                <div className="title"></div>
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <AreaChart
                        width={530}
                        height={100}
                        data={data1}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="gray" />
                        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="Total"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#total)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Earnings;
