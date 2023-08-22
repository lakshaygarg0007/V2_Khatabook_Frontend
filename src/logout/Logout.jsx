import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from "react";

export default function Logout() {
    const navigate = useNavigate();
        useEffect(() => {
            sessionStorage.setItem('user_data', null)
            navigate('/login')
        }, []);

    return (
        <>
            <div className="main-content">
                <div className="login-grid">
                    <div className="logo-info">
                        <h1>KhataBook</h1>
                        <p>Manage All Your Expenses Here</p>
                    </div>
                </div>
            </div>
        </>
    )
}