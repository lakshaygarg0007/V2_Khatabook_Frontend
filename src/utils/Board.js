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
            status: "Backlog",
            cards: [
                {
                    title: "Database Setup",
                    description: "Firebase Integration"
                },
                {
                    title: "Data Flow",
                    description: "Setup Diagram with other developers"
                },
            ]
        },
        {
            id: 2,
            status: "TODO",
            cards: [
                {
                    id: 9,
                    title: "Data Table Page",
                    description: "Server side Pagination",
                }
            ]
        },
        {
            id: 3,
            status: "Doing",
            cards: [
                {
                    id: 10,
                    title: "Full Calendar Extension",
                    description: "Make new events and store in global states"
                },
                {
                    id: 11,
                    title: "Custom Kanban Board",
                    description: "Setup react-kanban dep within Dashboard as seperate page"
                }
            ]
        },
        {
            id: 4,
            status: "Completed",
            cards: [
                {
                    id: 12,
                    title: "Vite Server Setup",
                    description: "Configure required modules and starters",
                },
                {
                    id: 13,
                    title: "Modular structre",
                    description: "Write css in form of modules to reduce the naming conflicts"
                }
            ]
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