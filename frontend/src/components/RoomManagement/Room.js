import React from 'react'
import { more_horizontal } from '../../assets/images/SVG'

function Room({room, setTypeModal, setEditFor}) {
    const changeState = () => {
        setTypeModal(true);
        setEditFor(room);
    }

    return (
        <div className="roomcard" onClick={() => changeState()} >
            {/* <h4 className="id">{room.id}</h4> */}
            {room.room_type.includes("(") ? (
              <>
                <h3 className="name">{room.room_type.split("(")[0]}</h3>{" "}
                <h4>{room.room_type.split("(").pop().split(")")[0]}</h4>
              </>
            ) : (
              <h3 className="name">{room.room_type}</h3>
            )}
            <div className="circle"></div>
            <div className="option">{more_horizontal}</div>
            <div className="tariff">
              <p>
                {room.tariff} <span>৳</span>
              </p>
              <div>
                <div className="vat">+ vat</div>
                <div className="discount">- discount</div>
              </div>
            </div>
          </div>
    )
}

export default Room
