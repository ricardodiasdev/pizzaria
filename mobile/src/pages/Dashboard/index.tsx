import React, {useContext, useState} from "react";
import { View, Text, Button } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {

  const {signOut} = useContext(AuthContext)
  return (
    <View>
      <Text>Dashboard</Text>
      <Button title="Sair do APP" onPress={signOut}/>
    </View>
  );
};

export default Dashboard;
