import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { storeTicket } from "../axios/http";

export default function NewTicket() {
  const [ticketData, setTicketData] = useState("");

  const handleInput = () => {
    setTicketData();
  };

  const submit = (
    ticketData
  ) => {
      console.log("submitted");
      // storeTicket(ticketData);
      console.log(ticketData);
  };

  return (
    <View style={styles.main}>
      <Text style={styles.formHeadingText}>NewTicket Page</Text>
      <View>
        <TextInput style={styles.formInput} placeholder="Enter name" value={ticketData} onChangeText={handleInput} />
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
  formHeadingText: {
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
