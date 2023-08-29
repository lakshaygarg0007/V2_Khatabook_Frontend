import React, {useEffect} from 'react';
import './App.css';
import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Earnings from './earnings/Earnings.jsx';
import Expenses from "./expenses/Expenses";
import AddEarning from "./earnings/AddEarnings";
import AddExpense from "./expenses/AddExpense.jsx";
import Board from "./trelloboard/Board";
import Calendar from "./calender/Calender";
import SubscriptionCard from "./components/Subscriptions/SubscriptionCard.jsx";
import SubscriptionsPage from "./subscription/SubscriptionsPage";
import AddSubscription from "./subscription/AddSubscription.jsx";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import Stocks from "./stocks/Stocks";
import StockPrices from "./stocks/Stocks";
import Logout from "./logout/Logout";
import Goto from "./GoTo";
import Signup from "./signup/Signup";
import EditEarning from "./earnings/EditEarning";
import {useState} from "react";
import EditExpense from "./expenses/EditExpense";
import AddStock from "./stocks/AddStock";

function App() {
    const isLoginRoute = window.location.pathname === "/login";
    const isSignUpRoute =  window.location.pathname === "/signup"; // Check if the current route is the login route
    //const [user_data] = useState(sessionStorage.getItem("user_data"))
    const [user_data, setUserData] = useState(null);

    useEffect(() => {
        const userDataFromSession = sessionStorage.getItem('user_data');
        setUserData(userDataFromSession)
    }, []);

    return (
        <Router>
            <div className='app'>
                <Routes>
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/addEarning" element={<AddEarning />} />
                    <Route path="/addExpense" element={<AddExpense />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/addSubscriptions" element={<AddSubscription />} />
                    <Route path="/addStock" element={<AddStock />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/stocks" element={<StockPrices />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/editEarning" element={<EditEarning />} />
                    <Route path="/editExpense" element={<EditExpense />} />
                </Routes>
                <Routes>
                    <Route path="/" element={<Goto />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
