import React from 'react'

function Guest({name, phone, checkin, checkout, status, room}) {
    return (
        <div className="guest">
            <div className="name">{name}</div>
            <div className="phone">{phone}</div>
            <div className="checkin">{checkin}</div>
            <div className="checkout">{checkout}</div>
            <div className={status === "Paid" ? "status paid" : "status due"}>
                {
                    status === "Paid"
                    ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>)
                    : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>)
                }
                {status}
            </div>
            <div className="room">{room}</div>
        </div>
    )
}

export default Guest
