import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  table: {
    padding: "0 30px",
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
    height: 40,
    flexGrow: 1,
  },
  name: { width: "50%" },
  quantity: { width: "10%" },
  price: { width: "20%" },
  total: { width: "25%" },
});

function InvoiceForFoods({ orderedFoods }) {
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
          <View style={styles.container}>
            <Text style={styles.name}>{data.food.name}</Text>
            <Text style={styles.quantity}>{data.quantity}</Text>
            <Text style={styles.price}>{data.food.price}</Text>
            <Text style={styles.total}>{data.total}</Text>
          </View>
        ))}
    </View>
  );
}

export default InvoiceForFoods;
