import axios from "axios";
import React, { useEffect, useState } from "react";
import { check } from "../assets/images/SVG";
import { api } from "../assets/URLS";
import ContentBox from "../components/StaffSection/ContentBox";

function VatManagement() {
  const [foodVat, setFoodVat] = useState(0);
  const [roomVat, setRoomVat] = useState(0);
  const [loading, setLoading] = useState(false);
  const [operationProcessing, setOperationProcessing] = useState(false);
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

  const updateFoodVat = (event) => {
    event.preventDefault();

    if (foodVat >= 0 && /^\d+$/.test(foodVat.toString())) {
      setOperationProcessing(true);
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const FOOD_VAT = api.food_vat;

      axios
        .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
        .then((token) => {
          const Config = {headers: { Authorization: "Bearer " + token.data.access }};
          const Body = { "vat": foodVat / 100 };
          
          axios
            .post(FOOD_VAT, Body, Config)
            .then(() => {
              setOperationProcessing(false);
              notifyForSuccess();
            })
            .catch(() => {
              setOperationProcessing(false);
            });
        })
        .catch(() => {
          console.clear();
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
    const FOOD_VAT = api.food_vat;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(FOOD_VAT, Config)
          .then((res) => {
            setFoodVat(res.data.vat * 100);
            setLoading(false);
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
            <div className="input-container">
              <input
                type="text"
                value={roomVat}
                onChange={(e) => setRoomVat(e.target.value)}
              />
              <div>%</div>
            </div>
          </div>
          <div className="button">
            <button>Update</button>
          </div>
        </div>

        <div className="data">
          <div className="name">Vat For Food</div>
          {loading ? (
            "Loading..."
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
            {!operationProcessing ? (
              <button onClick={(e) => updateFoodVat(e)}>Update</button>
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
