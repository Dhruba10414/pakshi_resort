import React from 'react';

function RoomInfoCard({type, available}) {
    return (
        <div className="roomInfoDetail">
            <h3>{type}</h3>
            <div className="value">{available}</div>
        </div>
    )
}

export default RoomInfoCard
