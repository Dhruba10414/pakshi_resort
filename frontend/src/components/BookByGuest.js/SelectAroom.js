import React from "react";
import Slider from "react-slick";
import Aroom from "./Aroom";

function SelectAroom({rooms}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
  };
  
  const availableRooms = [
      {name: "Delux Room", bed: "Single Bed", price: 4000},
      {name: "Delux Room", bed: "Couple Bed", price: 5000},
      {name: "Delux Room", bed: "Twin Bed", price: 6000},
      {name: "Delux Room", bed: "Family Bed", price: 7000},
      {name: "Luxury Room", bed: "", price: 10000},
      {name: "Karni Kunjo", bed: "Honeymoon Suit", price: 25000},
    ];

  return (
    <div className="roomSelection">
      <div className="roomSelection__text">
        <div>
          <h2>Select</h2>
          <h1>Room Type</h1>
          <p>Please select your desired room type by clicking on a card.</p>
          <div className="btn-box">
          <button>  {"<--"} </button>
              <button> {"-->"} </button>
          </div>
        </div>
      </div>
      <div className="roomSelection__rooms">
        <Slider {...settings}>
            {
                availableRooms.map(room => (<Aroom key={room.id} room={room} />))
            }
        </Slider>
      </div>
    </div>
  );
}

export default SelectAroom;
