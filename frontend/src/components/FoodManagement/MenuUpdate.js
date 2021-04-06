import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { check } from "../../assets/images/SVG";

function MenuUpdate({ selectedFood, cancelUpdate, clearUser, setChanged }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
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

  const updateFood = (event) => {
    event.preventDefault();

    if (requiredValidaion()) {
      setLoading(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
      const UPDATE_FOOD_LINK = `http://127.0.0.1:8000/food/update/${id}/`;

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
            .put(UPDATE_FOOD_LINK, Body, Config)
            .then((res) => {
              setLoading(false);
              notify();
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
              <button className="submit-btn" onClick={updateFood}>
                Update
              </button>
              <button className="cancel-btn" onClick={cancelUpdate}>
                {" "}
                Cancel{" "}
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

export default MenuUpdate;
