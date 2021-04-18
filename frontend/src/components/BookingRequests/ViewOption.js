import React, { useState } from "react";
import { checked, pencil, x } from "../../assets/images/SVG";
import check from '../../assets/images/View/svg/check-hand.svg'
import Loading from "../Loading";

function ViewOption({ loading,  availableroom, viewFor }) {
  const [state, setState] = useState(false);
  const [selectedroom, setSelectedRoom] = useState([]);
  const [ok, setOk] = useState(0);

  // SELECT ROOM
  const selectRoom = (id, num) => {
      if(selectedroom.length <= viewFor.info.numberOfRooms){
        setSelectedRoom([...selectedroom, {id, num}]);
      } else{
        setOk(true);
      }
      console.log(selectedroom.length)
  }
  
  const makeAbooking = () => {
    console.log(viewFor);
    console.log(selectedroom);
    
  }

  return (
    <div className="activities">
      <h3>Options</h3>
      <div className="options" onClick={makeAbooking}>
        <div className="option confirm">
          <div className="logo">{checked}</div>
          <div>Confirm</div>
        </div>
        <div className="option cancel">
          <div className="logo">{x}</div>
          <div>Cancel</div>
        </div>
        <div className="option edit" onClick={() => setState(3)}>
          <div className="logo">{pencil}</div>
          <div>Edit</div>
        </div>
      </div>

      {/* ---------------- activities ------------- */}
      <h3>Activities</h3>
      <div className="work">
        {!loading
          
          ? !state 
            ? !ok
                ? availableroom.length > 0 
                    ? (<div className="ava">
                        {availableroom.map((room) => (
                        <div className="ava-room" key={room.id} onClick={() => selectRoom(room.id, room.room_num)}>
                            <div className="heading">Room</div>
                            <div className="value">{room.room_num}</div>
                        </div>
                        ))}
                    </div>)
                    : <div className="notava">No room is available</div>
                : <div className="notava">
                    <img src={check} alt="" />
                    <p>{selectedroom.num} number room is ready to book.</p>
                    <h4>Click <span>Confirm</span> button to confirm booking</h4>
                    <button onClick={() => setOk(false)}>Go Back</button>
                  </div>
            : <div className="edit">Edit</div>

         : <Loading width="100%" height="45vh" text="Find available rooms" textSize="14px" />
        }
      </div>
    </div>
  );
}

export default ViewOption;
