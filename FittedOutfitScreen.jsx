import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const FittedOutfitScreen = ({ route }) => {
  const { shirtColor, pantColor, bodyType, confidence, fitted_outfit } = route.params;

//   console.log("fitted URL:", fitted_outfit);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Try On</Text>

      <Image
        source={{ uri: fitted_outfit }}
        style={styles.image}
      />

      <View style={styles.infoBox}>
        <Text>Shirt Color: {shirtColor}</Text>
        <Text>Pant Color: {pantColor}</Text>
        <Text>Body Type: {bodyType}</Text>
        <Text>Confidence: {confidence}</Text>
      </View>
    </View>
  );
};

export default FittedOutfitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: "#f2f2f2"
  },
  infoBox: {
    marginTop: 16
  }
});
