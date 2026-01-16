import React, {} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const PerfectSuggestionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    selected_image,
    outfits,
    preferredItem,
    Recommended_color,
    fitted_outfit,
  } = route.params;


  return (
    <View>

      {/* SELECTED IMAGE */}
      <Text style={styles.sectionTitle}>Selected Item</Text>
      <View style={styles.bigBox}>
        <Image source={{ uri: selected_image }} style={styles.bigImage} />
      </View>

      {/* RECOMMENDATIONS */}
      <Text style={styles.sectionTitle}>
        Recommended {preferredItem}
      </Text>

      <View style={styles.suggestionBox}>
        {outfits && outfits.length > 0 ? (
          <FlatList
            data={outfits}
            keyExtractor={(item) => item.Outfit_id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.smallBox}>
                <Image
                  source={{ uri: item.Outfit_image_url }}
                  style={styles.smallImage}
                />
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>
            Recommended {preferredItem} color {Recommended_color} not in your wardrobe
          </Text>
        )}
      </View>


      

      {/* FIT BUTTON */}
      <TouchableOpacity
        style={styles.fitButton}
        onPress={() =>
          navigation.navigate("FittedOutfitScreen", {
            // selected_image,
            // outfits,
            // bodyType,
            // preferredItem,
            fitted_outfit
          })
        }
      >
        <Text style={styles.fitText}>Try On</Text>
      </TouchableOpacity>


    </View>
  );
};

export default PerfectSuggestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // paddingBottom: 30
  },
  

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b00000",
    padding: 14,
  },

  backText: {
    color: "#fff",
    fontSize: 22,
    marginRight: 12,
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 18,
    marginLeft: 16,
    color: "#333",
  },

  bigBox: {
    height: 200,
    margin: 15,
    borderRadius: 9,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  bigImage: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },

  suggestionBox: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#fdfdfdff",
    padding: 8,
  },

  smallBox: {
    width: "30%",
    margin: "1.6%",
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    padding: 4,
  },

  smallImage: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#706c6cff",
    paddingVertical: 60,
  },
  

  fitButton: {
    backgroundColor: "#050404ff",
    marginHorizontal: 16,
    marginTop: 50,
    marginLeft:120,
    paddingVertical: 15,
    width:120,  
    borderRadius: 50,
  },

  fitText: {
    color: "#ffffffff",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
});

