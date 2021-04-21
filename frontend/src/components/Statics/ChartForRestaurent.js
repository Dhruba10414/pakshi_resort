import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function ChartForRestaurent({ datas }) {
  const incomeAmount = {
    labels: [ "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC", ],
    datasets: [{
        data: [7500, 6000, 11000, 9000, 5878, 7000, 9500, 10000, 2500],
        // data: income,
        fill: false,
        backgroundColor: "#C4F2E1",
        borderColor: "#C4F2E1",
        pointBackgroundColor: "#2BD9A8",
        pointRadius: "8",
    }],
  };

  const sellsAmount = {
    labels: [ "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC", ],
    datasets: [{
        data: [750, 400, 1900, 900, 200, 600, 300, 200, 600],
        // data: bookings,
        fill: false,
        backgroundColor: "#C4F2E1",
        borderColor: "#C4F2E1",
        pointBackgroundColor: "#2BD9A8",
        pointRadius: "8",
      }],
  };

  const optionsLine = {
    scales: { yAxes: [{ ticks: { beginAtZero: false } }] },
    legend: { display: false },
  };

  return (
    <div className="charts">
      <h3>INCOME FROM RESTAURENT</h3>
      <Line data={incomeAmount} options={optionsLine} />
      <h3>NUMBER OF SELLS</h3>
      <Line data={sellsAmount} options={optionsLine} />
    </div>
);}

export default ChartForRestaurent;
