import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../assets/URLS";
// Components & Svgs
import ContentBox from "../components/StaffSection/ContentBox";
import RequestTable from "../components/BookingRequests/RequestTable";
import ViewRequest from "../components/BookingRequests/View/ViewRequest";

function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [viewFor, setViewFor] = useState({});

  // VIEW A REQUEST
  const viewRequest = (requestedData) => {
    setOpenModal(true);
    setViewFor(requestedData);
  };

  // FETCHIG DATA
  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const REQUESTED_BOOKING_TABLE_URL = api.requested_booking_table;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(REQUESTED_BOOKING_TABLE_URL, Config)
          .then((res) => {
            setRequests(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [openModal]);

  return (
    <ContentBox heading="Booking Requests">
      {!openModal ? (
        <RequestTable
          loading={loading}
          requests={requests}
          viewRequest={viewRequest}
        />
      ) : (
        <ViewRequest viewFor={viewFor} setOpenModal={setOpenModal} />
      )}
    </ContentBox>
  );
}

export default BookingRequests;
