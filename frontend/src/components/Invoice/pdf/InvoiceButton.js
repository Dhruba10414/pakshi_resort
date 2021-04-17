import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";

function InvoiceButton({ roomBills, orderedFoods, invoiceFor }) {
  return (
    <PDFDownloadLink
      document={
        <Invoice
          roomBills={roomBills}
          orderedFoods={orderedFoods}
          invoiceFor={invoiceFor}
        />
      }
      fileName={`invoice.pdf`}
      style={{
        textDecoration: "none",
        padding: "10px",
        color: "#4a4a4a",
        backgroundColor: "#f2f2f2",
        border: "1px solid #4a4a4a",
      }}
    >
      Download
    </PDFDownloadLink>
  );
}

export default InvoiceButton;
