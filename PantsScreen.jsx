// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import CONFIG from "../../ipconfig";

// const wardrobeIcon = require("../../assets/wardrobe.png");
// const profileIcon  = require("../../assets/profile.png");


// const PantsScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const { wardrobe_id, wardrobe_name, category_name, user } = route.params;

//   const [outfits, setOutfits] = useState([]);
//   const [selectedOutfit, setSelectedOutfit] = useState(null);

//   /* ---------------- FETCH CATEGORY OUTFITS ---------------- */
//   useEffect(() => {
//     const fetchCategoryOutfits = async () => {
//       try {
//         console.log(category_name);
//         const res = await axios.get(`${CONFIG.LAN}/outfit/api/outfits/category/${category_name}`);
//          setOutfits(res.data);
//       } catch (err) {
//         console.log("Error fetching outfits");
//       }
//     };

//     fetchCategoryOutfits();
//   }, [category_name]);

//   /* ---------------- TRY ON ---------------- */
//   const handleTryOn = () => {
//     if (!selectedOutfit) return;

//     navigation.navigate("WhatNeedsMatch", {
//   selected_image: selectedOutfit.Outfit_image_url,
//   wardrobe_id,
//   user,
//     });
//   };

//   return (
//     <View style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backText}>←</Text>
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>
//             {category_name.toUpperCase()}
//           </Text>
//           <Text style={styles.headerSub}>
//             {wardrobe_name}
//           </Text>
//         </View>
//       </View>

//       {/* OUTFIT GRID */}
//       <FlatList
//         data={outfits}
//         numColumns={2}
//         keyExtractor={(item) => item.Outfit_id.toString()}
//         contentContainerStyle={styles.grid}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.imageBox,
//               selectedOutfit?.Outfit_id === item.Outfit_id &&
//                 styles.selectedBox,
//             ]}
//             onPress={() => setSelectedOutfit(item)}
//           >
//             <Image
//               source={{ uri: item.Outfit_image_url }}
//               style={styles.image}
//             />
//           </TouchableOpacity>
//         )}
//       />

//       {/* TRY ON BUTTON */}
//       <TouchableOpacity style={styles.tryBtn} onPress={handleTryOn}>
//         <Text style={styles.tryText}>Try On</Text>
//       </TouchableOpacity>

//       {/* BOTTOM NAV */}
//       <View style={styles.bottomNav}>

//   <TouchableOpacity
//     style={styles.navItem}
//     onPress={() =>
//       navigation.navigate("WardrobeCollectionScreen", {
//         wardrobe_id,
//         wardrobe_name,
//         user,
//       })
//     }
//   >
//     <Image source={wardrobeIcon} style={styles.navIcon} />
//     <Text style={styles.navText}>Wardrobe</Text>
//   </TouchableOpacity>

//   <TouchableOpacity
//     style={styles.navItem}
//     onPress={() => navigation.navigate("Profile", { user })}
//   >
//     <Image source={profileIcon} style={styles.navIcon} />
//     <Text style={styles.navText}>Profile</Text>
//   </TouchableOpacity>

//     </View>


//     </View>
//   );
// };

// export default PantsScreen;

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   header: {
//     backgroundColor: "#b00000",
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   backBtn: {
//     paddingRight: 12,
//   },

//   backText: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },

//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//   },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },

//   headerSub: {
//     color: "#f5f5f5",
//     fontSize: 13,
//     marginTop: 2,
//   },

//   grid: {
//     padding: 10,
//   },

//   imageBox: {
//     width: "48%",
//     margin: "1%",
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "transparent",
//   },

//   selectedBox: {
//     borderColor: "#b00000",
//   },

//   image: {
//     width: "100%",
//     height: 180,
//     borderRadius: 10,
//   },


//   navItem: {
//   alignItems: "center",
// },

// navIcon: {
//   width: 26,
//   height: 26,
//   marginBottom: 4,
// },



//   tryBtn: {
//     backgroundColor: "#eee",
//     padding: 12,
//     marginHorizontal: 20,
//     marginBottom: 10,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   tryText: {
//     fontWeight: "700",
//   },

//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//   },

//   navText: {
//     fontWeight: "700",
//   },
// });   




import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import CONFIG from "../../ipconfig";

const wardrobeIcon = require("../../assets/wardrobe.png");
const profileIcon  = require("../../assets/profile.png");


const PantsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {wardrobe_id, wardrobe_name, category_name, user,wardrobe } = route.params;

  const [outfits, setOutfits] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  /* ---------------- FETCH CATEGORY OUTFITS ---------------- */
  useEffect(() => {
    const fetchCategoryOutfits = async () => {
      try {
        // const res = await axios.get(
        //   `${CONFIG.LAN}/static/outfits/category/${category_name}`
        // );
        // setOutfits(res.data);
        
    
        const res = await axios.get(
  `      ${CONFIG.LAN}/outfit/api/outfits/wardrobe/${wardrobe_id}/category/${category_name}`);
         console.log("API RESPONSE DATA:", res.data);
         setOutfits(res.data);
      } catch (err) {
        console.log("Error fetching outfits");
      }
    };

    fetchCategoryOutfits();
  }, [wardrobe_id,category_name]);

  useEffect(() => {
    if (selectedOutfit) {
      console.log("SELECTED OUTFIT OBJECT:", selectedOutfit);
      console.log("COLOR RECEIVED ON FRONTEND:", selectedOutfit.color_name);
    }
  }, [selectedOutfit]);

  /* ---------------- TRY ON ---------------- */
  const handleTryOn = () => {
    if (!selectedOutfit) return;

    navigation.navigate("WhatNeedsMatchScreen", {
    selected_image: selectedOutfit.Outfit_image_url,
    wardrobe_id,
    wardrobe_name,
    user,
    wardrobe,
    color_name: selectedOutfit.color_name,
    category_name,
        });
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {category_name.toLowerCase()}
          </Text>
          <Text style={styles.headerSub}>
            {wardrobe_name}
          </Text>
        </View>
      </View>

      {/* OUTFIT GRID */}
      <FlatList
        data={outfits}
        numColumns={2}
        keyExtractor={(item) => item.Outfit_id.toString()}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.imageBox,
              selectedOutfit?.Outfit_id === item.Outfit_id &&
                styles.selectedBox,
            ]}
            onPress={() => setSelectedOutfit(item)}
          >
            <Image
              source={{ uri: item.Outfit_image_url }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      />

      {/* TRY ON BUTTON */}
      <TouchableOpacity style={styles.tryBtn} onPress={handleTryOn}>
        <Text style={styles.tryText}>Try On</Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>

     <TouchableOpacity
      style={styles.navItem}
      onPress={() =>
        navigation.navigate("WardrobeCollectionScreen", {
        wardrobe_id,
        wardrobe_name,
        user,
        })
       }
        >
       <Image source={wardrobeIcon} style={styles.navIcon} />
       <Text style={styles.navText}>Wardrobe</Text>
        </TouchableOpacity>

          <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile", { user })}
           >
            <Image source={profileIcon} style={styles.navIcon} />
            <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>

            </View>
        
        
       
  </View>
  );
};

