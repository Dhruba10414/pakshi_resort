import React from 'react'

function Room({no, status, active_booking}) {
    return (
        <div className="aroom">
            <div className="no">{no}</div>
            <div className={status ? "status lock" : "status free"}>
            {
                status ? <p>Locked</p> : <p>Free</p>
            }
            </div>
            <div className="guest">{active_booking ? active_booking.guest : "--"}</div>
            <div className="guest-name">{active_booking ? active_booking.guestName : "--"}</div>
            
            <div className={active_booking ? active_booking.payment ? "paymentStatus paid" : "paymentStatus due" : "paymentStatus"}>
            {
                active_booking
                ? active_booking.payment
                    ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Paid</>)
                    : (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> Due </>)
                : "--"
            }
            </div>
            <div className="food-order"></div>
            <div className="checkout"></div>
        </div>
    )
}

export default Room
