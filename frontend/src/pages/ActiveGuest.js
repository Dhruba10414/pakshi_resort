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

  // SEARCH GUEST
  const searchGuest = () => {
    //
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
  const openTicketModal = (id) => {
    setOpenTicket(true);
    setTicketFor({id: id});
  }
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
            console.log(err.messae);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.messae);
        setLoading(false);
      });
  }, []);

  return (
    <ContentBox heading="Active Guests">
      <div className="activeGuest">
        <div className="activeGuest-container">
          {openInvoice ? (
            <Invoice invoiceFor={invoiceFor} setOpenInvoice={setOpenInvoice} />
          ) : openTicket
            ? <Ticket ticketFor={ticketFor} setOpenTicket={setOpenTicket} />
            : openOrder ? (
            <FoodOrder
              guestId={orderFor.id}
              name={orderFor.name}
              closeModal={closeModal}
            />
          ) : (
            <div className="guest-table-container">
              <div className="guest-table">
                {/* search field */}
                <div className="search-field">
                  <form onSubmit={searchGuest}>
                    <div className="icon">{searchSvg}</div>
                    <input
                      type="text"
                      placeholder="Search by #guests phone number"
                      value={guest}
                      onChange={(e) => setGuest(e.target.value)}
                    />
                  </form>
                </div>

                {/* table heading */}
                <div className="table-heading">
                  <div className="guest-name">Guest Name{rsvg}</div>
                  <div className="phone">Phone{rsvg}</div>
                  <div className="options"></div>
                </div>

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
