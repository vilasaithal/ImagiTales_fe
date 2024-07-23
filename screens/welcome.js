import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import backgroundImage from "../assets/testimage.jpg";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("SelectionsPage");
  };
  const handleBack = async () => {
    try {
      navigation.navigate("AuthScreen");
    } catch (e) {
      console.log("Issue with back button");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={[styles.heading, styles.centertext]}>
              Welcome to ImagiTales!
            </Text>
            <Text style={[styles.content, styles.centertext]}>
              Welcome, everyone! This app allows you to dive into enchanting
              stories about wizards with special abilities.
            </Text>
            <Text style={[styles.content, styles.centertext]}>
              Customize your adventure by selecting parameters such as House,
              Specialty, Spell, and Wand Type to discover a story tailored just
              for you.
            </Text>
            <Text style={[styles.content, styles.centertext]}>
              Created to ensure kids always have a magical tale to enjoy, simply
              choose your preferences, and we'll conjure up the most relevant
              story.
            </Text>
            <Text style={[styles.content, styles.centertext]}>
              Tap on Next to continue, and hope you have fun. Let the magic
              begin!
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <Text style={styles.submitButtonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleBack}>
            <Text style={styles.submitButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.ending} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#ff0000",
    fontSize: 40,
    padding: 20,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake",
    }),
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(245, 245, 245, 0.6)",
  },
  content: {
    color: "#000000",
    fontSize: 20,
    padding: 10,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake",
    }),
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    alignItems: "flex-start",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake",
    }),
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  centertext: {
    textAlign: "center",
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    // backgroundColor: "rgba(245, 245, 245, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  ending: {
    paddingTop: 30,
  },
});
