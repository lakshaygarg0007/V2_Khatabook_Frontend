// Import necessary libraries and components
import React, {useEffect, useState} from 'react';
import ContentTop from '../components/ContentTop/ContentTop.jsx';
import Board, { moveCard, moveColumn, removeCard, addCard } from '@asseinfo/react-kanban';
import "@asseinfo/react-kanban/dist/styles.css";
import useBoard, {boardData, useBoard1} from '../utils/Board.js';
import { IoMdAdd } from 'react-icons/io'
import AddCardModal from './AddCardModal.jsx';
import { RxCross2 } from 'react-icons/rx'
import "./Board.css"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import ipAddress from "../ipAddress.jsx";
import {create} from "zustand";

const BoardPage = () => {

    const { board, setBoard } = useBoard()

    useEffect(() => {
        const apiUrl = ipAddress + '/getCalendarData'; // Replace with your API endpoint
        fetch(apiUrl, options)
            .then((response) => response.json())
            .then((data) => {
                set_boardData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleColumnMove = (_card, source, destination) => {
        const updatedBoard = moveColumn(board, source, destination)
        setBoard(updatedBoard)
    }

    const handleCardMove = (_card, source, destination) => {
        const updatedBoard = moveCard(board, source, destination)
        setBoard(updatedBoard)
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: "63c3cc724a4ed3fd4bc79cfb" })
    }

    const getColumn = (card) => {
        const column = board.columns.filter((column) => column.cards.includes(card))
        return column[0]
    }

    useEffect(async () => {
        const response = await fetch(ipAddress + '/getBoard', options);
        fetchBoard(r)
    }, []);

    const getGradient = (card) => {
        const column = getColumn(card);
        const status = column.status;
        const gradientStyle = {
            background: "",
            color: "white" // Setting the text color to white
        };

        if (status === "TODO") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 189, 220) 163.54%)";
        } else if (status === "Doing") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(220, 48, 48) 163.54%)";
        } else if (status === "Completed") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 220, 86) 163.54%)";
        } else if (status === "Backlog") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65,65, 0.67) -1.72%, rgba(134, 48, 220) 163.54%)";
        }

        return gradientStyle;
    };

    const [modalOpened, setModalOpened] = useState(false);

    const handleCardAdd = (title, detail) => {
        const card = {
            id: new Date().getTime(),
            title,
            description: detail
        };

        const updatedBoard = addCard(board, props, card);
        setBoard(updatedBoard);
        setModalOpened(false);
    };

    return (
        <div className="main-content">
            <ContentTop />
            <div>
                <div className="grid-two-item grid-common grid-c4">
                    <Board
                        allowAddColumn
                        allowRenameColumn
                        allowRemoveCard
                        onCardDragEnd={handleCardMove}
                        onColumnDragEnd={handleColumnMove}
                        renderCard={(props) => (
                            <div className='grid-items kanban-card' style={getGradient(props)}>
                                <div>
                                    <div>
                                        {props.title}
                                    </div>
                                    <button className='grid-c-title-text' type='button'
                                            onClick={() => {
                                                const updatedBoard = removeCard(board,
                                                    getColumn(props),
                                                    props
                                                )
                                                setBoard(updatedBoard)
                                            }}
                                    >
                                        <RxCross2 color="white" size={15} />
                                    </button>
                                </div>
                                <span>{props.description}</span>
                            </div>
                        )}
                        renderColumnHeader={(props) => (
                            <div className='column-header'>

                                <span>{props.status}</span>
                                <IoMdAdd
                                    color="white"
                                    size={25} title="Add card"
                                    onClick={() => setModalOpened(true)}
                                />
                                <AddCardModal visible={modalOpened} handleCardAdd={handleCardAdd}
                                              onClose={() => setModalOpened(false)} />
                            </div>
                        )}
                    >
                        {board}
                    </Board>
                </div>
            </div>
        </div>
    );
};

export default BoardPage;
