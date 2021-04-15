import React from "react";

function Guest({id, name, phone, openInvoiceModal, openFoodOrderModal}) {
  return (
    <div className="aguest">
      <div className="guest-name">{name}</div>
      <div className="phone">{phone}</div>
      <div className="options">
          <button className="order-food" onClick={() => openFoodOrderModal(id, name)}>Order Foods</button>
          <button className="buy-tickets">Buy tickets</button>
          <button className="bill" onClick={openInvoiceModal}>View Bill</button>
      </div>
    </div>
  );
}

export default Guest;
