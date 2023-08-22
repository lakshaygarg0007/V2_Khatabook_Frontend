import React, { useEffect } from 'react'
import Login from "./login/Login.jsx";
import Content from "./layout/Content/Content.jsx";

function Goto() {

    const user_data = sessionStorage.getItem("user_data")
    console.log('user_data: ' + user_data)

    const isAuthenticated = () => {
        if (user_data === null || user_data === 'null') {
            return <Login/>
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
