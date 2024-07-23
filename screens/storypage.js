import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import backgroundImage from "../assets/testimage.jpg";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

const Storypage = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params;

  const handleBack = async () => {
    try {
      navigation.navigate("SelectionsPage");
    } catch (e) {
      console.log("Issue with back button");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Story!</Text>
            <Text style={styles.content}>{userData}</Text>
            <Text style={styles.ending}>End of story!</Text>
            <TouchableOpacity style={styles.submitButton} onPress={handleBack}>
              <Text style={styles.submitButtonText}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(245, 245, 245, 0.6)",
  },
  title: {
    color: "#ff0000",
    fontSize: 30,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
    marginBottom: 10,
  },
  ending: {
    paddingTop: 20,
    fontSize: 20,
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
  content: {
    fontSize: 20,
    color: "#000000",
    fontFamily: Platform.select({
      android: "EagleLake_400Regular",
      ios: "Eagle Lake", // Use the correct font name for iOS
    }),
  },
});

export default Storypage;
