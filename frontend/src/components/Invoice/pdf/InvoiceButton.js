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
        padding: "15px 50px",
        color: "#fff",
        backgroundColor: "#F2A922",
        borderRadius: "5px",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      Save Invoice
    </PDFDownloadLink>
  );
}

export default InvoiceButton;
