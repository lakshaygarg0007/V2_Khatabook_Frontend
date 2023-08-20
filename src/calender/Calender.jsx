import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calender.css';
import useCalendar from "../utils/Calender.js";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import React, { useEffect } from "react";
import ipAddress from "../ipAddress.jsx";

const Calendar = () => {
    const { currentEvents, fetchAndSetEvents } = useCalendar()

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: "63c3cc724a4ed3fd4bc79cfb" })
    };

    const handleEvents = async (events) => {
        await setCurrentEvents(events);
    };

    useEffect(() => {
        fetchAndSetEvents();
    }, []);

    const handleDateSelect = async (selectInfo) => {
        let title = prompt('Please enter a title for the event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.start,
                end: selectInfo.end,
                allDay: selectInfo.allDay
            });

            try {
                const response = await fetch(ipAddress + '/addCalendarEvent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEvent),
                });

                if (response.ok) {
                    const eventData = await response.json();
                    calendarApi.addEvent({
                        id: eventData._id, // Use the appropriate event ID
                        title: eventData.title,
                        start: eventData.start_date,
                        end: eventData.end_date,
                    });
                } else {
                    console.error('Failed to add event');
                }
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
    };

    const handleEventClick = (clickInfo) => {
        if (confirm('Are you sure you want to delete this event?')) {
            clickInfo.event.remove();
        }
    };

    return (
        <div className="main-content">
            <ContentTop />
            <div className="grid-two-item grid-common grid-c4">
                <div className="calendar-container">
                    <div>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay"
                            }}
                            allDaySlot={false}
                            initialView="timeGridWeek"
                            slotDuration={"01:00:00"}
                            slotMinTime="08:00:00"
                            slotMaxTime="22:00:00"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            slotMinHeight={80}
                            slotMaxHeight={80}
                            dayMaxEvents={true}
                            weekends={true}
                            nowIndicator={true}
                            initialEvents={currentEvents} // Use API data here
                            eventsSet={handleEvents}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            contentHeight="auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
