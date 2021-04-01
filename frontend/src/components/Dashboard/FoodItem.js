import React, { useState } from "react";
import { lock, unlock } from "../../assets/images/SVG";
import axios from 'axios';

function FoodItem({ id, type, name, desc, available, price, addFoodAsOrder }) {
  const [status, setStatus] = useState(available);

  const changeStatus = () => {
    setTimeout(() => {
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
      const UPDATE_STATUS = `http://127.0.0.1:8000/food/update/${id}/`;

      axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }};
          const Body = {"id": id, "name": name, "description": `${desc}a`, "price": price, "available": !status, "food_type": type}
          
          axios.put(UPDATE_STATUS, Body, Config)
          .then(() => {setStatus(!status);})
          .catch((err) => { console.log(err.message);});
      })
    }, 2000);
  };

  return (
    <div className={status ? "foodItem" : "foodItem disabled"} onClick={() => addFoodAsOrder(id, name, 1)}>
      <div className="name">{name}</div>
      <div className="desc">{desc.length === 0 ? "........" : desc}</div>
      <div className="price">{price}</div>
      <div
        className={status ? "status unlock" : "status lock"}
        onClick={changeStatus}
      >
        {status ? unlock : lock}
      </div>
    </div>
  );
}

export default FoodItem;
