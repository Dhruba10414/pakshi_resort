import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  table: {
    marginBottom: "40px",
  },
  h3: {
    color: "#455D58",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 30,
    flexGrow: 1,
  },
  lastContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
  },
  name: { width: "45%" },
  quantity: { width: "15%" },
  price: { width: "15%" },
  total: { width: "25%" },
  totalHeading: { width: "75%" },
  totalBill: { height: 30, color: "#000", padding: "5px 0" },
});

function InvoiceForFoods({ orderedFoods, fbill }) {
  return (
    <View style={styles.table}>
      <View>
        <Text style={styles.h3}>FOOD Bills</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.quantity}>Quantity</Text>
        <Text style={styles.price}>Price</Text>
        <Text style={styles.total}>Total</Text>
      </View>
      {orderedFoods &&
        orderedFoods.map((data) => (
          <View style={styles.container} key={data.id}>
            <Text style={styles.name}>{data.food.name}</Text>
            <Text style={styles.quantity}>{data.quantity}</Text>
            <Text style={styles.price}>{data.food.price}</Text>
            <Text style={styles.total}>{data.total}</Text>
          </View>
        ))}
      {/* bill */}
      <View style={styles.container}>
        <Text style={styles.totalHeading}>Total</Text>
        <Text style={styles.totalBill}>{parseInt(fbill.total_bills)}</Text>
      </View>

      {/* vat */}
      <View style={styles.container}>
        <Text style={styles.totalHeading}>Vat ({(parseFloat(fbill.total_vat) / parseFloat(fbill.total_bills)) * 100} %)</Text>
        <Text style={styles.totalBill}>{Math.ceil(parseFloat(fbill.total_vat))}</Text>
      </View>

      {/* discount */}
      {fbill.discount > 0 ? (
        <View style={styles.container}>
          <Text style={styles.totalHeading}>Discount</Text>
          <Text style={styles.totalBill}>
            {parseInt(fbill.discount)}
          </Text>
        </View>
      ) : null}

      {/* subtotal */}
      <View style={styles.lastContainer}>
        <Text style={styles.totalHeading}>Sub Total</Text>
        <Text style={styles.totalBill}>
          {parseInt(fbill.total_paid)}
        </Text>
      </View>
    </View>
  );
}

export default InvoiceForFoods;
