import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../assets/URLS";
import ContentBox from "../components/StaffSection/ContentBox";
import ChartForBooking from "../components/Statics/ChartForBooking";
import ChartForRestaurent from "../components/Statics/ChartForRestaurent";
import ChartForTicket from "../components/Statics/ChartForTicket";
import Loading from "../components/Loading";
import FileDownload  from "js-file-download"

const months = [
  "JAN",
  "FEB",
  "MARCH",
  "APR",
  "MAY",
  "JUN",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function Statics() {
  const [loading, setLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const [roomsStastics, setRoomStastics] = useState([]);
  const [ticketStastics, setTicketStastics] = useState([]);
  const [foodStastics, setFoodStastics] = useState([]);
  const [state, setState] = useState(0);

  const [startMonth, setStartMonth] = useState(1);
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMont] = useState(1);
  const [endYear, setEndYear] = useState("");
  const [error, setError] = useState("");

  // VVALIDATION CHECK
  const validationCheck = () => {
    if(startYear && endYear){
      return true;
    } else{
      setError("Required all fields!");
      return false;
    }
  }
  
  // DOWNLOAD ROOM BOOKING LOG AS CSV
  const DownloadLogAsCsv = (type) => {    
    if(validationCheck()){
      setError("");
      setProcessLoading(true);

      // CHOOSE URL AND FILE NAME
      let url, filename;
      if(state === 0){
        if(type === 'guest'){
          url = api.resort_csv_guest_wise;
          filename = `resortLog-guestWise${months[startMonth - 1]}${startYear}-${months[endMonth - 1]}${endYear}.csv`;
        } else{
          url = api.resort_csv_booking_wise;
          filename = `resortLog-bookingWise${months[startMonth - 1]}${startYear}-${months[endMonth - 1]}${endYear}.csv`;
        }
      } else if(state === 1){
        if(type === 'guest'){
          url = api.food_csv_guest_wise;
          filename = `foodLog-guestWise${months[startMonth - 1]}${startYear}-${months[endMonth - 1]}${endYear}.csv`;
        } else{
          url = api.food_csv_order_wise;
          filename = `foodLog-orderWise${months[startMonth - 1]}${startYear}-${months[endMonth - 1]}${endYear}.csv`;
        }
        
      } else {
        url = api.ticket_csv;
        filename = `ticketLog-${months[startMonth - 1]}${startYear}-${months[endMonth - 1]}${endYear}.csv`;
      }

      // SETUP VARIABLES
      const REFRESH_TOKEN = localStorage.getItem("refresh_token");
      const GET_ACCESS_TOKEN_URL = api.refresh;
      const GET_CSV = `${url}?month_start=${startMonth}&year_start=${startYear}&month_end=${endMonth}&year_end=${endYear}`

      axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => { const Config = { headers: { Authorization: "Bearer " + token.data.access }};

        axios
        .get(GET_CSV, Config)
        .then((res) => {
          setProcessLoading(false);
          FileDownload(res.data, filename);
        })
        .catch(() => { console.clear(); setProcessLoading(false); });    
      })
      .catch(() => {setProcessLoading(false); console.clear(); })
    }
  };

  
  useEffect(() => {
    setLoading(true);
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const ROOM_STATESTICS = api.resort_stastics;
    const TICKET_STATESTICS = api.ticket_stastics;
    const FOOD_STATESTICS = api.food_stastics;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};

        // room - data
        axios
        .get(ROOM_STATESTICS, Config)
        .then((res) => { setRoomStastics(res.data);})
        .catch(() => { console.clear(); });

        // food - data
        axios.get(FOOD_STATESTICS, Config)
        .then((res) => {setFoodStastics(res.data);})
        .catch(() => {console.clear(); });

        // ticket - data
        axios
        .get(TICKET_STATESTICS, Config)
        .then((res) => { setTicketStastics(res.data); setLoading(false); })
        .catch(() => { console.clear(); setLoading(false); });
      })
      
      .catch((err) => {
        setLoading(false);
        console.clear();
      });
  }, []);

  return (
    <ContentBox heading="Stastics">
      <div className="statics">
        <div className="graph">
          {!loading ? (
            state === 0 ? (
              <ChartForBooking datas={roomsStastics} />
            ) : state === 1 ? (
              <ChartForRestaurent datas={foodStastics} />
            ) : (
              <ChartForTicket datas={ticketStastics} />
            )
          ) : (
            <Loading
              width="100%"
              height="calc(90vh - 10px)"
              text="fetching data"
              textSize="16px"
            />
          )}
        </div>
        <div className="info">
          <div className="button-container">
            <button className="rooms" onClick={() => {setState(0); setError("");}}>
              Room
            </button>
            <button className="foods" onClick={() => {setState(1); setError(""); }}>
              Food
            </button>
            <button className="tickets" onClick={() => {setState(2); setError(""); }}>
              Ticket
            </button>
          </div>

          <h3>DOWNLOAD CSV</h3>
          <p>
            To get the statistics of the resort within a certain period of time
            please set the time limit and clcik the download button
          </p>

          <form className="csv">
            <h3>From</h3>
            <div className="input-container">
              <div className="input w-50">
                <div className="select">
                  <select
                    name="role"
                    id="role"
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input w-50">
                <input
                  type="email"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  placeholder="Year"
                />
              </div>
            </div>

            <h3>To</h3>
            <div className="input-container">
              <div className="input w-50">
                <div className="select">
                  <select
                    name="role"
                    id="role"
                    value={endMonth}
                    onChange={(e) => setEndMont(e.target.value)}
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input w-50">
                <input
                  type="email"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  placeholder="Year"
                />
              </div>
            </div>
          </form>
          {
            state === 0
              ? !processLoading
                ? <div className="btnBox">
                  <button className="blue-btn" onClick={() => DownloadLogAsCsv("order")}> Download CSV - Booking Wise </button>
                  <button className="blue-btn" onClick={() => DownloadLogAsCsv("guest")}> Download CSV - Guest Wise </button>
                </div>
                : <div className="btnBox">
                    <button>Downoading...</button>
                    <button>Downoading...</button>
                  </div>
              : state === 1
                ? !processLoading
                  ? <div className="btnBox">
                    <button className="green-btn" onClick={() => DownloadLogAsCsv("booking")}> Download CSV - Order Wise</button>
                    <button className="green-btn" onClick={() => DownloadLogAsCsv("guest")}> Download CSV -  Guest Wise</button>
                  </div>
                  : <div className="btnBox">
                    <button>Downoading...</button>
                    <button>Downoading...</button>
                  </div>
                : !processLoading
                  ? <button className="yellow-btn" onClick={() => DownloadLogAsCsv("")}> Download CSV </button>
                  : <button>Downoading...</button>
          }
          <small>{error}</small>
        </div>
      </div>
    </ContentBox>
  );
}

export default Statics;
