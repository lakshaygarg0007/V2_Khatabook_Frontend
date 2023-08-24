import { iconsImgs } from "../../utils/images";
import "./Transactions.css";
import {useEffect, useState} from "react";
import ipAddress from "../../ipAddress.jsx";

const ExpenseCard = () => {
    const [expenses, setExpenses] = useState(0);
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
        setExpenses(userData.expense)
        // } else {
        //      const baseUrl = ipAddress;
        //     async function fetchExpense() {
        //     try {
        //             const totalEarningsResponse = await fetch(baseUrl + '/getTotalExpense', options);
        //             const totalEarningsData = await totalEarningsResponse.json();
        //             const totalEarnings = totalEarningsData[0].total_expense;
        //             setExpenses(totalEarnings);
        //         } catch (error) {
        //             console.error("Error fetching earnings:", error);
        //         }
        //     }
        // }
        //fetchExpense();
    }, []);

    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text text-black">Total Expense</h3>
                <button className="grid-c-title-icon">
                    <img src={ iconsImgs.plus } onClick={() => window.location.href = '/addExpense'}/>
                </button>
            </div>
            <div className="expense-card">
                <span className="card-pin-hidden">{formatNumberWithCommas(expenses)}</span>
            </div>
        </div>
    )
}

export default ExpenseCard
