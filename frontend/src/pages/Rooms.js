import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import room from '../assets/images/resort/room4.jpg'

function Rooms() {
    return (
        <>
            <div className="roooms">
                <div className="roooms__banner">
                    <div className="banner-left"></div>
                    <div className="banner-right">
                        <div className="heading">
                            <p>Stay with us</p>
                            <h1>Rooms & Suits</h1>
                        </div>
                        <div className="image">
                            <img src={room} alt=""/>
                            <div className="design">
                                <div className="left"></div>
                                <div className="right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content"></div>
            </div>
            {/* <Navigation /> */}
        </>
    )
}

export default Rooms
