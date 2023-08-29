import React, {useState} from "react";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import "./Profile.css";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";

const Users = () => {
    const [open, setOpen] = useState(false);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)

    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <ContentTop/>
                <div className="grid-two-item grid-common grid-c4">
                    <div className="user-details">
                        <div className="user-detail">
                            <label className="label">Username:</label>
                            <span className="value">las</span>
                        </div>
                        <div className="user-detail">
                            <label className="label">Fullname:</label>
                            <span className="value">{userData.name}</span>
                        </div>
                        <div className="user-detail">
                            <label className="label">Email:</label>
                            <span className="value">{userData.email}</span>
                        </div>
                        <div className="user-detail">
                            <label className="label">Phone:</label>
                            <span className="value">{userData.mobile_number}</span>
                        </div>
                        <div className="user-detail">
                            <label className="label">Subscription Type:</label>
                            <span className="value verified">{userData.subscription_type}
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
