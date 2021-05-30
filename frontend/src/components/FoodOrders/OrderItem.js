import React, { useState, useRef } from "react";
import { checkSquare, clipboard } from "../../assets/images/SVG";
import gsap from "gsap";

function OrderItem({
  id,
  guest,
  roomsfrom,
  food,
  isComplete,
  isCancel,
  quantity,
  notes,
  selectFoodItem,
  removeFoodItem,
  setWarnings,
}) {
  const [select, setSelect] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const rref = useRef(null);
  const nref = useRef(null);

  const controlRoomBlock = (reference) => {
    let tl = gsap.timeline();

    if (roomsfrom.length > 2) {
      if (!openRoom) {
        tl.to(reference.current, 0.5, {
          css: { zIndex: 2, height: "26vh" },
          height: "12vh",
          ease: "expo.in",
        });
        setOpenRoom(!openRoom);
      } else {
        tl.to(reference.current, 0.5, {
          css: { zIndex: 1, height: "6vh" },
          ease: "expo.in",
        });
        setOpenRoom(!openRoom);
      }
    }
  };

  const controlNoteBlock = (reference) => {
    let tl = gsap.timeline();

    if (!openNote) {
      tl.to(reference.current, 0.5, {
        css: { zIndex: 2, height: "26vh" },
        ease: "expo.in",
      });
      setOpenNote(!openNote);
    } else {
      tl.to(reference.current, 0.5, {
        css: { zIndex: 1, height: "6vh" },
        ease: "expo.in",
      });
      setOpenNote(!openNote);
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
      <div className="no">{select ? checkSquare : null}</div>
      <div
        className={!openRoom ? "rooms" : "rooms rooms-colored"}
        onClick={() => controlRoomBlock(rref)}
      >
        {roomsfrom && roomsfrom.length > 0 ? (
          <div ref={rref} className="roomNumb">
            {roomsfrom.map((room) => (
              <div key={room}>{room}</div>
            ))}
          </div>
        ) : (
          <div
            className="roomNumb"
            style={{ color: "gray", fontWeight: "bold" }}
          >
            none
          </div>
        )}
      </div>
      <div className="guest">{guest.name.length > 0 ? guest.name : "/"}</div>
      <div className="food">{food}</div>
      <div
        className={
          isComplete || guest.email === 'xyz@gmail.com'
            ? "status complete"
            : isCancel
            ? "status cancel"
            : "status pending"
        }
      >
        <p>
          {isComplete || guest.email === 'xyz@gmail.com'
            ? "completed"
            : isCancel
            ? "canceled"
            : "pending"}
        </p>
      </div>
      <div className="quantity">{quantity}</div>
      <div className={!openNote ? "notes" : "notes notes-colored"} onClick={() => controlNoteBlock(nref)}>
        {notes && notes.length > 0 ? (
          <div className="con" ref={nref}>
            <div className="green">{clipboard} note</div>
            <div className="text">{notes}</div>
          </div>
        ) : (
          <div className="con">
            <div className="red"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
