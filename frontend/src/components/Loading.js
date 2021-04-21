import React from 'react';
import loadingGif from "../assets/images/View/svg/loading.gif"

function Loading({height, width, textSize, space, text}) {
    return (
        <div className="loading" style={{height: height, width: width}}>
            <img src={loadingGif} alt="" />
            <h2 style={{fontSize: textSize, letterSpacing: space}}>
                {text ? text : "LOADING"}
            </h2>
        </div>
    )
}

export default Loading
