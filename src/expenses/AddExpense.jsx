import React, { useCallback, useEffect, useState } from "react";
import "./Expenses.jsx";
import { iconsImgs } from "../utils/images";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import ipAddress from "../ipAddress.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
    const navigate = useNavigate();
    const [payment_methods, set_payment_methods] = useState([]);
    const [amount, set_amount] = useState("");
    const [description, set_description] = useState("");
    const [date, set_date] = useState("");
    const [payment_method, set_payment_method] = useState("UPI");

    useEffect(() => {
        async function fetchPaymentMethods() {
            const res = await fetch(ipAddress + '/getPaymentMethods');
            const data = await res.json();
            set_payment_methods(data);
        }

        fetchPaymentMethods();
    }, []);

    const addRecord = useCallback(() => {
        if (!amount || !description || !date) {
            alert("Please fill in all details before adding a record.");
            return;
        }

        const data = {
            "user_id": "63c3cc724a4ed3fd4bc79cfb",
            "amount": amount,
            "description": description,
            "payment_method": payment_method,
            "date": date
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch(ipAddress + '/addExpense', options)
            .then(() => {
                navigate('/earnings');
                window.location.reload();
            });
    });

    return (
        <div className="main-content">
            <ContentTop />
            <div className="grid-two-item grid-common grid-c4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        className="w-full bg-gray-100 border text-black placeholder-black border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => set_amount(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                    <input
                        type="text"
                        id="description"
                        className="w-full bg-gray-100 text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => set_description(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="payment_method" className="block text-gray-700 mb-2">Payment Method</label>
                    <select
                        id="payment_method"
                        className="w-full bg-gray-100 border text-black placeholder-black border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                        value={payment_method}
                        onChange={(e) => set_payment_method(e.target.value)}
                    >
                        {payment_methods.map(payment_method => (
                            <option key={payment_method.payment_methods} value={payment_method.payment_methods}>
                                {payment_method.payment_methods}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="date" className="block text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        id="date"
                        className="w-full bg-gray-100 border  text-black placeholder-black border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                        value={date}
                        onChange={(e) => set_date(e.target.value)}
                    />
                </div>
            </div>

            {/* Add Expense Button */}
            <div className="mt-4">
                <button
                    className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                    onClick={addRecord}
                >
                    Add Expense
                </button>
            </div>
            </div>
        </div>
    );
};

export default AddExpense;
