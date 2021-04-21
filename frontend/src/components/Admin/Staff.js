import React, { useState } from "react";
import axios from "axios";
import { user, phone, mail, x, smile, sad, users } from "../../assets/images/SVG";
//urls
import {api} from "../../assets/URLS";

function Staff({
  id,
  name,
  status,
  is_staff,
  email,
  contact,
  gender,
  active,
  setActive,
}) {
  const [loading, setLoading] = useState(false);
  
  const disableUser = () => {
    setLoading(true);
    
    // get users access token
    const refresh_token = localStorage.getItem("refresh_token");
    axios.post(api.refresh, {refresh: refresh_token,})
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        const Body = {"id": id+1};
        
        // remove user
        axios.put(api.disable_user, Body, Config)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        })
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      })
  };

  return (
    <div className="accordion">
      <div
        className={
          active === id ? "accordion__heading active" : "accordion__heading"
        }
        onClick={() => {
          active === id ? setActive("") : setActive(id);
        }}
      >
        <div className="name">{name}</div>
        <div className={is_staff ? "role a" : "role s"}>
          <p>{is_staff ? "admin" : "staff"}</p>
        </div>
        <div className={status ? "status active" : "status disable"}>
          {status ? smile : sad}
          {status ? "active" : "disable"}
        </div>
        <div className={active === id ? "button rotate" : "button"}>{x}</div>
      </div>

      <div className="accordion__content">
        <div className={active === id ? " container show" : "container"}>
          <div className="info">
            <div className="label">{mail} Email</div>
            <div className="value">{email}</div>
          </div>
          <div className="info">
            <div className="label">{phone} Phone</div>
            <div className="value">{contact}</div>
          </div>
          <div className="info">
            <div className="label">{user} Gender</div>
            <div className="value">{gender === "M" ? "Male" : "Female"}</div>
          </div>
          {
            status 
            ?
              !loading
                ? <button onClick={disableUser}>Disable</button>
                : <button>Processing</button>
            : null
          }
        </div>
      </div>
    </div>
  );
}

export default Staff;
