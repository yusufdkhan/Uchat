import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomeKeyboard from "../components/CustomeKeyboard";
import Loader from "../components/Loading";
import { useAuth } from "../context/authContext";

export default function login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      alert("Sign In Please complete the login details");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("LogIn", response.msg);
    }
  };

  return (
    <CustomeKeyboard>
      <StatusBar style={styles.statusbar}></StatusBar>
      <View style={styles.views}>
        <View style={styles.viewimg}>
          <Image
            style={styles.img}
            source={require("../assets/images/login.png")}
          />
        </View>
        <View style={styles.viewtext}>
          <Text style={styles.textsignin}>Login</Text>
          {/* sign in input */}
          <View style={styles.pass}>
            <View style={styles.viewInput}>
              <Octicons style={styles.oct} name="mail" color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={styles.textInput}
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={styles.forgetpass}>
              <View style={styles.viewInput}>
                <Octicons style={styles.oct} name="lock" color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={styles.textInput}
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text style={styles.textforget}>Forget password ?</Text>
            </View>
            {/* submit button */}
            <View>
              {loading ? (
                <View style={styles.loadingst}>
                  <Loader size={hp(8)} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleLogin} style={styles.loginbtn}>
                  <Text style={styles.btnText}>Login </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}
            <View style={styles.signupText}>
              <Text style={styles.textaccountup}>Don't have an account? </Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text style={styles.textaccountup1}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomeKeyboard>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  statusbar: {
    style: "dark",
  },
  views: {
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    display: "flex",
    gap: "12",
  },
  viewimg: {
    alignItems: "center",
  },
  img: {
    height: hp(25),
    resizeMode: "contain",
  },
  viewtext: {
    gap: "40px",
  },
  textsignin: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    color: "262626",
    letterSpacing: "2px",
  },
  viewInput: {
    height: hp(7),
    flexDirection: "row",
    gap: "16px",
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderRadius: 4,
  },
  oct: {
    fontSize: hp(2.7),
  },
  textInput: {
    fontSize: hp(2),
    flex: 1,
    fontWeight: "semibold",
    color: "3f3f46",
  },
  pass: {
    gap: 16,
  },
  forgetpass: {
    gap: 12,
  },
  textforget: {
    textAlign: "right",
    fontWeight: "semibold",
    fontSize: hp(1.8),
    color: "#9CA3AF",
  },
  loginbtn: {
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: hp(6.5),
  },
  btnText: {
    height: hp(2.7),
    color: "white",
    letterSpacing: 1.1,
    fontWeight: "bold",
    fontSize: 20,
  },
  signupText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textaccountup: {
    fontWeight: "semibold",
    color: "#737373",
    height: hp(1.8),
  },
  textaccountup1: {
    fontWeight: "bold",
    color: "#6366F1",
    height: hp(1.8),
  },
  loadingst: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
