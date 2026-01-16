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
import { useRoute, useNavigation } from "@react-navigation/native";
import CONFIG from "../ipconfig";

const CreateWardrobeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { u_id, refresh } = route.params;
  const { user } = route.params;
  const {wardrobe} = route.params;

  const [wardrobeName, setWardrobeName] = useState("");

  const handleSave = async () => {
    if (!wardrobeName.trim()) {
      Alert.alert("Validation", "Please enter wardrobe name");
      return;
    }

    try {
      await axios.post(`${CONFIG.LAN}/wardrobe/add`, {
        wardrobe_name: wardrobeName,
        u_id: u_id,
      });

      // refresh wardrobe list in previous screen
      if (refresh) refresh();

      Alert.alert("Success", "Wardrobe created successfully");
      navigation.goBack({
        wardrobe_name: wardrobe.wardrobeName,
        wardrobe_id: wardrobe.wardrobe_id,
        user,
        wardrobe,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to create wardrobe");
    }
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.userId}>User ID: {u_id}</Text>
      </View>
      
      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.label}>Enter Wardrobe Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#201c1cff"
          value={wardrobeName}
          onChangeText={setWardrobeName}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CreateWardrobeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    backgroundColor: "#232323ff",
    padding: 14,
    alignItems: "center",
  },
  
  userId:
  {
     fontSize:20,
     color:"#ffffffff",
  },

  headerText: {
    color: "#ffffffff",
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#585656ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#2a2828ff",
    marginBottom: 30,
  },

  saveBtn: {
    backgroundColor: "#3b3030ff",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 60,
    
  },

  saveText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
