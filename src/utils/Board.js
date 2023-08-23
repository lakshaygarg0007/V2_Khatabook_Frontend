import {create} from 'zustand'
import ipAddress from "../ipAddress.jsx";

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: "63c3cc724a4ed3fd4bc79cfb" })
};

export const boardData = {
    columns: [
        {
            "id": 1,
            "status": "TODO",
            "cards": []
        },
        {
            "id": 2,
            "status": "IN_PROGRESS",
            "cards": []
        },
        {
            "id": 3,
            "status": "REVIEW",
            "cards": []
        },
        {
            "id": 4,
            "status": "DONE",
            "cards": []
        }
    ]
}

const useBoard = create((set)=> ({
    board: boardData,
    setBoard: (board)=> set((state)=> ({board}))
}))

const useBoard1 = create((set)=> ({

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

export default useBoard;
export {useBoard1};