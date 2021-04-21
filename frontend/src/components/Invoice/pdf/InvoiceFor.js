import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  h3: {
    color: "#455D58",
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 15,
    lineHeight: 1.2,
    color: "#444",
  },
  p: {
    color: "#444",
    fontSize: 10,
    lineHeight: 1.2,
  },
});

function InvoiceFor({ invoiceFor, stayingInfo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h3}>INVOICE FOR</Text>
      
      <View style={styles.content}>
        <View>
          <Text style={styles.h2}>{invoiceFor.name}</Text>
          <Text style={styles.p}>{invoiceFor.address}</Text>
          <Text style={styles.p}>+88{invoiceFor.phone}</Text>
        </View>
        <View>
        <Text style={styles.p}>check-in: {" "} {stayingInfo.check_in}</Text>
          <Text style={styles.p}>check-out: {" "} {stayingInfo.check_in}</Text>
          <Text style={styles.p}>number of rooms:{" "} {stayingInfo.number_of_rooms}</Text>
        </View>
      </View>

    </View>
  );
}

export default InvoiceFor;
