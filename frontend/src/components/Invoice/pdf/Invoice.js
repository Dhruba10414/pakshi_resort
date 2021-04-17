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
  },
});

function Invoice({roomBills, orderedFoods, invoiceFor}) {
  useEffect(() => {}, [roomBills]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeading />
        <InvoiceFor invoiceFor={invoiceFor} />
        <InvoiceForRoom roomBills={roomBills} />
        <InvoiceForFoods orderedFoods={orderedFoods} />
      </Page>
    </Document>
  );
}

export default Invoice;
