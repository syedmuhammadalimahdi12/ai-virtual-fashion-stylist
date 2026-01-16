import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";

const WhatNeedsMatchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [body_type, setBodyType] = useState("average");
  const { selected_image, wardrobe_id, user, color_name } = route.params;

  console.log("BODY TYPE RECEIVED:", body_type);
   
  useEffect(() => {
  console.log("COLOR RECEIVED IN WhatNeedsMatchScreen:", color_name);
  console.log("WARDROBE ID RECEIVED:", wardrobe_id);
},);

  const [image, setImage] = useState(selected_image);
  const [preferredItem, setPreferredItem] = useState("Pants");
  const [loading, setLoading] = useState(false);

  console.log("Preferried ITEM :", preferredItem);

  /* -------- PICK FROM GALLERY -------- */
  const openGallery = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0].uri);
      }
    });
  };
     
  

     
  /* -------- CALL RECOMMEND API -------- */
  const handleDone = async () => {
    console.log("DONE BUTTON PRESSED");
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "upload.jpg",
    });

    formData.append("preferredItem", preferredItem); // ✔ same key
    formData.append("wardrobe_id", wardrobe_id);     // ✔ same key
    formData.append("selected_color_name",color_name);
    formData.append("body_type", body_type);


    const res = await axios.post(
      "http://localhost:5000/recommendation/recommend",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API RESPONSE:", res.data);
    navigation.navigate("PerfectSuggestionScreen", {
      selected_image: image,
      outfits: res.data.outfits,
      Recommended_color:res.data.recommended_color,
      fitted_outfit:res.data.fitted_outfit_image,
      preferredItem,
      wardrobe_id,
      user,
    });
  console.log("recommendation response ",res.data);
  } catch (err) {
    console.log("API ERROR:", err.response?.data || err.message);
    Alert.alert("Error", "Recommendation failed");
  } finally {
    setLoading(false);
  }
};  

return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>What Needs a Match?</Text>
      </View>

      <TouchableOpacity style={styles.galleryBtn} onPress={openGallery}>
        <Text>Gallery</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Selected item:</Text>
      <View style={styles.imageBox}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <Text style={styles.sectionTitle}>Select Preferred Item:</Text>

      {["pants", "shirt"].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.optionRow}
          onPress={() => setPreferredItem(item)}
          
        >
          <View style={styles.outerCircle}>
            {preferredItem === item && <View style={styles.innerDot} />}
          </View>
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}


    <Text style={styles.sectionTitle}>Select Body Type:</Text>
      {["slim", "average", "fat"].map((type) => (
      <TouchableOpacity
         key={type}
         style={styles.optionRow}
         onPress={() => setBodyType(type)}>
        <View style={styles.outerCircle}>
          {body_type === type && <View style={styles.innerDot} />}
        </View>
        <Text style={styles.optionText}>{type.toUpperCase()}</Text>
      </TouchableOpacity>
       ))}





      <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
        <Text style={styles.doneText}>
          {loading ? "Loading..." : "Done"}
        </Text>
      </TouchableOpacity>



    </View>
  );
};

export default WhatNeedsMatchScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    backgroundColor: "#b00000",
    padding: 14,
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  sectionTitle: {
     marginTop: 20,
     fontWeight: "800",
     fontSize: 16,
     color: "#aa2020ff",
     textDecorationLine: "underline",
  },

  imageBox: {
    height: 220,
    borderWidth: 3,
    borderColor: "#000",
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9ff",
  },


  outerCircle: {
  width: 22,
  height: 22,
  borderRadius: 11,
  borderWidth: 2,
  borderColor: "#000000ff",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
},

innerDot: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "#000", // black dot
},

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  check: {
    fontSize: 20,
    marginRight: 10,

  },

  optionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#555",
  },

  doneBtn: {
    backgroundColor: "#b00000",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
    width: 120,
  },

  doneText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
