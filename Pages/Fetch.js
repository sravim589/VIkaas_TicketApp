import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from '../firebaseConfig';

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("todos");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await todoRef.get();
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const { name, phoneNumber } = doc.data();
        fetchedUsers.push({
          id: doc.id,
          name,
          phoneNumber,
        });
      });
      setUsers(fetchedUsers);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 10, marginTop: 100 }}>
      <FlatList
        style={{ height: '100%' }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.name}</Text>
              <Text style={styles.itemHeading}>{item.phoneNumber}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles
  },
  innerContainer: {
    // Your inner container styles
  },
  itemHeading: {
    // Your item heading styles
  },
});

export default Fetch;
