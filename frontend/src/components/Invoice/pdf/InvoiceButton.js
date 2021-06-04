import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";

function InvoiceButton({ roomBills, orderedFoods, invoiceFor, stayingInfo, fbill, rbill, discountChange }) {
  return (
    <PDFDownloadLink
      document={
        <Invoice
          roomBills={roomBills}
          orderedFoods={orderedFoods}
          invoiceFor={invoiceFor}
          stayingInfo={stayingInfo}
          fbill={fbill}
          rbill={rbill}
          discountChange={discountChange}
        />
      }
      fileName={`invoice-${invoiceFor.id}.pdf`}
      style={{
        textDecoration: "none",
        padding: "12px 50px",
        color: "#fff",
        backgroundColor: "#2BD9A8",
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
