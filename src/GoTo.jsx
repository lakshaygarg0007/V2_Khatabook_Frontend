import React, { useEffect } from 'react'
import Login from "./login/Login.jsx";
import Content from "./layout/Content/Content.jsx";
import {useNavigate} from "react-router-dom";

function Goto() {
    const navigate = useNavigate();
    const user_data = sessionStorage.getItem("user_data")
    console.log('user_data: ' + user_data)

    const isAuthenticated = () => {
        if (user_data === null || user_data === 'null') {
            navigate('/login'); // Redirect to login page
            return null; // Return null
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
