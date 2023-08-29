// Import necessary libraries and components
import React, {useEffect, useState} from 'react';
import ContentTop from '../components/ContentTop/ContentTop.jsx';
import Board, {moveCard, moveColumn, removeCard, addCard} from '@asseinfo/react-kanban';
import "@asseinfo/react-kanban/dist/styles.css";
import useBoard, {boardData, useBoard1} from '../utils/Board.js';
import {IoMdAdd} from 'react-icons/io'
import AddCardModal from './AddCardModal.jsx';
import {RxCross2} from 'react-icons/rx'
import "./Board.css"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import ipAddress from "../ipAddress.jsx";
import {create} from "zustand";
import Sidebar from "../layout/Sidebar/Sidebar.jsx";

const BoardPage = () => {

    const {board, setBoard} = useBoard()
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)
    const [selectedColumnStatus, setSelectedColumnStatus] = useState(null);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: userData.id})
    }

    const openAddCardModal = (status) => {
        setSelectedColumnStatus(status);
        setModalOpened(true);
    };

    const getTaskCountForStatus = (status) => {
        const column = board.columns.find((col) => col.status === status);
        return column ? column.cards.length : 0;
    };

    const changeCardStatus = (id, status) => {
        const apiUrl = ipAddress + '/changeCardStatus';
        const options1 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({card_id: id, new_status: status})
        }
        const res = fetch(apiUrl, options1);
    }

    useEffect(() => {
        const apiUrl = ipAddress + '/getBoard';
        console.log('fetching data')
        fetch(apiUrl, options)
            .then((response) => response.json())
            .then((data) => {
                setBoard({columns: data});
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
        const column = getColumn(_card);
        const status = column.status;
        changeCardStatus(_card.id, getStatus(destination))
    }

    const getStatus = (destination) => {
        const status = {1: "TODO", 2: "IN_PROGRESS", 3: "REVIEW", 4: "DONE"};
        return status[destination.toColumnId];
    };


    const getColumn = (card) => {
        const column = board.columns.filter((column) => column.cards.includes(card))
        return column[0]
    }


    const getGradient = (card) => {
        const column = getColumn(card);
        const status = column.status;
        const gradientStyle = {
            background: "",
            color: "white" // Setting the text color to white
        };

        if (status === "TODO") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 189, 220) 163.54%)";
        } else if (status === "IN_PROGRESS") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(220, 48, 48) 163.54%)";
        } else if (status === "REVIEW") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 220, 86) 163.54%)";
        } else if (status === "DONE") {
            gradientStyle.background = "linear-gradient(65.35deg, rgba(65, 65,65, 0.67) -1.72%, rgba(134, 48, 220) 163.54%)";
        }

        return gradientStyle;
    };

    const deleteBoard = async (id) => {
        const response = await fetch(ipAddress + '/deleteBoard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ boardId: id }),
        });

        if (response.ok) {
            window.location.reload();
        }
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
        <>
            <Sidebar/>
            <div className="main-content">
                <ContentTop/>
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
                                                    deleteBoard(props.id)
                                                }}
                                        >
                                            <RxCross2 color="white" size={15}/>
                                        </button>
                                    </div>
                                    <span>{props.description}</span>
                                </div>
                            )}
                            renderColumnHeader={(props) => (
                                <div className='column-header'>

                                    <span>{props.status} ({getTaskCountForStatus(props.status)}) </span>
                                    <IoMdAdd
                                        color="black"
                                        size={25} title="Add card"
                                        onClick={() => openAddCardModal(props.status)}
                                    />

                                    <AddCardModal visible={modalOpened} handleCardAdd={handleCardAdd}
                                                  onClose={() => setModalOpened(false)} statusData = {selectedColumnStatus}
                                    />
                                </div>
                            )}
                        >
                            {board}
                        </Board>

                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardPage;