export default PantsScreen;

// /* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#b00000",
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    paddingRight: 12,
  },

  backText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerSub: {
    color: "#f5f5f5",
    fontSize: 13,
    marginTop: 2,
  },

  grid: {
    padding: 10,
  },

  imageBox: {
    width: "48%",
    margin: "1%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedBox: {
    borderColor: "#b00000",
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },


  navItem: {
  alignItems: "center",
},

navIcon: {
  width: 26,
  height: 26,
  marginBottom: 4,
},



  tryBtn: {
    backgroundColor: "#555555ff",
    padding: 12,
    marginHorizontal: 85,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  tryText: {
    fontWeight: "900",
    color: "#ffffffff",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  navText: {
    fontWeight: "700",
    color: "#333",
  },
});












// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import CONFIG from "../../ipconfig";

// const wardrobeIcon = require("../../assets/wardrobe.png");
// const profileIcon  = require("../../assets/profile.png");

// const PantsScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const { wardrobe_id, wardrobe_name, category_name, user, wardrobe } = route.params;

//   const [outfits, setOutfits] = useState([]);
//   const [filteredOutfits, setFilteredOutfits] = useState([]);
//   const [selectedOutfit, setSelectedOutfit] = useState(null);

//   /* ---------------- FETCH CATEGORY OUTFITS ---------------- */
//   useEffect(() => {
//     const fetchCategoryOutfits = async () => {
//       try {
//         const res = await axios.get(
//           `${CONFIG.LAN}/outfit/api/outfits/category/${category_name}`
//         );

//         // Filter by selected wardrobe
//         const wardrobeFiltered = res.data.filter(
//           (item) =>
//             item.Wardrobe_id === wardrobe_id &&
//             item.wardrobe_name === wardrobe_name
//         );

//         setOutfits(res.data);            // all category outfits
//         setFilteredOutfits(wardrobeFiltered); // only selected wardrobe
//       } catch (err) {
//         console.log("Error fetching outfits", err);
//       }
//     };

//     fetchCategoryOutfits();
//   }, [category_name, wardrobe_id, wardrobe_name]);

//   /* ---------------- TRY ON ---------------- */
//   const handleTryOn = () => {
//     if (!selectedOutfit) return;

//     navigation.navigate("WhatNeedsMatch", {
//       selected_image: selectedOutfit.Outfit_image_url,
//       wardrobe_id,
//       wardrobe_name,
//       user,
//       wardrobe,
//       category_name,
//     });
//   };

//   return (
//     <View style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backText}>←</Text>
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>
//             {category_name.toLowerCase()}
//           </Text>
//           <Text style={styles.headerSub}>
//             {wardrobe_name}
//           </Text>
//         </View>
//       </View>

//       {/* OUTFIT GRID */}
//       <FlatList
//         data={filteredOutfits} // only selected wardrobe
//         numColumns={2}
//         keyExtractor={(item) => item.Outfit_id.toString()}
//         contentContainerStyle={styles.grid}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.imageBox,
//               selectedOutfit?.Outfit_id === item.Outfit_id && styles.selectedBox,
//             ]}
//             onPress={() => setSelectedOutfit(item)}
//           >
//             <Image
//               source={{ uri: item.Outfit_image_url }}
//               style={styles.image}
//             />
//           </TouchableOpacity>
//         )}
//       />

//       {/* TRY ON BUTTON */}
//       <TouchableOpacity style={styles.tryBtn} onPress={handleTryOn}>
//         <Text style={styles.tryText}>Try On</Text>
//       </TouchableOpacity>

//       {/* BOTTOM NAV */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() =>
//             navigation.navigate("WardrobeCollectionScreen", {
//               wardrobe_id,
//               wardrobe_name,
//               user,
//             })
//           }
//         >
//           <Image source={wardrobeIcon} style={styles.navIcon} />
//           <Text style={styles.navText}>Wardrobe</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Profile", { user })}
//         >
//           <Image source={profileIcon} style={styles.navIcon} />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

// export default PantsScreen;

/* ---------------- STYLES ---------------- */
// (aap ke existing styles same hi use kar sakte ho)
