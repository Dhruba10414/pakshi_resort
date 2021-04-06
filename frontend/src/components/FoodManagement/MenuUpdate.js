import React, { useEffect, useState } from "react";
import {check} from '../../assets/images/SVG';

function MenuUpdate({selectedFood, cancelUpdate}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLaoding] = useState(false);
  const [success, setSuccess] = useState(false);

  // REQUIRED FIELD CHECK
  const requiredValidaion = () => {
    if(name && price){
      return true;
    } else{
      setError("Required all fields.")
      return false;
    }
  }

  // NOTIFY IF FOOD UPDATED SUCCESSFULLY
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000)
    setSuccess(true);
  }

  const updateFood = (event) => {
    event.preventDefault();
    
    if(requiredValidaion()){
      setError("");
      console.log(`id: ${id}\n name: ${name}\n desc: ${desc}\n price: ${price}\n availabel: ${available}\n`);
      setTimeout(() => {
        setLaoding(false);
      }, 2000)
      setLaoding(true);
      notify();
    }

  };

  useEffect(() => {
    setId(selectedFood.id);
    setName(selectedFood.name);
    setType(selectedFood.type);
    setDesc(selectedFood.desc);
    setPrice(selectedFood.price);
    setAvailable(selectedFood.available);
  }, [selectedFood.id]);


  return (
    <div className="menuUpdate">
      {/* HEADING */}
      <div className="heading">
        <h3>Update</h3>
        <p>food description</p>
      </div>

      <form onSubmit={updateFood}>
        <h3>Basic Info</h3>
        <div className="input-container">
          <div className="input w-50">
            <label>Id</label>
            <input type="text" value={id} disabled />
          </div>
          <div className="input w-50">
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
          <div className="input w-70">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input w-30">
            <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
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

        <h3>Availablity</h3>
        <div className="input-container">
          <div className="input w-50">
            <label>Type</label>
            <div className="select">
              <select
                name="role"
                id="role"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              >
                <option value={true}>Available </option>
                <option value={false}>Not Available</option>
              </select>
            </div>
          </div>
        </div>
        <small>{error}</small>
        <div className="btn-box">
          {!loading ? (
            <>
              <button className="submit-btn" onClick={updateFood}>Update</button>
              <button className="cancel-btn" onClick={cancelUpdate}> Cancel </button>
            </>
          ) : (
            <button className="disabled-btn">Processing...</button>
          )}
        </div>
        <div className={success ? "success-message" : "success-message disabled"}>
        <div>{ check }</div> Successfully Updated!
      </div>
      </form>
    </div>
  );
}

export default MenuUpdate;
