import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "30px"
  },
  h3: {
      color: "#455D58",
      fontSize: "12px",
      fontWeight: "bold",
  },
  h2: {
      fontSize: "18px",
      color: "#444",
  },
  p: {
      color: "#444"
  }
});

function InvoiceFor({invoiceFor}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.h3}>INVOICE FOR</Text>
        <Text style={styles.h2}>{invoiceFor.name}</Text>
        <Text style={styles.p}>{invoiceFor.address}</Text>
        <Text style={styles.tepxt}>+880{invoiceFor.phone}</Text>
      </View>
    </View>
  );
}

export default InvoiceFor;
