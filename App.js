import React from "react";
import { StatusBar} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
// import NewTicket from "./unused pages/NewTicket";
import Fetch from "./Pages/Fetch";

export default function App() {

   const Stack = createNativeStackNavigator(); // stack is an object.

  return (
      <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome Screen" component={Welcome} />
          <Stack.Screen name="Login Screen" component={Login} />
          {/* <Stack.Screen name="NewTicket Screen" component={NewTicket} /> */}
          <Stack.Screen name="fetch Screen" component={Fetch} />
        </Stack.Navigator>
      </NavigationContainer>
      </>
  );
}


