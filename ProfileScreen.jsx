import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

/* ===== LOCAL ASSETS ===== */
const AVATAR_IMG = require("../assets/avatar11.png");
const ICON_TRY_AI = require("../assets/AI-tryon.png");
const ICON_WARDROBE = require("../assets/wardrobe.png");
const ICON_TERMS = require("../assets/teamservices.png");
const ICON_PRIVACY = require("../assets/privacy.png");
const ICON_SIGNOUT = require("../assets/profile.png");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log("USER OBJECT:", user);

  const user = route.params?.user;
  console.log("PROFILE USER:", user);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* AVATAR */}
      <Image source={AVATAR_IMG} style={styles.avatar} />

      {/* USER INFO */}
      
      {/* <Text style={styles.userId}>User ID: {user?.U_id}</Text> */}
      <Text style={styles.name}> {user?.U_Name}</Text>

      {/* MENU */}
      <View style={styles.menu}>

        <View style={styles.row}>
          <Image source={ICON_TRY_AI} style={styles.icon} />
          <Text style={styles.rowText}>Try on with AI</Text>
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("ChooseWardrobe", { user })}
        >
          <Image source={ICON_WARDROBE} style={styles.icon} />
          <Text style={styles.rowText}>Choose Wardrobe</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Image source={ICON_TERMS} style={styles.icon} />
          <Text style={styles.rowText}>Terms of Service</Text>
        </View>

        <View style={styles.row}>
          <Image source={ICON_PRIVACY} style={styles.icon} />
          <Text style={styles.rowText}>Privacy Policy</Text>
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.replace("Login")}
        >
          <Image source={ICON_SIGNOUT} style={styles.icon} />
          <Text style={styles.rowText}>Sign Out</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cdccccff",
    alignItems: "center",
  },

  header: {
    width: "100%",
    padding: 16,
    backgroundColor: "#2b2b2b",
    alignItems: "center",
  },

  headerText: {
    color: "#f2f0f0ff",
    fontSize: 20,
    fontWeight: "600",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 20,
  },

  name: {
    fontSize: 30,
    fontWeight: "900",
    color: "#110f0fff",
    marginTop: 20,
  },

  userId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },

  menu: {
    width: "90%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 30,
  },

  rowText: {
    fontSize: 16,
    color: "#0e0808ff",
  },
});
