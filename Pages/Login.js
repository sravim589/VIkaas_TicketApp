import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import firebase from "../firebaseConfig";

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [users, setUsers] = useState([]);
  const [confirm, setConfirm] = useState("");

  const usersPhoneNumber = firebase.firestore().collection("users");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await usersPhoneNumber.get();
      const fetchedUsersNum = [];
      querySnapshot.forEach((doc) => {
        const { phoneNumber } = doc.data();
        fetchedUsersNum.push({
          id: doc.id,
          phoneNumber,
        });
      });
      setUsers(fetchedUsersNum);
    };
    fetchData();
  }, []);

  const inputHandler = (value) => {
    // we have asssign some variable to store update value
    setPhoneNumber(value);
  };

  const signInButtonHandler = () => {
    const userExists = users.some((user) => user.phoneNumber === phoneNumber); // javascript method some() method is used to check if at least one element in the users array
    if (userExists) {
      setConfirm("number is registered");
      console.log("number is registered");
    } else {
      console.log("phone number is not registered");
    }
  };

  const sendOtpHandler = () => {
    navigation.navigate("fetch Screen");
  };

  return (
    <View style={styles.main}>
      {/* IMAGE SECTION */}
      <Image source={require("../assets/assetsApp/impressions_logo.webp")} style={styles.image} />

      {/* HEADER TEXT SECTION */}

      {!confirm ? (
        <>
          {/* LOGIN SCREEN */}
          <Text style={styles.textSign}>Sign In</Text>
          <Text style={styles.text}>Enter mobile number to continue</Text>

          {/* INPUT SECTION */}
          <TextInput style={styles.textInput} value={phoneNumber} onChangeText={inputHandler} />

          {/* RADIO SECTION */}
          <View style={styles.radioSection}>
            <RadioButton style={styles.radio} />
            <Text style={styles.radioText}>I agree to terms of use and Privacy Policy of Impressions Services Pvt Ltd.</Text>
          </View>

          {/*   BUTTON  SECTION*/}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={signInButtonHandler}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* VERIFY OTP */}

          <View>
            <View style={styles.viewEntertext}>
              <Text style={styles.enterOtp}>Enter OTP sent to : </Text>
            </View>
            <TextInput style={styles.textInput} />

            {/*  */}
            <View style={styles.resendMain}>
              <Text style={styles.enterOtp}>Didn't received the OTP?</Text>
              <Text style={styles.enterOtp}>Resend</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={sendOtpHandler}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b3a67",
  },
  image: {
    width: 300,
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 30,
  },
  textSign: {
    color: "white",
    fontSize: 20,
  },
  text: {
    color: "white",
  },
  textInput: {
    opacity: 0.5,
    backgroundColor: "grey",
    borderColor: "#9affffff",
    width: 300,
    height: 45,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
  },
  code: {
    color: "white",
  },
  radioSection: {
    marginTop: 20,
    flexDirection: "row",
    width: 270,
    color: "white",
    justifyContent: "center",
  },
  radioText: {
    color: "white",
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#39d2c0",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },

  //Send otp
  enterOtp: {
    color: "white",
    textAlign: "left",
  },
  resendMain: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
