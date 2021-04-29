import React from 'react';
import poolSVG from "../../assets/images/View/svg/pools-white.svg";
import plusSVG from "../../assets/images/View/svg/plus-white.svg";
import wifiSVG from "../../assets/images/View/svg/wifi-white.svg";
import cofeeSVG from "../../assets/images/View/svg/coffee-white.svg";

function Aroom({room, selectRoomType}) {
    const {id, name, bed, price} = room;
    return (
        <div className="aroom" onClick={() => selectRoomType(id, name, bed, price)}>
            <div className="content">
                <h2>{name}</h2>
                <h3>{bed}</h3>
                <div className="feature-box">
                    <div><img src={cofeeSVG} alt="" /></div>
                    <div><img src={wifiSVG} alt="" /></div>
                    <div><img src={poolSVG} alt="" /></div>
                    <div><img src={plusSVG} alt="" /></div>
                </div>
                <p>{room.desc}</p>
                <h1>{price}<span>৳</span></h1>
                <div className="vat">PER / NIGHT</div>
            </div>
        </div>
    )
}

export default Aroom
