import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../assets/URLS";
import StayingInfo from "../Invoice/StayingInfo";
import StayingRooms from "../Invoice/StayingRooms";
import BillAmounts from "../Invoice/BillAmounts";
import CustomerDescription from "../Invoice/CustomerDescription";
import OrderedFoodList from "../Invoice/OrderedFoodList";
import Loading from "../../components/Loading";

function Invoice({ invoiceFor }) {
  const [roomBills, setRoomBills] = useState([]);
  const [orderedFoods, setOrderedFoods] = useState([]);
  const [stayingInfo, setStayinhInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const refresh_token = localStorage.getItem("refresh_token");
    axios.post(api.refresh, { refresh: refresh_token }).then((token) => {
      const Config = {
        headers: { Authorization: "Bearer " + token.data.access },
      };
      // fetch room infos
      axios
        .get(`${api.guest_invoice}?guest=${invoiceFor.id}`, Config)
        .then((res) => {
          setRoomBills(res.data);
          setStayinhInfo({
            check_in: res.data[0].check_in,
            check_out: res.data[0].check_out,
            booked_on: res.data[0].booked_on,
            booked_by: res.data[0].by_staff,
            number_of_rooms: res.data.length,
            stayed: res.data[0].stayed,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      // fetch food infos
      axios
        .get(`${api.food_invoice}?guest_id=${invoiceFor.id}`, Config)
        .then((res) => {
          setOrderedFoods(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    });
  }, []);

  return (
    <div className="invoices">
      {/* ========== PAYMENT DETAILS ========== */}
      {!loading ? (
        <div className="invoice">
          <div className="bill-amounts">
            <BillAmounts roomBills={roomBills} foodBills={orderedFoods} />
            <CustomerDescription
              name={invoiceFor.name}
              address={invoiceFor.address}
              phone={invoiceFor.phone}
            />
          </div>
          <div className="table-block">
            <OrderedFoodList
              orderedFoods={orderedFoods}
              roomBills={roomBills}
              invoiceFor={invoiceFor}
            />
          </div>
        </div>
      ) : (
        <Loading height="80vh" width="100%" textSize="16px" space="4px" />
      )}

      {/* ========== PAYMENT FUNC ========== */}
      <div className="payment">
        {!loading ? (
          <div className="rooms-info">
            <h2>Staying Info</h2>
            <StayingInfo
              bookBy={stayingInfo.booked_by}
              bookedOn={stayingInfo.booked_on}
              checkIn={stayingInfo.check_in}
              checkOut={stayingInfo.check_out}
              NumberOfRooms={stayingInfo.number_of_rooms}
              stayed={stayingInfo.stayed}
            />
            <h2>Staying rooms</h2>
            <StayingRooms roomBills={roomBills} />
            <button className="payforRooms">Pay for rooms</button>
          </div>
        ) : (
          <Loading height="80vh" width="100%" textSize="16px" space="4px" />
        )}
      </div>
    </div>
  );
}

export default Invoice;
