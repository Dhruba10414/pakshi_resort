import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { check } from "../../assets/images/SVG";

function AddFood({ cancelUpdate, clearUser, setChanged }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Breakfast");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  // REQUIRED FIELD CHECK
  const requiredValidaion = () => {
    if (name && price) {
      return true;
    } else {
      setError("Required all fields.");
      return false;
    }
  };

  // NOTIFY IF FOOD UPDATED SUCCESSFULLY
  const notify = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    setSuccess(true);
  };

  // CLEAR FIELDS
  const clearAllFields = () => {
    setName("");
    setDesc("");
    setType("Breakfast");
    setPrice("");
  };

  // ADD FOOD TO MENU
  const addFoodToMenu = (event) => {
    event.preventDefault();
    if (requiredValidaion()) {
      setLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = `http://api.pakshiresort.com/api/token/refresh/`;
      const ADD_FOOD_LINK = `http://api.pakshiresort.com/food/create/`;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {
            headers: { Authorization: "Bearer " + token.data.access },
          };
          let Body = {};
          if (desc.length > 0) {
            Body = {
              name: name,
              description: desc,
              price: price,
              available: true,
              food_type: type,
            };
          } else {
            Body = {
              name: name,
              price: price,
              available: true,
              food_type: type,
            };
          }

          axios
            .post(ADD_FOOD_LINK, Body, Config)
            .then((res) => {
              setLoading(false);
              notify();
              clearAllFields();
              setChanged(true);
            })
            .catch((err) => {
              console.log(err.message);
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
          localStorage.removeItem("user");
          localStorage.removeItem("refresh_token");
          clearUser();
          history.push("/staff/login");
        });
    }
  };

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
                <option value="Breakfast">Breakfast </option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Chinese Platter">Chinese Platter</option>
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
              <button className="submit-btn" onClick={addFoodToMenu}>
                Add
              </button>
              <button className="cancel-btn" onClick={cancelUpdate}>
                Cancel
              </button>
            </>
          ) : (
            <button className="disabled-btn">Processing...</button>
          )}
        </div>

        <div
          className={success ? "success-message" : "success-message disabled"}
        >
          <div>{check}</div> Successfully Updated!
        </div>
      </form>
    </div>
  );
}

export default AddFood;
