import React from 'react'

function RoomAndDate({rooms}) {
    return (
        <div className="roomanddate">
            <h1><span>01</span> Rooms</h1>

            <div className="rooms">
                {rooms.map(room => (
                    <div className="room">
                        <h3>{room.room_type}</h3>
                        <p>{room.tariff}৳ <span>PER/NIGHT</span></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RoomAndDate
