import React from 'react'

function FoodOrder({id, name, room_no}) {
    return (
        <div>
            {name}
            {room_no}
        </div>
    )
}

export default FoodOrder