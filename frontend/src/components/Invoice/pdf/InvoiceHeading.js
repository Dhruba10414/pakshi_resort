import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../../assets/images/Logo/logo-white.png";

const styles = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#455D58",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "20px",
    paddingRight: "30px",
  },
  content: {
    width: "50%",
  },
  logoImage: {
    width: "100px",
  },
  branding: {
    color: "#fff",
    fontSize: "14px",
    textAlign: "right",
    textTransform: "uppercase",
  },
  text: {
    fontSize: "11px",
    textAlign: "right",
    fontWeight: "normal",
    color: "#fff",
  },
});

function InvoiceHeading() {
  return (
    <View style={styles.heading}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logoImage} />
      </View>
      <View style={styles.content}>
        <Text style={styles.branding}>Pakshi Resort LTD</Text>
        <Text style={styles.text}>Khankasharif road, Pakshey</Text>
        <Text style={styles.text}>Ishwardi, Z6006 Pabna,</Text>
        <Text style={styles.text}>+880 1730706252-4</Text>
      </View>
    </View>
  );
}

export default InvoiceHeading;
