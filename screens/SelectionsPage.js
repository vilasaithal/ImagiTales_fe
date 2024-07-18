import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../assets/testimage.jpg";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { itemDescriptions } from "./itemdescriptions";

const categories = [
  {
    title: "House",
    items: ["WiseDen", "CleverKeep", "LoyalTower", "BraveHall"],
  },
  {
    title: "Specialty",
    items: [
      "Arithmancy",
      "Herbology",
      "Wandlore",
      "Dark Arts",
      "Alchemy",
      "Defence Against Dark Arts",
      "Spell Crafting",
      "Ritual Magic",
      "Magical Artifacts",
      "Magical History",
      "Apparition",
      "Ancient Runes",
      "Potions",
      "Transfiguration",
      "Enchanting",
      "Wizarding Law",
      "Flying",
      "Magical Creatures",
      "Charms",
      "Divination",
      "Necromancy",
      "Curse Breaking",
      "Elemental Magic",
      "Astronomy",
      "Healing",
    ],
  },
  {
    title: "Spell",
    items: [
      "Memory Charm",
      "Confundus Charm",
      "Vanishing Spell",
      "Binding Spell",
      "Curse of the Bogies",
      "Stunning Spell",
      "Inferno Spell",
      "Shrinking Spell",
      "Silencing Charm",
      "Bubble-Head Charm",
      "Invisibility Spell",
      "Muffling Charm",
      "Weather-Making Spell",
      "Repelling Spell",
      "Mending Charm",
      "Illumination Spell",
      "Disarming Charm",
      "Unlocking Charm",
      "Summoning Charm",
      "Transformation Spell",
      "Animation Spell",
      "Petrification Spell",
      "Bat-Bogey Hex",
      "Teleportation Spell",
      "Color Change Charm",
      "Duplication Charm",
      "Water-Making Spell",
      "Ageing Spell",
      "Freezing Charm",
      "Growth Charm",
      "Patronus Charm",
      "Leg-Locker Curse",
      "Time-Freezing Charm",
      "Levitation Charm",
      "Banishing Charm",
      "Conjuration Spell",
      "Reviving Spell",
      "Fire-Making Spell",
      "Shield Charm",
      "Love Charm",
      "Healing Spell",
      "Gravity-Flipping Spell",
      "Sleeping Charm",
    ],
  },
  {
    title: "WandType",
    items: [
      "Cherry and Kelpie Hair",
      "Ebony and Veela Hair",
      "Mahogany and Chimera Scale",
      "Rosewood and Dragonfly Wing",
      "Ash and Thestral Tail Hair",
      "Birch and Griffin Claw",
      "Elm and Mermaid Scale",
      "Yew and Dementor Essence",
      "Cedar and Sphinx Whisker",
      "Pine and Wyvern Talon",
      "Walnut and Troll Whisker",
      "Holly and Phoenix Feather",
      "Alder and Hippogriff Feather",
      "Willow and Unicorn Hair",
      "Oak and Dragon Heartstring",
      "Maple and Basilisk Scale",
    ],
  },
];

export default function Welcome() {
  const navigation = useNavigation();
  const [visibleDescription, setVisibleDescription] = useState(null);
  const [selections, setSelections] = useState({
    House: null,
    Specialty: null,
    Spell: null,
    WandType: null,
  });
  const [serverResponse, setServerResponse] = useState("");

  const handleSelection = (category, item) => {
    setSelections((prev) => ({
      ...prev,
      [category]: item,
    }));
  };

  const handleBack = async () => {
    try {
      navigation.navigate("welcome");
    } catch (e) {
      console.log("Issue with back button");
    }
  };
  const handleSubmit = async () => {
    if (Object.values(selections).some((value) => value === null)) {
      Alert.alert(
        "Incomplete Selection",
        "Please select one item from each category."
      );
      return;
    }

    const requestBody = {
      House: selections.House,
      Specialty: selections.Specialty,
      Spell: selections.Spell,
      WandType: selections.WandType,
    };
    const url = "http://192.168.0.37:8080/v1/query_by_parameters";

    try {
      console.log("Sending payload:", requestBody);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        Alert.alert("Error", `Error ${response.status}: ${errorText}`);
        return;
      }

      const contentType = response.headers.get("content-type");
      const text = await response.text();
      let responseData;

      if (contentType && contentType.indexOf("application/json") !== -1) {
        try {
          responseData = JSON.parse(text);
        } catch (e) {
          responseData = text; // If parsing fails, use the raw text
        }
      } else {
        responseData = text;
      }

      setServerResponse(JSON.stringify(responseData, null, 2));

      // Navigate to the story page after setting the server response
      navigation.navigate("storypage", { userData: responseData });
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView>
        <ScrollView>
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>
              Select one item from each category to get a story:
            </Text>

            {categories.map((category, index) => (
              <View key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {category.items.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={itemIndex}
                      style={[
                        styles.item,
                        selections[category.title] === item &&
                          styles.selectedItem,
                      ]}
                      onPress={() => handleSelection(category.title, item)}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          selections[category.title] === item &&
                            styles.selectedItemText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ))}
            <ScrollView>
              <View style={styles.selectionContainer}>
                <Text style={styles.selectionTitle}>Your Selections:</Text>
                {Object.entries(selections).map(([category, item]) => (
                  <View key={category}>
                    <View style={styles.selectionRow}>
                      <Text style={styles.selectionText}>
                        {category}: {item || "None"}
                      </Text>
                      {item && (
                        <TouchableOpacity
                          style={styles.descriptionButton}
                          onPress={() =>
                            setVisibleDescription(
                              visibleDescription === item ? null : item
                            )
                          }
                        >
                          <Text style={styles.descriptionButtonText}>?</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {visibleDescription === item && item && (
                      <Text style={styles.descriptionText}>
                        {itemDescriptions[item]}
                      </Text>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Submit Selections</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleBack}
                >
                  <Text style={styles.submitButtonText}>Back</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(245, 245, 245, 0.6)",
  },
  title: {
    fontSize: 30,
    color: "#ff0000",
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#000000",
  },
  itemText: {
    fontSize: 16,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  selectedItemText: {
    color: "#fff",
  },
  selectionContainer: {
    marginTop: 20,
  },
  selectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  selectionText: {
    fontSize: 20,
    marginBottom: 5,
    color: "#000000",
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
    flexShrink: 1,
    width: "80%",
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  responseTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  responseField: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 150,
    textAlignVertical: "top",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
    justifyContent: "center", // Optional: Center content vertically
  },
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  descriptionButton: {
    backgroundColor: "#000000",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  descriptionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  descriptionText: {
    marginTop: 5,
    marginBottom: 10,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
    color: "#000000",
  },
});
