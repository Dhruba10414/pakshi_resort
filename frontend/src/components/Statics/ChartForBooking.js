import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function ChartForBooking({ datas }) {
  const [income, setIncome] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    let tk = [];
    let amount = [];

    datas.map((data) => {
      tk = [...tk, data.total_income];
      amount = [...amount, data.total_bookings];
    });
    setIncome(tk);
    setBookings(amount);
  }, []);

  const cost = {
    labels: [ "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"],
        // data: income,
    datasets: [
      {
        data: [7500, 6000, 11000, 9000, 7878, 9000, 9500, 10000, 2500, 6000, 4500],
        // data: income,
        fill: false,
        backgroundColor: "#bfdceb",
        borderColor: "#bfdceb",
        pointBackgroundColor: "#00A5F6",
        pointRadius: "8",
      },
    ]
  };

  const numberOfBooking = {
    labels: [ "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [
      {
        data: [12, 7, 25, 2, 14, 11, 15, 5, 12, 10, 8],
        // data: bookings,
        fill: false,
        backgroundColor: "#bfdceb",
        borderColor: "#bfdceb",
        pointBackgroundColor: "#00A5F6",
        pointRadius: "8",
      },
    ],
  };
  const optionsLine = {
    scales: { yAxes: [{ticks: { beginAtZero: false }}] },
    legend: {display: false},
  };

  return (
    <div className="charts">
      <h3>INCOME FROM ROOM BOOKINGS</h3>
      <Line data={cost} options={optionsLine} />
      <h3>NUMBER OF BOOKINGS</h3>
      <Line data={numberOfBooking} options={optionsLine} />
    </div>
  );
}

export default ChartForBooking;
