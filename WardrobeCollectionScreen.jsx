import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const WardrobeCollectionScreen = ({ route, navigation }) => {
  // const params = route?.params || {};
  const { wardrobe_id, wardrobe_name, user_id } = route.params;

  // const user_id = params.user_id || null;
  // const wardrobe_name = params.wardrobe_name || "";
  // const wardrobe = params.wardrobe || {};

  const categories = [
    "shirt",
    "pants",
    "shoes",
    "coat",
    "hoodie",
    "trouser",
  ];

  const categoryImages = {
    shirt: require("../assets/categories/shirt.png"),
    pants: require("../assets/categories/pants.png"),
    shoes: require("../assets/categories/shoes.png"),
    coat: require("../assets/categories/coat.png"),
    hoodie: require("../assets/categories/hoodie.png"),
    trouser: require("../assets/categories/trouser.png"),
  };

  const goToCategory = (cat) => {
    navigation.navigate("ShirtScreen", {
      user_id,
      wardrobe_name,
      category_name: cat.toLowerCase(),
      wardrobe_id,
    });
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.wardrobeText}>
        Wardrobe Name : {wardrobe_name}
      </Text>

      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.itemBlock}
            onPress={() => goToCategory(cat)}
          >
            <View style={styles.imageBox}>
              <Image
                source={categoryImages[cat]}
                style={styles.itemImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.itemLabel}>{cat}</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("UploadDress", {
              user_id,
              wardrobe_name,
              wardrobe_id,
            })
          }
        >
          <Text style={styles.btnText}>Add dress items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.btnText}>Try on</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WardrobeCollectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c0b6b6ff" },
  header: {
    backgroundColor: "#A51414",
    color: "white",
    fontSize: 22,
    textAlign: "center",
    padding: 12,
    marginBottom: 15,
  },
  wardrobeText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  itemBlock: { alignItems: "center", marginBottom: 25, width: "30%" },
  imageBox: { width: 90, height: 90, marginBottom: 8 },
  itemImage: { width: "100%", height: "100%" },
  itemLabel: {
    backgroundColor: "#454343ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 4,
    color: "#fff",
  },
  underline: {
    height: 2,
    backgroundColor: "#a92222ff",
    width: 40,
    marginTop: 4,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
  },
  actionBtn: {
    backgroundColor: "#141010ff",
    padding: 10,
    width: "40%",
    borderRadius: 10,
  },
  btnText: { textAlign: "center", fontSize: 16, color: "#fff" },
});


