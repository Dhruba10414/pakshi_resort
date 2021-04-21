import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../../assets/images/Logo/logo-black.png";
import invoice from "../../../assets/images/View/invoice.png";

const styles = StyleSheet.create({
  heading: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15px"
  },
  image: { width: "100px" }
});

const textStayles = StyleSheet.create({
  textBox: { display: "flex", flexDirection: "row", },
  logoImageBox: { width: "60px", marginRight: "10px" },
  logoImage: {width: "60px"},
  h2: {fontWeight: "bold", fontSize: "16px", color: "#3F5651" },
  p: { fontSize: 10, lineHeight: 1.2, color: "#444" }
});

function InvoiceHeading() {
  return (
    <View style={styles.heading}>
      {/* resort name */}
      <View style={textStayles.textBox}>
        <View style={textStayles.logoImageBox}>
          <Image source={logo} style={textStayles.logoImage} />
        </View>
        <View>
          <Text style={textStayles.h2}>PAKSHI RESORT LTD</Text>
          <Text style={textStayles.p}>Khankasharif road, Pakshey</Text>
          <Text style={textStayles.p}>Ishwardi, Z6006 Pabna,</Text>
          <Text style={textStayles.p}>+880 1730706252-4</Text>
        </View>
      </View>

      {/* invoice logo */}
      <View>
        <Image source={invoice} style={styles.image} />
      </View>
    </View>
  );
}

export default InvoiceHeading;

// imageBox: {
//   width: "50%",
//   border: "1px solid green",
// },
// image:{
//   width: "100px",
// },
// textBox: {
//   display: "flex",
//   flexDirection: "row",
//   border: "1px solid blue",
// },
// logoImage: {
//   width: "50px",
//   marginRight: "10px"
// },
// branding: {
//   color: "#444",
//   fontSize: "14px",
//   textAlign: "right",
//   textTransform: "uppercase",
// },
// text: {
//   fontSize: "11px",
//   textAlign: "right",
//   fontWeight: "normal",
//   color: "#444",
// },
