import React, {useCallback, useEffect, useState} from "react";
import "./Earnings.jsx";
import { iconsImgs } from "../utils/images";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import ipAddress from "../ipAddress.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {useNavigate} from "react-router-dom";

const AddEarning = (callback, deps) => {
    const navigate = useNavigate();
    const [earning, setEarning] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [amount, set_amount] = useState(null);
    const [description, set_description] = useState(null);
    const [date, set_date] = useState(null);
    const [payment_method, set_payment_method] = useState("UPI");
    const [payment_methods, set_payment_methods] = useState([]);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }

        async function fetch_payment_methods() {
            const res = await fetch( ipAddress + '/getPaymentMethods', options);
            const data = await res.json();
            set_payment_methods(data);
        }

        fetch_payment_methods()
    }, []);

    const add_record = useCallback(() => {

        if (!amount || !description || !date) {
            alert("Please Fill all details before adding Record");
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
        }

        const res = fetch(ipAddress + '/addEarning', options);
        navigate('/earnings');
        window.location.reload();
    });

    const handleCheckboxChange = (itemId) => {
        if (selectedRow === itemId) {
            setSelectedRow(null); // Deselect the row
        } else {
            setSelectedRow(itemId); // Select the row
        }
    };

    const handleNewEarningChange = (field, value) => {
        setNewEarning((prevEarning) => ({
            ...prevEarning,
            [field]: value
        }));
    };

    return (
        <div className="main-content">
            <ContentTop />
            <div className="grid-two-item grid-common grid-c4">
                <div className="grid-c-title">
                    <h3 className="grid-c-title-text">Add New Earning</h3>
                </div>
                <div>
                    <div className="grid-items">
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
                    </div>
                </div>


                <div>
                    <div className="grid-items">
                        <form>
                            <div className="grid-item heading">
                            <div className="grid-item-l"></div>
                            <div className="grid-item-r">
                                <input
                                    type="text"
                                    placeholder="Amount"
                                    onChange={(e) => set_amount(e.target.value)}
                                />
                            </div>
                            <div className="grid-item-r">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    onChange={(e) => set_description(e.target.value)}
                                />
                            </div>
                            <div className="grid-item-r">
                                <select id = "payment_method" onChange={(e) => set_payment_method(e.target.value)} className="form-select custom-select" >
                                    {
                                        payment_methods.map(payment_method => (
                                            <option key="{payment_method.payment_methods}"  value={payment_method.payment_methods} className="py-2"> {payment_method.payment_methods}</option>
                                        ))
                                    };
                                </select>
                            </div>
                            <div className="grid-item-r">
                                <input
                                    type="date"
                                    placeholder="Date"
                                    onChange={(e) => set_date(e.target.value)}
                                />
                            </div>
                            </div>
                        </form>
                    </div>
                </div>

                <button className="edit-button" onClick={() => { add_record(); }}>
                    Add Earning
                </button>

            </div>


    </div>
);
};

export default AddEarning;
