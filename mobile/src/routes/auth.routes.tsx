import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/Signin";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
