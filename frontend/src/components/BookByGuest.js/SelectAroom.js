import React, { useRef } from "react";
import Slider from "react-slick";
import Aroom from "./Aroom";
import leftArrow from '../../assets/images/View/svg/left-arrow.svg';
import rightArrow from '../../assets/images/View/svg/right-arrow.svg';

function SelectAroom({ rooms, setSelectedRoom, setState }) {
  const customSlider = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
  };

  // SELECT ROOM
  const selectRoomType = (id, name, bed, price) => {
    setSelectedRoom({id, name, bed, price});
    setState(1);
    console.log(id, name, bed, price)
  }

  const availableRooms = [
    { id: 1, name: "Delux Room", bed: "Single Bed", price: 4000 },
    { id: 2, name: "Delux Room", bed: "Couple Bed", price: 5000 },
    { id: 3, name: "Delux Room", bed: "Twin Bed", price: 6000 },
    { id: 4, name: "Delux Room", bed: "Family Bed", price: 7000 },
    { id: 5, name: "Luxury Room", bed: "", price: 10000 },
    { id: 6, name: "Karni Kunjo", bed: "Honeymoon Suit", price: 25000 },
  ];

  return (
    <div className="roomSelection">
      <div className="roomSelection__text">
        <div>
          <h2>Select</h2>
          <h1>Room Type</h1>
          <p>Please select your desired room type by clicking on a card.</p>
          <div className="btn-box">
            <button onClick={() => customSlider.current.slickPrev()}>
              <img src={leftArrow} alt="" />
            </button>
            <button onClick={() => customSlider.current.slickNext()}>
              <img src={rightArrow} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="roomSelection__rooms">
        <Slider ref={(slider) => (customSlider.current = slider)} {...settings}>
          {availableRooms.map((room) => (
            <Aroom key={room.id} room={room} selectRoomType={selectRoomType} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SelectAroom;
