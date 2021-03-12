import React from 'react'

function Guest({name, phone, checkin, checkout, status, room}) {
    return (
        <div className="guest">
            <div className="name">{name}</div>
            <div className="phone">{phone}</div>
            <div className="checkin">{checkin}</div>
            <div className="checkout">{checkout}</div>
            <div className={status === "Paid" ? "status paid" : "status due"}>{status}</div>
            <div className="room">{room}</div>
        </div>
    )
}

export default Guest
