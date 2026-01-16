import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import CONFIG from "../ipconfig";


const ChooseWardrobeScreen = () => 
  {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;
  const {wardrobe} = route.params;
  const [wardrobes, setWardrobes] = useState([]);
  
  // const isNewUser = wardrobes.length === 1;

  const fetchWardrobes = useCallback(async () => {
  try {
    const res = await axios.get(
      `${CONFIG.LAN}/wardrobe/get/${user.U_id}`
    );

    setWardrobes(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    console.log("Wardrobe fetch error:", error.message);
    setWardrobes([]);
  }
 }, [user.U_id]);


 useEffect(() => {
  fetchWardrobes();
}, [fetchWardrobes]);


  const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.itemRow}
    onPress={() => {
    //   if (isNewUser) {
    //     navigation.navigate("UploadDress", {
    //        wardrobe_id: item.wardrobe_id,
    //        wardrobe_name: item.wardrobe_name, // ✅ FIXED
    //        user,
    //  });
    //   } else {
        navigation.navigate("WardrobeCollectionScreen", {
          wardrobe_id: item.wardrobe_id,
          wardrobe_name: item.wardrobe_name,
          user,
          wardrobe,
        });
      // }
    }}
  >
    <Text style={styles.itemText}>• {item.wardrobe_name}</Text>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>

      {/* HEADER */}
      

      <Text style={styles.userId}>User ID: {user?.U_id}</Text>
      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Your Wardrobes</Text>

        {wardrobes.length === 0 ? (
          <Text style={styles.emptyText}>
            Please create a wardrobe
          </Text>
        ) : (
          <FlatList
            data={wardrobes}
            keyExtractor={(item) => item.wardrobe_id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>

      {/* CREATE BUTTON */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() =>
          navigation.navigate("CreateWardrobe", {
            u_id: user.U_id,
            u_name: user.U_Name,
            refresh: fetchWardrobes,
          })
        }
      >
        <Text style={styles.createText}>Create Wardrobe</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ChooseWardrobeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e6e6ff",
  },

  itemRow: {
  paddingVertical: 6,
   },


  content: {
    flex: 1,
    padding: 29,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    color:"#0d0000ff"
  },

  userId:{
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginTop:20,
    color:"#0d0000ff",
    marginLeft:120,
  },

  itemText: {
    fontSize: 16,
    marginVertical: 8,
    color: "#000",
  },

  emptyText: {
    fontSize: 15,
    color: "#ffffffff",
    marginTop: 20,
  },

  createBtn: {
    backgroundColor: "#1e1d1dff",
    padding: 50,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 150

  },

  createText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffffff",
    paddingVertical: 10,
  },
});

