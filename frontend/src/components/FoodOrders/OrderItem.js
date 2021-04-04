import React, { useState } from 'react'
import { checkSquare } from '../../assets/images/SVG'

function OrderItem({id, guest, food, isComplete, isCancel, quantity}) {
    const [select, setSelect] = useState(false);
    
    return (
        <div 
            className={!select ? "orderItem" : "orderItem selected"}
            onClick={() => setSelect(!select)}
        >
            <div className="no">
                {select ? checkSquare : null}
                <div>{id}</div>
            </div>
            <div className="guest">{guest}</div>
            <div className="food">{food}</div>
            <div
             className={isComplete ? "status complete" : isCancel ? "status cancel" : "status pending"}
            >
                <p>{isComplete ? "complete" : isCancel ? "cancel" : "pending"}</p>
            </div>
            <div className="quantity">{quantity}</div>
        </div>
    )
}

export default OrderItem
