import React from "react";

function CustomerDescription({ name, address, phone }) {
  return (
    <div className="description">
      <h3>Invoice for</h3>
      <h2>{name}</h2>
      <p>{address}</p>
      <p><span>Phone:</span> {phone} </p>
    </div>
  );
}

export default CustomerDescription;
