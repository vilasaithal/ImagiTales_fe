import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import app from "../firebaseConfig.js";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../assets/testimage.jpg";

const auth = getAuth(app);

export default function LoginSignupPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuth = async () => {
    try {
      const authFunction = isLogin
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
      await authFunction(auth, email, password);
      console.log(
        isLogin ? "Logged in successfully" : "Signed up successfully"
      );
      navigation.navigate("welcome");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome to ImagiTales!</Text>
          <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const fontFamily = Platform.select({
  android: "EagleLake_400Regular",
  ios: "Eagle Lake",
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 40,
    color: "#ff0000",
    padding: 20,
    fontFamily,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    marginBottom: 20,
    fontFamily,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    fontFamily,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontFamily,
  },
  switchText: {
    color: "#ffffff",
    marginTop: 10,
    fontFamily,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
