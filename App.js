import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import ProfileTicket from "./Pages/ProfileTicket";
import ViewProfile from "./Pages/ViewProfile";
import NewTicket from "./Pages/NewTicket";


function App() {
  const Stack = createNativeStackNavigator(); // stack is an object.

  return (
    <>
      <StatusBar  barStyle="light-content"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome Screen" component={Welcome} />
          <Stack.Screen name="Login Screen" component={Login} />
          <Stack.Screen name="ProfileTicket Screen" component={ProfileTicket} />
          <Stack.Screen name="ViewProfile Screen" component={ViewProfile} />
          <Stack.Screen name="NewTicket Screen" component={NewTicket} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;