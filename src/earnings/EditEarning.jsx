import React, {useCallback, useEffect, useState} from "react";
import "./Earnings.jsx";
import {iconsImgs} from "../utils/images";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import ipAddress from "../ipAddress.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {useLocation, useNavigate} from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";

const EditEarning = (props) => {
    const navigate = useNavigate();
    const [earning, setEarning] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [amount, set_amount] = useState(null);
    const [description, set_description] = useState(null);
    const [date, set_date] = useState(null);
    const [payment_method, set_payment_method] = useState("UPI");
    const [payment_methods, set_payment_methods] = useState([]);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)
    const location = useLocation();
    const earningData = location.state.earning;

    useEffect(() => {
        set_amount(earningData.Amount);
        set_description(earningData.description)
        set_date(earningData.date)
        set_payment_method(earningData.payment_method)
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }

        async function fetch_payment_methods() {
            const res = await fetch(ipAddress + '/getPaymentMethods', options);
            const data = await res.json();
            set_payment_methods(data);
        }

        fetch_payment_methods()
    }, []);

    const edit_record = useCallback(() => {
        const data = {
            "earning_id": earningData._id,
            "amount": amount,
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }

        fetch(ipAddress + '/updateEarning', options).then(() => {
            console.log(parseFloat(amount) + ' '  + parseFloat(userData.earning) + ' ' +  parseFloat(earningData.Amount))
        })
        const new_amount = parseFloat(amount) + parseFloat(userData.earning) - earningData.Amount;
        sessionStorage.setItem('user_data', JSON.stringify({
            name: userData.name, id: userData.id,
            earning: new_amount, expense: userData.expense,
            subscription_type: userData.subscription_type,
            email: userData.email,
            mobile_number: userData.mobile_number
        }));

        navigate('/earnings');
        window.location.reload();
    });


    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <ContentTop/>
                <div className="grid-two-item grid-common grid-c4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
                            <input
                                type="text"
                                id="amount"
                                className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
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
                                className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => set_description(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="payment_method" className="block text-gray-700 mb-2">Payment Method</label>
                            <select
                                id="payment_method"
                                className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                value={payment_method}
                                onChange={(e) => set_payment_methods(e.target.value)}
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
                                className="w-full text-black placeholder-black border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                value={date}
                                onChange={(e) => set_date(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Add Expense Button */}
                    <div className="mt-4">
                        <button
                            className="edit-button flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                            onClick={() => edit_record()}
                        >
                            Edit Earning
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default EditEarning;
