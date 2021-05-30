import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
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
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  lastContainer: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
    backgroundColor: "#f7f7f7",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  h3: {
    color: "#455D58",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 16,
  },
  h2: {
    fontSize: 13,
    lineHeight: 1.2,
    color: "#444",
  },
  p: {
    color: "#444",
    fontSize: 10,
    lineHeight: 1.2,
  },
  logoImage: { width: "60px", marginRight: "10px" },
  name: { width: "45%" },
  quantity: { width: "15%" },
  price: { width: "15%" },
  total: { width: "25%" },
  totalHeading: { width: "75%", padding: "0 10px" },
  totalBill: { color: "#000" },
});

function RestaurentInvoice({ foodList, bill, total, name, contact }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* heading */}
        <InvoiceHeading />
        {/* Guest */}
        <View>
          <Text style={styles.h3}>Guest</Text>
        </View>
        <View style={styles.content}>
        <View>
          <Text style={styles.h2}>{name}</Text>
          <Text style={styles.p}>{contact}</Text>
        </View>
        </View>

        {/* food list */}
        <View>
          <Text style={styles.h3}>Food Bills</Text>
        </View>
        {/* table - heading */}
        <View style={styles.container}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.total}>Total</Text>
        </View>
        {/* table - entry */}
        {foodList.map((data) => (
          <View style={styles.container} key={data.id}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.quantity}>{data.quantity}</Text>
            <Text style={styles.price}>{data.price}</Text>
            <Text style={styles.total}>{data.quantity * data.price}</Text>
          </View>
        ))}
        {/* total price */}
        <View style={styles.container}>
          <Text style={styles.totalHeading}>TOTAL</Text>
          <Text style={styles.totalBill}>{total}</Text>
        </View>
        {/* vat price */}
        <View style={styles.container}>
          <Text style={styles.totalHeading}>VAT [ {bill.vat * 100}% ]</Text>
          <Text style={styles.totalBill}>{bill.bill * bill.vat}</Text>
        </View>
        {/* discount price */}
        {bill.discount > 0 ? (
          <View style={styles.container}>
            <Text style={styles.totalHeading}>DISCOUNT</Text>
            <Text style={styles.totalBill}>{bill.discount}</Text>
          </View>
        ) : null}
        {/* sub total price */}
        <View style={styles.lastContainer}>
          <Text style={styles.totalHeading}>SUB TOTAL</Text>
          <Text style={styles.totalBill}>{bill.bill + bill.bill * bill.vat - bill.discount}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default RestaurentInvoice;
