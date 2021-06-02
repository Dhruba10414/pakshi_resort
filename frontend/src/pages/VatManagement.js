import axios from "axios";
import React, { useEffect, useState } from "react";
import { check } from "../assets/images/SVG";
import { api } from "../assets/URLS";
import ContentBox from "../components/StaffSection/ContentBox";

function VatManagement() {
  const [foodVat, setFoodVat] = useState(0);
  const [roomVat, setRoomVat] = useState(0);
  const [loading, setLoading] = useState(false);
  const [foodvatUpdating, setFoodvatUpdating] = useState(false);
  const [roomvatUpdating, setRoomvatUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");

  const notifyForSuccess = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
    setSuccess(true);
  };

  const notifyForFailed = () => {
    setTimeout(() => {
      setFailed(false);
    }, 4000);
    setFailed(true);
  };

  // UPDATE FOOD VAT
  const updateFoodVat = () => {
    if (foodVat >= 0 && /[+-]?([0-9]*[.])?[0-9]+/.test(foodVat.toString())) {
      setFoodvatUpdating(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const FOOD_VAT = api.food_vat;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }};
          const Body = {"vat": foodVat / 100};

          axios
            .post(FOOD_VAT, Body, Config)
            .then(() => {
              setFoodvatUpdating(false);
              notifyForSuccess();
            })
            .catch(() => {
              setFoodvatUpdating(false);
            });
        })
        .catch(() => {
          setFoodvatUpdating(false);
          console.clear();
        });
    } else {
      setError("Invalid Input Format.");
      notifyForFailed();
    }
  };

  // UPDATE ROOM VAT
  const updateRoomVat = () => {
    if (roomVat >= 0 && /[+-]?([0-9]*[.])?[0-9]+/.test(roomVat.toString())) {
      setRoomvatUpdating(true);

      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const ROOM_VAT = api.room_vat;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }};
          const Body = {"vat": roomVat / 100};

          axios
            .post(ROOM_VAT, Body, Config)
            .then(() => {
              setRoomvatUpdating(false);
              notifyForSuccess();
            })
            .catch(() => {
              setRoomvatUpdating(false);
            });
        })
        .catch(() => {
          console.clear();
          setFoodvatUpdating(false);
        });
    } else {
      setError("Invalid Input Format.");
      notifyForFailed();
    }
  };

  //   GET DATA
  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};

        axios
          .get(api.food_vat, Config)
          .then((res) => {
            let vat = (res.data.vat * 100).toFixed(1);
            setFoodVat(vat);

            axios
              .get(api.room_type_with_price)
              .then((res) => {
                let vat = (res.data[0].vat * 100).toFixed(1);
                setRoomVat(vat);
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
                console.clear();
              });
          })
          .catch(() => {
            console.clear();
            setLoading(false);
          });
      })
      .catch(() => {
        console.clear();
        setLoading(false);
      });
  }, []);

  return (
    <ContentBox heading="Vat Management">
      <div className="vatmanagement">
        <div className="banner"></div>

        <div className="data">
          <div className="name">Vat For Room</div>
          <div className="existing">
            {loading ? (
              <div className="input-container">Loading...</div>
            ) : (
              <div className="input-container">
                <input
                  type="text"
                  value={roomVat}
                  onChange={(e) => setRoomVat(e.target.value)}
                />
                <div>%</div>
              </div>
            )}
          </div>
          <div className="button">
          {!roomvatUpdating ? (
              <button onClick={updateRoomVat}>Update</button>
            ) : (
              <button>Processing...</button>
            )}
          </div>
        </div>

        <div className="data">
          <div className="name">Vat For Food</div>
          {loading ? (
            <div className="input-container">Loading...</div>
          ) : (
            <div className="existing">
              <div className="input-container">
                <input
                  type="text"
                  value={foodVat}
                  onChange={(e) => setFoodVat(e.target.value)}
                />
                <div>%</div>
              </div>
            </div>
          )}
          <div className="button">
            {!foodvatUpdating ? (
              <button onClick={updateFoodVat}>Update</button>
            ) : (
              <button>Processing...</button>
            )}
          </div>
        </div>

        <div
          className={success ? "success-message" : "success-message disabled"}
        >
          <div>{check}</div> Successfully Updated!
        </div>
        <div
          className={
            failed ? "success-message error" : "success-message error disabled"
          }
        >
          <div>{check}</div> {error}
        </div>
      </div>
    </ContentBox>
  );
}

export default VatManagement;
