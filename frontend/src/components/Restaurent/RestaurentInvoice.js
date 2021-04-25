import React from "react";
import { Page, Document, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import logo from "../../assets/images/Logo/logo-black.png";

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
  logoImage: { width: "60px", marginRight: "10px" },
  name: { width: "45%" },
  quantity: { width: "15%" },
  price: { width: "15%" },
  total: { width: "25%" },
  totalHeading: { width: "75%", padding:"0 10px"},
  totalBill: { height: 40, color: "#000", padding: "5px 0" },
});

function RestaurentInvoice({ foodList, total }) {
  console.log(foodList);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* heading */}
        <View>
          <Image source={logo} style={styles.logoImage} />
        </View>
        
        {/* table - heading */}
        <View style={styles.container}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.total}>Total</Text>
        </View>
        {/* table - entry */}
        { foodList.map((data) => (
            <View style={styles.container} key={data.id}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.quantity}>{data.quantity}</Text>
              <Text style={styles.price}>{data.price}</Text>
              <Text style={styles.total}>{data.quantity * data.price}</Text>
            </View>
          ))}
          {/* total price */}
        <View style={styles.lastContainer}>
          <Text style={styles.totalHeading}>TOTAL</Text>
          <Text style={styles.totalBill}>{total}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default RestaurentInvoice;
