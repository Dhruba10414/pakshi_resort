import React, { useEffect } from "react";
import { Page, Document, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    lineHeight: 1.5,
    flexDirection: "column",
    padding: "0 0.4in",
  },

  // heading
  h4: {
    fontSize: "8px",
    color: "#88B8B6",
    marginTop: "20px"
  },
  h3: {
    fontSize: "16px",
  },

  // information
  information: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  information__user: {
    width: "100%",
  },
  information__data: {
    width: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  info__name: {
    width: "30%",
    marginRight: "10px",
    fontSize: "7px",
  },
  info__value: {
    width: "70%",
    fontSize: "10px",
  },
});

function Report({ user, date, data }) {
  useEffect(() => {}, [data && data.total_amount]);

  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <Text style={styles.h4}>Day Report</Text>
        <Text style={styles.h3}>{user.user_name}</Text>

        {/* Information User */}
        <View style={styles.information__user}>
          <View style={styles.info}>
            <View style={styles.info__name}>
              <Text>Email: </Text>
            </View>
            <View style={styles.info__value}>
              <Text>{user.email}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.info__name}>
              <Text>Phone: </Text>
            </View>
            <View style={styles.info__value}>
              <Text>{user.contact}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.info__name}>
              <Text>Gender: </Text>
            </View>
            <View style={styles.info__value}>
              <Text>{user.gender === "M" ? "Male" : "Female"}</Text>
            </View>
          </View>

          {/* Information for collection */}
          <Text style={styles.h4}>Collection</Text>
          <View style={styles.information__data}>
            <View style={styles.info}>
              <View style={styles.info__name}>
                <Text>Date: </Text>
              </View>
              <View style={styles.info__value}>
                <Text>{date}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.info__name}>
                <Text>Total Payment: </Text>
              </View>
              <View style={styles.info__value}>
                <Text>{data && data.payments_received ? data.payments_received : 0}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.info__name}>
                <Text>Total Coolection: </Text>
              </View>
              <View style={styles.info__value}>
                <Text>{data && data.total_amount ? data.total_amount : 0} Tk</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default Report;
