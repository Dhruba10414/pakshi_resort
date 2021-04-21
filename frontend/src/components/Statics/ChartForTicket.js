import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function ChartForTicket({datas}) {
    const [income, setIncome] = useState([]);
    const [sells, setSells] = useState([]);

    useEffect(() => {
        let tk = [];
        let amount = [];
    
        datas.map((data) => {
          tk = [...tk, data.total_income];
          amount = [...amount, data.total_bookings];
        });
        setIncome(tk);
        setSells(amount);
      }, []);



    const incomeAmount = {
        labels: [ "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"],
            // data: income,
        datasets: [
          {
            label: "INCOME FROM TICKET",
            data: [750, 600, 850, 400, 650, 500, 950, 700, 850],
            fill: false,
            backgroundColor: "#eee0c7",
            borderColor: "#eee0c7",
            pointBackgroundColor: "#F2A922",
            pointRadius: "8",
          },
        ]
      };
    
      const sellsAmount = {
        labels: [ "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"],
        datasets: [
          {
            data: [15, 13, 16, 8, 13, 10, 18, 14, 17],
            fill: false,
            backgroundColor: "#eee0c7",
            borderColor: "#eee0c7",
            pointBackgroundColor: "#F2A922",
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
      <h3>INCOME FROM TICKET</h3>
      <Line data={incomeAmount} options={optionsLine} />
      <h3>NUMBER OF SELLS</h3>
      <Line data={sellsAmount} options={optionsLine} />
    </div>
    )
}

export default ChartForTicket
