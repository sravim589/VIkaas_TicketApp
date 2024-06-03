import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Welcome({navigation}) {

  const pressHandler=()=>{
    navigation.navigate("Login Screen");
  }

  return (
    <View style={styles.main}>
      <Image source={require("../assets/assetsApp/Saly-15_1.png")} 
      style={styles.image}/>
      <TouchableOpacity style={styles.welcomeButton}>
        <Text style={styles.buttonText} onPress={pressHandler}>Welcome to Impressions</Text>
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
  image:{
    width:400,
    height:400
  },
  welcomeButton: {
    marginTop:20,
    height:45,
    width:230,
    borderRadius:10,
    backgroundColor:"#4b39ef",
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    color:'white',
    fontSize:16,
  }
});



