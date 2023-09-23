import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calender.css';
import useCalendar from "../utils/Calender.js";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import React, { useEffect } from "react";
import ipAddress from "../ipAddress.jsx";
import {useState} from "react";
import {iconsImgs} from "../utils/images.js";

const CalenderCard = () => {
    const [calendarData, setCalendarData] = useState(null);
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({ user_id: "63c3cc724a4ed3fd4bc79cfb" })
    };


    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const response = await fetch(ipAddress + '/getCalendarData', options);
                if (response.ok) {
                    const eventData = await response.json();
                    setCalendarData(eventData); // Set the fetched data to the state
                } else {
                    console.error('Failed to fetch calendar data');
                }
            } catch (error) {
                console.error('Error fetching calendar data:', error);
            }
        };

        fetchCalendarData(); // Call the fetch function
    }, []);


    return (
        <div className="grid-two-item grid-common grid-c5">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text text-black">Upcoming Meetings</h3>
                <button className="grid-c-title-icon">
                    <img src={ iconsImgs.plus } onClick={() => window.location.href = '/calendar'} />
                </button>
            </div>
            <div className="grid-c5-content">
                    <div>
                        {calendarData && calendarData.map((budgetItem) => (
                            <div className="grid-item" key={budgetItem._id}>
                                <div className="grid-item-r">
                                    <span className="calendar-card-font">{budgetItem.title}</span>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-scarlet wide-column">at {new Date(budgetItem.end_date).toLocaleTimeString("en-GB")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default CalenderCard;
