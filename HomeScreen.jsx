import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LOGO = require("../assets/login_pic.png"); // LOCAL IMAGE

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoWrapper}>
        <Image source={LOGO} style={styles.logo} />
      </View>

      {/* TEXT */}
      <Text style={styles.title}>
        LET’S CREATE{"\n"}
        YOUR <Text style={styles.highlight}>STYLE</Text> WITH{"\n"}
        AI
      </Text>

      <Text style={styles.subtitle}>
        Never Wonder What To Wear Again With Our{"\n"}
        Outfit Suggestion Feature
      </Text>

      {/* BUTTONS */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>

    </View>
  );
};

export default WelcomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7b46eff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logoWrapper: {
    width: 120,
    height: 120,
    backgroundColor: "#f5f2f2ff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    lineHeight: 34,
  },

  highlight: {
    color: "#d14a1f",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
    marginTop: 10,
    marginBottom: 40,
  },

  loginBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  loginText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  signupBtn: {
    width: "100%",
    backgroundColor: "#9b4a2f",
    paddingVertical: 14,
    alignItems: "center",
  },

  signupText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
});
