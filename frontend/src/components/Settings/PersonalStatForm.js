import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../assets/URLS";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Report from "./pdf/Report";

function PersonalStatForm({ user, setStateShow }) {
  const [data, setData] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateChangeForm, setDateChangeForm] = useState(false);
  const [error, setError] = useState("");

  // GET TODAYS DATE
  const getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    setDate(today);
    return today;
  };

  // FORM VALIDATION
  const formValidation = () => {
    const dateInfo = date.split("-");
    const dd = parseInt(dateInfo[0]);
    const mm = parseInt(dateInfo[1]);
    const yyyy = parseInt(dateInfo[2]);

    if (dateInfo.length !== 3) {
      setError("Date should be formatted like that dd-mm-yyyy");
      return false;
    } else if (dd < 1 || dd > 31) {
      setError("Day should be between 1 and 31");
      return false;
    } else if (mm < 1 || mm > 12) {
      setError("Month should be between 1 and 31");
      return false;
    } else if (yyyy < 2019 || yyyy > 3019) {
      setError("Year should be between 2019 and 3019");
      return false;
    }
    return true;
  };

  // COLLECT COLLECTION INFORMATION WHEN FORM IS SUBMITTED
  const calculateCollection = (event) => {
    event.preventDefault();
    if (formValidation()) {
      setError("");
      viewCollection(date);
      setTimeout(() => { setDateChangeForm(false); }, 2000)
    }
  };

  // VIEW COLLECTION
  const viewCollection = (inputDate) => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const GET_TODAY_DATA = `${api.staff_report}?id=${user.id}&date=${inputDate}`;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(GET_TODAY_DATA, Config)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch(() => {
            // console.clear();
            setLoading(false);
          });
      })
      .catch(() => {
        // console.clear();
        setLoading(false);
      });
  };

  // DOWNLOAD PDF
  const downloadPdf = async () => {
    const doc = (
      <Report
        user={user}
        date={date}
        data={data}
      />
    );
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, `staff-${user.id}.pdf`);
  }

  // FETCH INITIAL DATA
  useEffect(() => {
    console.log(user);
    const today = getTodaysDate();
    viewCollection(today);
  }, []);

  return (
    <div className="settings__right">
      <div className="heading">
        <h2>Staff</h2>
        <p>daily report</p>
      </div>

      <div className="staffStat">
        <h4>TOTAL COLLECTIONS</h4>
        <p>
          Total collection is basically the amount of total payment a user has
          received today. To print your daily report please click the Get Report
          button below. Please change the date, if you want view and preserve
          your previous daily report.
        </p>
        <h1>
          {data && data.total_amount ? data.total_amount : 0}
          <span>৳</span>
        </h1>

        {/* Button Box */}
        <div className="buttonBoxx">
          <button onClick={() => setDateChangeForm(!dateChangeForm)}>
            Change Date
          </button>
          <button onClick={downloadPdf}>Get Report</button>
        </div>

        {/* Date Changing form */}
        {dateChangeForm ? (
          <form>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {!loading ? (
              <button onClick={calculateCollection}>
                View Total Collection
              </button>
            ) : (
              <button>Loading...</button>
            )}
            <small style={{ color: "red", marginTop: "10px" }}>{error}</small>
          </form>
        ) : null}

        {/* Change password form open button */}
        <div className="statOptions" onClick={() => setStateShow(false)}>
          <div></div>
          <div>Change Password</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalStatForm;
