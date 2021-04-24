import React from 'react'

function Aroom({room}) {
    return (
        <div className="aroom">
            <div className="content">
                <h2>{room.name}</h2>
                <h3>{room.bed}</h3>
                <h1>{room.price}</h1>
            </div>
        </div>
    )
}

export default Aroom
