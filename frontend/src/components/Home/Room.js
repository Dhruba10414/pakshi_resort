import React from 'react'

function Room({image, name}) {
    return (
        <div 
            className="room"
            style={{background: `url(${image}) no-repeat center center / cover, rgba(0,0,0,0.7)`}}
        >
            <h2>{name}</h2>
        </div>
    )
}

export default Room
