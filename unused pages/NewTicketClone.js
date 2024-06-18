import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import ImagePicker from "react-native-image-picker";

import { firestore } from "../firebaseConfig";

export default function NewTicket({ route, navigation }) {
  const { uid } = route.params;
  const [ticketData, setTicketData] = useState("");
  const [image, setImage] = useState(null);

  const handleInput = (text) => {
    setTicketData(text);
  };

  const selectImage = () => {
    console.log("select image");
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
  };

  const submit = async () => {
    try {
      await firestore()
        .collection("ticketData")
        .doc(uid)
        .set({
          ticketData,
          imageUri: image ? image.uri : null, // Save image URI to Firestore
        });
      console.log("submitted");
      Alert.alert(
        "Submitted",
        "your ticket has been submitted succesfully!",
        [
          {
            text: "ok",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error saving details: ", error);
    }
  };

  return (
    <View style={styles.main}>
      <Image source={require("../assets/assetsApp/impressions_logo.webp")} style={styles.image} />
      <Text style={styles.formHeadingText}>New Ticket Page</Text>
      <Text style={styles.belowHeading}>Fill your basic details to complete your ticket</Text>
      <View>
        <TextInput style={styles.formInput} placeholder="Enter ticket name" value={ticketData} onChangeText={handleInput} />
        <TouchableOpacity onPress={selectImage} style={styles.selectButton}>
          <Text style={styles.textSelectButton}>Select Image</Text>
        </TouchableOpacity>
        {image && <Image source={image} style={{ width: 200, height: 200, marginTop: 10 }} />}
        <TouchableOpacity onPress={submit} style={styles.submitButton}>
          <Text style={styles.textSubmitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
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
  formHeadingText: {
    color: "white",
    fontSize: 20,
  },
  belowHeading: {
    color: "white",
  },
  formInput: {
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
    color: "white",
  },
  selectButton: {
    marginTop: 20,
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
  },
  textSelectButton: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  submitButton: {
    marginTop: 20,
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#39d2c0",
    justifyContent: "center",
    alignItems: "center",
  },
  textSubmitButton: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
});