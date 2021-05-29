import React, { useState, useRef } from "react";
import { checkSquare } from "../../assets/images/SVG";
import gsap from "gsap";

function OrderItem({
  id,
  guest,
  roomsfrom,
  food,
  isComplete,
  isCancel,
  quantity,
  selectFoodItem,
  removeFoodItem,
  setWarnings,
}) {
  const [select, setSelect] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const rref = useRef(null);

  const controlRoomBlock = () => {
    let tl = gsap.timeline();

    if(roomsfrom.length > 2) {
      if (!openRoom) {
        tl.to(rref.current, 0.5, {
          css: { zIndex: 2, height: "26vh" },
          height: "12vh",
          ease: "expo.in",
        });
        setOpenRoom(!openRoom);
      } else {
        tl.to(rref.current, 0.5, {
          css: { zIndex: 1, height: "6vh" },
          ease: "expo.in",
        });
        setOpenRoom(!openRoom);
      }
    }
  };

  const selectFoodItemFunc = () => {
    if (select) {
      setSelect(false);
      removeFoodItem(id);
    } else {
      if (!isComplete && !isCancel && guest) {
        setSelect(true);
        selectFoodItem(id);
      } else {
        setTimeout(() => {
          setWarnings(false);
        }, [1500]);
        setWarnings(true);
      }
    }
  };

  return (
    <div
      className={!select ? "orderItem" : "orderItem selected"}
      onClick={selectFoodItemFunc}
    >
      <div className="no">
        {select ? checkSquare : null}
        <div>{id}</div>
      </div>
      <div
        className={!openRoom ? "rooms" : "rooms rooms-colored"}
        onClick={controlRoomBlock}
      >
        {roomsfrom && roomsfrom.length > 0 ? (
          <div ref={rref} className="roomNumb">
            {roomsfrom.map((room) => (
              <div key={room}>{room}</div>
            ))}
          </div>
        ) : (
          "None / Leaved"
        )}
      </div>
      <div className="guest">{guest ? guest : "/"}</div>
      <div className="food">{food}</div>
      <div
        className={
          isComplete || !guest
            ? "status complete"
            : isCancel
            ? "status cancel"
            : "status pending"
        }
      >
        <p>
          {isComplete || !guest
            ? "completed"
            : isCancel
            ? "canceled"
            : "pending"}
        </p>
      </div>
      <div className="quantity">{quantity}</div>
    </div>
  );
}

export default OrderItem;
