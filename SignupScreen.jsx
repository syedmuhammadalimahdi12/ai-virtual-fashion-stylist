import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import CONFIG from "../ipconfig";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      await axios.post(`${CONFIG.LAN}/user/Signup`, {
        U_Name: name,
        U_email: email,
        U_Pass: password,
      });

      Alert.alert("Success", "Account created successfully");
      navigation.replace("Login");
      
    } catch (error) {
      Alert.alert("Signup Failed", "Unable to create account");
    }
  };

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Create Account</Text>

      {/* SUBTITLE */}
      <View style={styles.subRow}>
        <Text style={styles.subText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}> sign in</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor="#3b3a3aff"
        value={name}
        onChangeText={setName}
        />

       <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#272727ff"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
       />

       <TextInput
       style={styles.input}
       placeholder="Password"
       placeholderTextColor="#292828ff"
       secureTextEntry
       value={password}
      onChangeText={setPassword}
      />


        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SignupScreen;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    paddingTop: 70,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },

  subRow: {
    flexDirection: "row",
    marginBottom: 40,
  },

  subText: {
    fontSize: 13,
    color: "#2b2a2aff",
  },

  linkText: {
    fontSize: 13,
    color: "#2f5eff",
    fontWeight: "600",
  },

  form: {
    width: "85%",
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#525252ff",
    borderRadius: 4,
    paddingHorizontal: 25,
    color: "#222121ff",
    placeholder: "#515050ff",
    marginBottom: 20,
    fontSize: 14,
  },

  button: {
    height: 49,
    backgroundColor: "#20303dff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#fbfbfbff",
    fontSize: 16,
    fontWeight: "600",
  },
});

