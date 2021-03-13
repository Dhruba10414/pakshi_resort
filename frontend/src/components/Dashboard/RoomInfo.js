import React from 'react';
import search from "../../assets/images/StaffSection/search.svg";
import notfound from "../../assets/images/StaffSection/notFound.svg";

function RoomInfo() {
    return (
        <div className="roomInfo">
            <div className="beforeSearch">
                <div>
                    <img src={search} alt="" />
                    <h2>Fill Checkin & Checkout date to view available rooms</h2>
                </div>
            </div>
            <div className="afterSerch"></div>
            <div className="serchFailed"></div>
        </div>
    )
}

export default RoomInfo
