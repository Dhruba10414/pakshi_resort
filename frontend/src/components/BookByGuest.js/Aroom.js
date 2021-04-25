import React from 'react'

function Aroom({room, selectRoomType}) {
    const {id, name, bed, price} = room;
    return (
        <div className="aroom" onClick={() => selectRoomType(id, name, bed, price)}>
            <div className="content">
                <h2>{name}</h2>
                <h3>{bed}</h3>
                <h1>{price}</h1>
            </div>
        </div>
    )
}

export default Aroom
