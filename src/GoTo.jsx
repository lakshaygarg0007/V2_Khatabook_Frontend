import React, {useEffect, useState} from 'react'
import Login from "./login/Login.jsx";
import Content from "./layout/Content/Content.jsx";
import {useNavigate} from "react-router-dom";

function Goto() {
    const navigate = useNavigate();
    const [user_data, set_user_data] = useState(null);
    console.log('user_data: ' + user_data)

    useEffect(() => {
        const user_data = sessionStorage.getItem("user_data")
        set_user_data(user_data)
    })

    const isAuthenticated = () => {
        if (user_data === null || user_data === 'null') {
            return <Login/>; // Redirect to login page
        } else {
            console.log('im here')
            return <Content />;
        }
    };


    return (
        isAuthenticated()
    )
}

export default Goto;
