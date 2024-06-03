import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ProfileTicket() {
  return (
    <View style={styles.main}>
        <Text style={styles.text}>ProfileTicketPage</Text>
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
  
  
  
  
