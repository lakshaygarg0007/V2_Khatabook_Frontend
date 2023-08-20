import React from 'react';
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
import Subscriptions from "./components/Subscriptions/Subscriptions.jsx";
import SubscriptionsPage from "./subscription/SubscriptionsPage";
import AddSubscription from "./subscription/AddSubscription.jsx";
import Profile from "./profile/Profile";

function App() {
    return (
        <Router>
            <div className='app'>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/addEarning" element={<AddEarning />} />
                    <Route path="/addExpense" element={<AddExpense />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/addSubscriptions" element={<AddSubscription />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
