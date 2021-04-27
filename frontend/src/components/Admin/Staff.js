import React, { useState } from "react";
import axios from "axios";
import { user, phone, mail, x, smile, sad } from "../../assets/images/SVG";
import { connect } from "react-redux";
//urls
import { api } from "../../assets/URLS";

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
  currentUser,
  notify
}) {
  const [loadingForDisable, setLoadingForDisable] = useState(false);
  const [loadingForDelete, setLoadingForDelete] = useState(false);
  const [disablesuccess, setDisablesuccess] = useState(false);
  const [deletesuccess, setDeletesuccess] = useState(false);

  // DISABLE A USER
  const disableUser = () => {
    if (JSON.parse(currentUser).id !== id) {
      // get users access token
      setLoadingForDisable(true);
      const refresh_token = localStorage.getItem("refresh_token");
      axios
        .post(api.refresh, { refresh: refresh_token })
        .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }};
          const Body = { id: id };
          // remove user
          axios
          .put(api.disable_user, Body, Config)
          .then(() => { setLoadingForDisable(false); setDisablesuccess(true);})
          .catch(() => { console.clear(); setLoadingForDisable(false)})
        })
        .catch(() => { console.clear(); setLoadingForDisable(false);
        });
    } else {
      notify();
    }
  };

  // DELETE A USER
  const deleteUser = () => {
    if (JSON.parse(currentUser).id !== id) {
      // get users access token
      setLoadingForDelete(true);
      const refresh_token = localStorage.getItem("refresh_token");
      axios
        .post(api.refresh, { refresh: refresh_token })
        .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }}
          // remove user
          axios
          .delete(`${api.delete_user}/${id}/`, Config)
          .then(() => { setLoadingForDelete(false); setDeletesuccess(true);})
          .catch(() => { console.clear(); setLoadingForDelete(false)})
        })
        .catch(() => { console.clear(); setLoadingForDelete(false);
        });
    } else {
      notify();
    }
  }

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
          <div className="btn-box">
            {status ?
             !loadingForDisable
                ? disablesuccess
                  ? <button className="disabled">Blocked</button>
                  : <button onClick={disableUser}>Block User</button>
                : <button className="processing">Processing</button>
              : null
            }
            {
              !loadingForDelete
              ? deletesuccess
                ? <button className="deleted">Deleted</button>
                : <button className="delete" onClick={deleteUser}>Delete User</button>
              : <button className="processing">Processing</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(Staff);
