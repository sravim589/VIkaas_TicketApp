import React from "react";

import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function ProfileTicket({ navigation, route }) {
  const { phoneNumber, uid } = route.params;
  const viewProfileButton = () => {
    navigation.navigate("ViewProfile Screen", { phoneNumber: phoneNumber });
  };

  const newTicketButton = () => {
    navigation.navigate("NewTicket Screen",
       { phoneNumber: phoneNumber, uid: uid}
      );
  };

  return (
    <View style={styles.main}>
      <Image source={require("../assets/assetsApp/impressions_logo.webp")} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={viewProfileButton}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={newTicketButton}>
        <Text style={styles.buttonText}>New Ticket</Text>
      </TouchableOpacity>
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
  text: {
    color: "white",
  },
  button: {
    marginTop: 20,
    width: 250,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1976D2",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
});
