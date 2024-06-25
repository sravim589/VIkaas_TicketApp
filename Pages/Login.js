import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { firebase, firestore, auth } from "../firebaseConfig";

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState("");
  const [radioCheck, setRadioCheck] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [error, setError] = useState("");
  const [resendTimeout, setResendTimeout] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // FETCH PHONE NUMBER FUNCTIONALITY
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firestore().collection("users").get();
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

  // INPUTFIELD VALIDATION
  const inputHandler = (value) => {
    //value- represents current value
    // Ensure "+91" prefix is retained
    if (!value.startsWith("+91")) {
      // we are extracting +91 cause we are removing numeric charater after +91, in thatif we not use +91 slice it will also remove +91
      value = "+91";
    }

    // Get the numeric part after "+91"
    const numericPart = value.slice(3).replace(/[^0-9]/g, "");

    // Combine "+91" with the cleaned numeric part
    const cleanedValue = "+91" + numericPart;

    setPhoneNumber(cleanedValue);

    // Validate phone number using regex (10 digits after "+91")
    if (/^\+91[0-9]{1,10}$/.test(cleanedValue)) {
      setError("");
    } else {
      setError("Enter a correct number (1-10 digits after +91)");
    }
  };

  // SIGNIN BUTTON
  const signInButtonHandler = async () => {
    const userExists = users.some((user) => user.phoneNumber === phoneNumber);
    if (userExists) {
      try {
        // signInWithPhoneNumber is a fucntionality provided by firebase
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber); //HERE SIGNINWITHPHONENUMBER FUNCTION USED FROM FIREBASE TO AUTHENTICATE
        setConfirm(confirmation);
        console.log("number is registered");
      } catch (error) {
        console.log("Error during sign-in:", error);
      }
    } else {
      console.log("phone number is not registered");
    }
  };

  // RADIO CHECK
  const RadioHandler = () => {
    setRadioCheck(!radioCheck);
    setButtonDisabled(false);
  };

  // VERIFY BUTTON
  const VerifyOTPHandler = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
      await firestore().collection("users").doc(user.uid).get();
      navigation.navigate("ProfileTicket Screen", { phoneNumber: phoneNumber, uid: user.uid });
    } catch (error) {
      console.log(error, "Invalid Code");
    }
  };

  // RESEND HANDLER
  const resendOTPHandler = async () => {
    if (canResend) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        setResendTimeout(30);
        setCanResend(false);
        console.log("OTP resent");
      } catch (error) {
        console.log("Error resending OTP:", error);
      }
    }
  };

  //WRONG NUMBER BUTTON FUNCTIONALITY
  const wrongNumberhandler = () => {
    console.log("Otp Code");
    navigation.goBack("Login Screen");
  };

  return (
    <View style={styles.main}>
      <Image source={require("../assets/assetsApp/impressions_logo.webp")} style={styles.image} />
      {!confirm ? (
        //SIGNIN SCREEN
        <>
          <Text style={styles.textSign}>Sign In</Text>
          <Text style={styles.text}>Enter mobile number to continue</Text>
          <TextInput style={styles.textInput} value={phoneNumber} onChangeText={inputHandler} keyboardType="numeric" maxLength={13} />
          {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.radioSection}>
            <RadioButton color="#39d2c0" style={styles.radio} value="agree" status={radioCheck ? "checked" : "unchecked"} onPress={RadioHandler} />
            <Text style={styles.radioText}>I agree to terms of use and Privacy Policy of Impressions Services Pvt Ltd.</Text>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: radioCheck ? "#39d2c0" : "grey" }]} onPress={signInButtonHandler} disabled={buttonDisabled}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        //OTP SCREEN
        <>
          <View>
            <View style={styles.viewEntertext}>
              <Text style={styles.enterOtp}>Enter OTP sent to: {phoneNumber}</Text>
            </View>
            <TextInput style={styles.textInputCode} placeholder="Enter OTP" value={code} onChangeText={setCode} keyboardType="numeric" maxLength={6} />

            <View>
              <Text style={styles.wrongNumber} onPress={wrongNumberhandler}>
                wrong number ?
              </Text>
            </View>

            <TouchableOpacity style={styles.resendMain} onPress={resendOTPHandler} disabled={!canResend}>
              <Text style={styles.enterOtp}>Didn't receive the OTP?</Text>
              <Text style={[styles.enterOtp, !canResend && { color: "grey" }]}>Resend {canResend ? "" : `in ${resendTimeout}s`}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={VerifyOTPHandler}>
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
    paddingHorizontal: 10,
  },
  textInputCode: {
    opacity: 0.5,
    backgroundColor: "grey",
    borderColor: "#9affffff",
    width: 300,
    height: 45,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center", // This is for aligning content vertically
    paddingHorizontal: 10,
    textAlign: "center", // This is for aligning text horizontally
    letterSpacing: 5, // Adjust the spacing value as needed
    fontFamily: "monospace",
  },
  errorText: {
    color: "red",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39d2c0",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  enterOtp: {
    color: "white",
    textAlign: "left",
  },
  resendMain: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wrongNumber: {
    color: "red",
    marginTop: 20,
    textAlign: "right",
  },
});
