import React, { useEffect } from "react";
import { Page, Document, StyleSheet, View } from "@react-pdf/renderer";
import InvoiceHeading from "./InvoiceHeading";
import InvoiceFor from "./InvoiceFor";
import InvoiceForRoom from "./InvoiceForRoom";
import InvoiceForFoods from "./InvoiceForFoods";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    lineHeight: 1.5,
    flexDirection: "column",
    padding: "1in 0.6in"
  },
});

function Invoice({roomBills, orderedFoods, invoiceFor, stayingInfo, fbill, rbill, discountChange}) {
  useEffect(() => {}, [roomBills]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeading />
        <InvoiceFor invoiceFor={invoiceFor} stayingInfo={stayingInfo} />
        <InvoiceForRoom roomBills={roomBills} rbill={rbill} discountChange={discountChange} />
        {
          orderedFoods.length > 0
          ? <InvoiceForFoods orderedFoods={orderedFoods} fbill={fbill} discountChange={discountChange} />
          : null
        }
      </Page>
    </Document>
  );
}

export default Invoice;
