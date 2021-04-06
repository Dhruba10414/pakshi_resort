import React, { useState } from "react";
import {check} from '../../assets/images/SVG';

function AddFood({cancelUpdate}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("B");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // REQUIRED FIELD CHECK
  const requiredValidaion = () => {
    if(name && price){
      return true;
    } else{
      setError("Required all fields.");
      return false;
    }
  }

  // NOTIFY IF FOOD UPDATED SUCCESSFULLY
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    setSuccess(true);
  }
  
  // ADD FOOD TO MENU
  const addFoodToMenu = (event) => {
    event.preventDefault();
    if(requiredValidaion()){
      notify(true);
      console.log(name, type, desc, price);
    }
  }

  return (
    <div className="addFood">
      {/* HEADING */}
      <div className="heading">
        <h3>Add</h3>
        <p>food</p>
      </div>

      {/* FOOD ITEM ADDING FORM */}
      <form onSubmit={addFoodToMenu}>
        <div className="input-container">
          <div className="input w-70">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input w-30">
            <label>Type</label>
            <div className="select">
              <select
                name="role"
                id="role"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="B">Breakfast </option>
                <option value="L">Lunch</option>
                <option value="D">Dinner</option>
                <option value="S">Snacks</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-container">
          <div className="input w-100">
            <label>Description</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input w-50">
            <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        
        <small>{error}</small>
        
        <div className="btn-box">
          {!loading ? (
            <>
              <button className="submit-btn" onClick={addFoodToMenu}>Update</button>
              <button className="cancel-btn" onClick={cancelUpdate}>Cancel</button>
            </>
          ) : (
            <button className="disabled-btn">Processing...</button>
          )}
        </div>

        <div className={success ? "success-message" : "success-message disabled"}>
          <div>{check}</div> Successfully Updated!
        </div>
      </form>
    </div>
  );
}

export default AddFood;
