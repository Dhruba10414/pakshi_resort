import React from 'react';

function RoomInfoCard({type, available, openBookingForm}) {
    return (
        <div className="roomInfoDetail" onClick={() => openBookingForm(type)}>
            <h3>{type}</h3>
            <div className="value">{available}</div>
        </div>
    )
}

export default RoomInfoCard
