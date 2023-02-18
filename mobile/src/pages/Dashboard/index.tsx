import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

import { StackParamsList } from "../../routes/app.routes";

const Dashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [number, setNumber] = useState("");

  const openOrder = async () => {
    if (number === "") {
      return;
    }
  
    // fazendo a requisição e navegar para a próxima tela
    navigation.navigate('Order', {number: number, order_id:'b4fbed32-bd2d-4a3b-bd5d-ba631e6ffb45'});

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da mesa"
        keyboardType="numeric"
        placeholderTextColor="#F0F0F0"
        value={number}
        onChangeText={setNumber}
      />
      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1d1d2e",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#FFF",
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#3FFFA3",
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold",
  },
});

export default Dashboard;
