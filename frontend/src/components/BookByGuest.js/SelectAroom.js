import React, { useRef } from "react";
import Slider from "react-slick";
import Aroom from "./Aroom";
import leftArrow from "../../assets/images/View/svg/left-arrow.svg";
import rightArrow from "../../assets/images/View/svg/right-arrow.svg";

function SelectAroom({ rooms, setSelectedRoom, setState }) {
  const customSlider = useRef();

  const settings = {
    arrows: false,
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
    setSelectedRoom({ id, name, bed, price });
    setState(1);
  };

  const availableRooms = [
    {
      id: 1,
      name: "Delux Room",
      bed: "Single Bed",
      price: 4000,
      desc:
        "Comfortable room with a Single Size bed, luxury bed linens & towels, bathroom amenities and slippers...",
    },
    {
      id: 2,
      name: "Delux Room",
      bed: "Couple Bed",
      price: 5000,
      desc:
        "Comfortable room with Queen Size bed, luxury bed linens & towels, bathroom amenities and slippers...",
    },
    {
      id: 3,
      name: "Delux Room",
      bed: "Twin Bed",
      price: 6000,
      desc:
        "Comfortable room with two Single Size bed, luxury bed linens & towels, bathroom amenities and slippers...",
    },
    {
      id: 4,
      name: "Delux Room",
      bed: "Family Bed",
      price: 7000,
      desc:
        "Comfortable room with Three Single Size bed, luxury bed linens & towels, bathroom amenities and slippers...",
    },
    {
      id: 5,
      name: "Luxury Room",
      bed: "",
      price: 10000,
      desc:
        "Luxury Comfortable room with King Size bed,with Sofa, luxury bed linens & towels, special bathroom amenities and slippers...",
    },
    {
      id: 6,
      name: "Karni Kunjo",
      bed: "Honeymoon Suit",
      price: 25000,
      desc:
        "Luxury Comfortable room with Drawing, Dining trace   Kitchen, King Size bed,with Sofa, luxury bed linens & towels, special bathroom amenities and slippers...",
    },
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
        <Slider
          ref={(slider) => (customSlider.current = slider)}
          {...settings}
          className="roomslider"
        >
          {availableRooms.map((room) => (
            <Aroom key={room.id} room={room} selectRoomType={selectRoomType} />
          ))}
        </Slider>
      </div>
      <div className="roomSelection__rooms-mobile">
        {availableRooms.map((room) => (
          <div
            key={room.id}
            className="m-room"
            onClick={() => selectRoomType(room.id, room.name, room.bed, room.price)}
          >
            <h3>{room.name}</h3>
            <p>{room.bed}</p>
            <h2>{room.price}<span>৳</span></h2>
            <p className="per"> / Night </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectAroom;
