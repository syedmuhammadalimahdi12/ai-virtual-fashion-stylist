import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import CONFIG from "../ipconfig";

/* ===== STATIC MAPS ===== */
const CATEGORIES = [
  { id: 1, name: "Shirt" },
  { id: 2, name: "Pants" },
  // { id: 3, name: "Shalwar Kameez" },
  // { id: 4, name: "Huddies" },
  // { id: 5, name: "Trouser" },
  // { id: 6, name: "Coat" },
  // { id: 7, name: "Waist Coat" },
];

const COLORS = [
  { id: 1, name: "Black" },
  { id: 2, name: "White" },
  { id: 3, name: "Blue" },
  { id: 4, name: "Gray" },
  { id: 5, name: "Brown" },
  { id: 6, name: "Red" },
  { id: 7, name: "Pink" },
  { id: 8, name: "Orange" },
  { id: 9, name: "Yellow" },
  { id: 10, name: "Purple" },
];

const UploadDressScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { wardrobe_id, wardrobe_name, user } = route.params;

  const [categoryId, setCategoryId] = useState(null);
  const [colorId, setColorId] = useState(null);
  const [image, setImage] = useState(null);


  /* ===== IMAGE PICKER ===== */
  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", "Image selection failed");
        return;
      }
      setImage(response.assets[0]);
    });
  };

  /* ===== SAVE OUTFIT ===== */
  const saveOutfit = async () => {
    if (!image || !categoryId || !colorId) {
      Alert.alert("Error", "Please select category, color and image");
      return;
    }

    const formData = new FormData();
    formData.append("Outfit_image", {
      uri: image.uri,
      type: image.type,
      name: image.fileName || "outfit.jpg",
    });
    formData.append("Wardrobe_id", wardrobe_id);
    formData.append("Category_id", categoryId);
    formData.append("color_id", colorId);

    try {
      await axios.post(
        `${CONFIG.LAN}/outfit/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Alert.alert("Success", "Outfit successfully saved in wardrobe");

      // ✅ CLEAR PREVIEW + SELECTIONS
      setImage(null);
      setCategoryId(null);
      setColorId(null);

    } catch (error) {
      Alert.alert("Error", "Failed to upload outfit");
    }
  };

  /* ===== NAVIGATE TO WARDROBE COLLECTION ===== */
  const goToWardrobeCollection = () => {
    setImage(null);

    navigation.navigate("WardrobeCollectionScreen", {
      wardrobe_id,
      wardrobe_name,
      // wardrobe_id,
      user,
      // outfirt_image: image.uri,

    });
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Upload Outfit</Text>
      <Text style={styles.subTitle}>Wardrobe: {wardrobe_name}</Text>

      {/* CATEGORY */}
      <Text style={styles.label}>Select Category</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catBtn,
              categoryId === cat.id && styles.activeBtn,
            ]}
            onPress={() => setCategoryId(cat.id)}
          >
            <Text style={styles.catText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* COLOR */}
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={colorId}
          onValueChange={(value) => setColorId(value)}
        >
          <Picker.Item label="Select Color" value={null} />
          {COLORS.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>

      {/* IMAGE */}
      <Text style={styles.label}>Upload Image</Text>
      <TouchableOpacity style={styles.galleryBtn} onPress={pickImage}>
        <Text style={styles.galleryText}>Choose from Gallery</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image.uri }} style={styles.preview} />}

      {/* SAVE */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveOutfit}>
        <Text style={styles.saveText}>Save Outfit</Text>
      </TouchableOpacity>

      {/* GO TO WARDROBE COLLECTION */}
      <TouchableOpacity style={styles.saveBtn} onPress={goToWardrobeCollection}>
        <Text style={styles.saveText}>Wardrobe Collection</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default UploadDressScreen;

/* ===== STYLES (UNCHANGED) ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6d3d3ff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000ff",
    textAlign: "center",
    marginBottom: 20,
  },
  subTitle: {
    textAlign: "center",
    color: "#000000ff",
    marginBottom: 20,
    fontWeight: "700",
  },
  label: {
    fontWeight: "700",
    color: "#121212ff",
    marginTop: 18,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  catBtn: {
    backgroundColor: "#434242ff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 6,
  },
  activeBtn: {
    backgroundColor: "#f3a6a6",
  },
  catText: {
    fontWeight: "500",
    color: "#ffffffff",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#222121ff",
    borderRadius: 8,
    marginTop: 8,
  },
  galleryBtn: {
    backgroundColor: "#b00000",
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
  },
  galleryText: {
    color: "#fff",
    fontWeight: "700",
  },
  preview: {
    width: "100%",
    height: 220,
    marginTop: 15,
    borderRadius: 10,
  },
  saveBtn: {
    backgroundColor: "#3b3a3aff",
    padding: 16,
    borderRadius: 20,
    marginTop: 25,
    alignItems: "center",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

