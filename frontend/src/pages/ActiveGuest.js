import React, { useEffect, useState } from "react";
import ContentBox from "../components/StaffSection/ContentBox";
import { rsvg, searchSvg } from "../assets/images/SVG";
import Guest from "../components/Guests/Guest";
import axios from "axios";
import { api } from "../assets/URLS";
import Invoice from "../components/Guests/Invoice";
import FoodOrder from "../components/Guests/FoodOrder";
import Loading from "../components/Loading";
import search from "../assets/images/View/svg/search-3.svg";
import Ticket from "../components/Guests/Ticket";

function ActiveGuest() {
  const [guest, setGuest] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeGuests, setActiveGuests] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [orderFor, setOrderFor] = useState({});
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceFor, setInvoiceFor] = useState({});
  const [openTicket, setOpenTicket] = useState(false);
  const [ticketFor, setTicketFor] = useState({});

  const [matchedData, setMatchedData] = useState([]);

  // SEARCH FUNCTIONALITY
  const searching = (event) => {
    event.preventDefault();
    let text = event.target.value.toLowerCase();

    let matches = activeGuests.filter((data) => {
      const regex = new RegExp(`^${text}.*$`);
      return data.name.toLowerCase().match(regex) || data.contact.match(regex);
    });

    if (text === "") {
      setMatchedData([]);
    } else {
      console.log(matches);
      setMatchedData(matches);
    }
  };

  // OPEN FOOD ORDER MODAL
  const openFoodOrderModal = (id, name) => {
    setOpenOrder(true);
    setOrderFor({ id: id, name: name });
  };
  const openInvoiceModal = (id, name, phone, address) => {
    setOpenInvoice(true);
    setInvoiceFor({ id: id, name: name, phone: phone, address: address });
  };
  const openTicketModal = (id, name, phone, address, email) => {
    setOpenTicket(true);
    setTicketFor({ id, name, phone, address, email });
  };
  // CLOSE MODAL
  const closeModal = () => {
    setOpenOrder(false);
    setOpenInvoice(false);
  };

  useEffect(() => {
    setLoading(true);
    const refresh_token = localStorage.getItem("refresh_token");
    axios
      .post(api.refresh, { refresh: refresh_token })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        axios
          .get(api.guest_detail, Config)
          .then((res) => {
            setActiveGuests(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.clear();
            setLoading(false);
          });
      })
      .catch(() => {
        console.clear();
        setLoading(false);
      });
  }, []);

  return (
    <ContentBox heading="Active Guests">
      <div className="activeGuest">
        <div className="activeGuest-container">
          {openInvoice ? (
            <Invoice invoiceFor={invoiceFor} setOpenInvoice={setOpenInvoice} />
          ) : openTicket ? (
            <Ticket ticketFor={ticketFor} setOpenTicket={setOpenTicket} />
          ) : openOrder ? (
            <FoodOrder
              guestId={orderFor.id}
              name={orderFor.name}
              closeModal={closeModal}
              fromRestaurent={false}
            />
          ) : (
            <div className="guest-table-container">
              <div className="guest-table">
                {/* search field */}
                <div className="search-field">
                  <form onSubmit={searching}>
                    <div className="icon">{searchSvg}</div>
                    <input
                      type="text"
                      placeholder="Search by #name or #contact number"
                      onChange={(e) => searching(e)}
                    />
                  </form>
                </div>

                {/* table heading */}
                <div className="table-heading">
                  <div className="guest-name">Guest Name{rsvg}</div>
                  <div className="phone">Email{rsvg}</div>
                  <div className="phone">Phone{rsvg}</div>
                  <div className="rooms">Rooms{rsvg}</div>
                  <div className="options">Actions{rsvg}</div>
                </div>
                {matchedData.length > 0 ? (
                  <div className="results">
                    {matchedData.map((guest) => (
                      <Guest
                        key={guest.id}
                        id={guest.id}
                        name={guest.name}
                        phone={guest.contact}
                        address={guest.address}
                        email={guest.email}
                        booked_rooms={guest.booked_rooms}
                        openInvoiceModal={openInvoiceModal}
                        openFoodOrderModal={openFoodOrderModal}
                        openTicketModal={openTicketModal}
                      />
                    ))}
                  </div>
                ) : null}

                {/* table content */}
                {!loading ? (
                  activeGuests.length > 0 ? (
                    activeGuests.map((guest) => (
                      <Guest
                        key={guest.id}
                        id={guest.id}
                        name={guest.name}
                        phone={guest.contact}
                        address={guest.address}
                        email={guest.email}
                        booked_rooms={guest.booked_rooms}
                        openInvoiceModal={openInvoiceModal}
                        openFoodOrderModal={openFoodOrderModal}
                        openTicketModal={openTicketModal}
                      />
                    ))
                  ) : (
                    <div className="empty">
                      <img src={search} alt="" />
                      <h2>Not available</h2>
                    </div>
                  )
                ) : (
                  <Loading
                    height="80vh"
                    width="100%"
                    textSize="16px"
                    space="4px"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentBox>
  );
}

export default ActiveGuest;
