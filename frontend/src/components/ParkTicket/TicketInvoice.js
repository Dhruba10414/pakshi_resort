import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";
import InvoiceHeading from "../Invoice/pdf/InvoiceHeading";

const styles = StyleSheet.create({
  page: {
    fontSize: 9,
    lineHeight: 1.5,
    flexDirection: "column",
    padding: "1in 0.6in",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
  },
  lastContainer: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
    backgroundColor: "#f7f7f7",
  },
  h3: {
    color: "#455D58",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 16
  },
  logoImage: { width: "60px", marginRight: "10px" },
  name: { width: "45%" },
  quantity: { width: "15%" },
  price: { width: "15%" },
  total: { width: "25%" },
  totalHeading: { width: "75%", padding: "0 10px" },
  totalBill: {color: "#000",},
});

function TicketInvoice({ amount }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* heading */}
        <InvoiceHeading />
        <View>
          <Text style={styles.h3}>Ticket Bills</Text>
        </View>
        {/* table - heading */}
        <View style={styles.container}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.total}>Total</Text>
        </View>
        {/* table - entry */}
        <View style={styles.container}>
          <Text style={styles.name}>Park Entry Fee</Text>
          <Text style={styles.quantity}>{amount}</Text>
          <Text style={styles.price}>50</Text>
          <Text style={styles.total}>{parseInt(amount) * 50}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default TicketInvoice;
