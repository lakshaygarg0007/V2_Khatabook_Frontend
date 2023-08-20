import { create } from 'zustand';
import ipAddress from "../ipAddress.jsx";
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: "63c3cc724a4ed3fd4bc79cfb" })
};

const useCalendar = create((set)=> ({

    currentEvents: [], // Initialize with an empty array
    setCurrentEvents: (events)=> set({currentEvents: events}),
    fetchAndSetEvents: async () => {
        try {
            const response = await fetch(ipAddress + '/getCalendarData', options);
            const eventData = await response.json();
            set({ currentEvents: eventData });
        } catch (error) {
            console.error('Error fetching calendar data:', error);
        }
    }
}));


export default useCalendar;
