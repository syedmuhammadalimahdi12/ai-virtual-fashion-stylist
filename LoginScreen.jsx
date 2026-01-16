import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import CONFIG from "../ipconfig";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Login_Pic = "../assets/download.jpeg";

 const handleLogin = async () => {
  try {
    const response = await axios.post(`${CONFIG.LAN}/user/login`, {
      U_email: email,
      U_Pass: password,
    });

    console.log("LOGIN RESPONSE USER:", response.data.user);

    navigation.navigate("Profile", {
      user: response.data.user,
    });

  } catch (error) {
    Alert.alert("Login Failed", "Invalid email or password");
  }
};


  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>S</Text>
      </View>


     <View style={styles.row}>
          <Image source={{ uri: Login_Pic }} style={styles.icon} />
      </View>  

      {/* TITLE */}
      <Text style={styles.title}>Enjoy your style</Text>
      <Text style={styles.title}>& others!</Text>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          // placeholder="Enter your email"
          placeholderTextColor="#1c1818ff"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          // placeholder="Value"
          placeholderTextColor="#201c1cff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}> Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 60,
  },

  logoContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#2b2b2b",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  logoText: {
    color: "#4CAF50",
    fontSize: 42,
    fontWeight: "700",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    lineHeight: 32,
  },

  card: {
    width: "85%",
    backgroundColor: "#f7f7f7ff",
    borderRadius: 12,
    padding: 18,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#312b2bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#000000",
    marginBottom: 16,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#2b2b2b",
    height: 46,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#f8f3f3ff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    marginTop: 24,
  },

  footerText: {
    fontSize: 14,
    color: "#444",
  },

  signupText: {
    fontSize: 14,
    color: "#2f5eff",
    fontWeight: "600",
  },
});
