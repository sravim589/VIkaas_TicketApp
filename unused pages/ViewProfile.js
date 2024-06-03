import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ViewProfile() {
  return (
    <View style={styles.main}>
        <Text style={styles.text}>ViewProfile Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b3a67", 
    },
    text:{
        color:'white'
    }
  });
  
  
  
  
