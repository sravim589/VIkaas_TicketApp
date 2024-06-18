import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Button, Image, ScrollView } from "react-native";
import { firebase } from "@react-native-firebase/firestore";

const ViewProfile = ({ route }) => {
  const [users, setUsers] = useState([]);
  const { phoneNumber } = route.params;
  const todoRef = firebase.firestore().collection("users");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await todoRef.where("phoneNumber", "==", phoneNumber).get();
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const { name, phoneNumber, designation, usertype } = doc.data();
        fetchedUsers.push({
          id: doc.id,
          name: name || "",
          phoneNumber: phoneNumber || "",
          designation: designation || "",
          usertype: usertype || "",
        });
      });
      setUsers(fetchedUsers.length > 0 ? fetchedUsers : [{ id: "0", name: "", phoneNumber: "", designation: "", usertype: "" }]);
    };

    fetchData();
  }, [phoneNumber]);

  return (
    <View style={styles.main}>
      <Image source={require("../assets/assetsApp/impressions_logo.webp")} style={styles.image} />
      <Text style={styles.textSign}>View Profile</Text>
      <FlatList
        style={{ opacity: 0.5 }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.innerContainer}>
              <TextInput style={styles.textInput} value={item.name} placeholder="Name" placeholderTextColor="#888" editable={false} />
              <TextInput style={styles.textInput} value={item.designation} placeholder="Designation" placeholderTextColor="#888" editable={false} />
              <TextInput style={styles.textInput} value={item.usertype} placeholder="User Type" placeholderTextColor="#888" editable={false} />
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 180,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b3a67",
    padding: 16,
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
  textInput: {
    color: "black",
    backgroundColor: "grey",
    borderColor: "white",
    width: 300,
    height: 45,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default ViewProfile;
