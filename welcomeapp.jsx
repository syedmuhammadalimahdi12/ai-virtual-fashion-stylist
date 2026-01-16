import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#fff", "#FFA500"]}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/shirt.png")} // 👈 your image path
          style={styles.logo}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          LET’S CREATE {"\n"}
          <Text style={styles.bold}>YOUR </Text>
          <Text style={styles.styleText}>STYLE</Text> WITH AI
        </Text>

        <Text style={styles.subtitle}>
          Never Wonder What To Wear Again With Our Outfit Suggestion Feature
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.createText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  bold: {
    fontWeight: "700",
  },
  styleText: {
    color: "#E63946",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 40,
    width: "80%",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#654f26ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 15,
  },
  loginText: {
    color: "#000",
    fontWeight: "600",
  },
  createButton: {
    width: "100%",
    backgroundColor: "#8B4513",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default WelcomeScreen;
