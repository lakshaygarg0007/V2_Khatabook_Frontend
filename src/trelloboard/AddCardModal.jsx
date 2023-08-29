import React from 'react'
import Rodal from 'rodal'
import "rodal/lib/rodal.css";
import css from './AddCardModal.module.css'
import ipAddress from "../ipAddress.jsx";
import {useState} from "react";


const AddCardModal = ({ visible, onClose, handleCardAdd, statusData }) => {
    const customStyles = {
        background: "rgb(58 58 58)",
        padding: "20px",
        width: "50%",
        top: "-3rem",
        height: "fit-content",
        maxWidth: "40rem"

    }
    const [title1, setTitle1] = React.useState('')
    const [detail, setDetail] = React.useState('')
    const [user_data] = useState(sessionStorage.getItem("user_data"))
    const userData = JSON.parse(user_data)
    const [cardAdded, setCardAdded] = useState(false);

    const add_record = (async () => {
        console.log('abc')
        const response = await fetch(ipAddress + '/addBoard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                user_id: userData.id,  title: title1, description: detail, status: statusData, date: new Date(),
            }),
        })
        if (response.ok) {
            setCardAdded(true); // Mark card as added
            onClose(); // Close the dialog
            window.location.reload(); // Reload the page
        }
    });

    return (
        <Rodal customStyles={customStyles} visible={visible} onClose={onClose}>
            <div className={css.container}>
                <div>
                    <span className={css.label}>Card Title</span>
                    <input type="text" className={css.input} value={title1} onChange={(e) => setTitle1(e.target.value)} />
                </div>

                <div>
                    <span className={css.label}>Detail</span>
                    <textArea
                        rows={10} className={css.input} value={detail}
                        type="text" onChange={(e) => setDetail(e.target.value)} />
                </div>

                <button
                    disabled={title1=== "" && detail === ""}
                    className={css.saveButton}
                    onClick={()=> {
                        add_record()
                    }}
                >
                    Add
                </button>
            </div>
        </Rodal>
    )
}

export default AddCardModal