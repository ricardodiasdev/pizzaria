import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  };
};

type FinishOrderRouteProps = RouteProp<RouteDetailParams, "FinishOrder">;

const FinishOrder = () => {
  const route = useRoute<FinishOrderRouteProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const handleFinishOrder = async () => {
    try {
      await api.put("/order/send", {
        order_id: route.params?.order_id,
      });

      navigation.popToTop();
    } catch (error) {
      console.log("Erro ao finalizar pedido. Tente mais tarde.", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você desaja finalizar esse pedido?</Text>
      <Text style={styles.title}>Mesa {route.params?.number}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
        <Text style={styles.textButton}>Finalizar o pedido</Text>
        <Feather name="shopping-cart" size={20} color="#1D1D2E" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  alert: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3FFFA3",
    flexDirection: "row",
    width: "65%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: "#1D1D2E",
  },
});

export default FinishOrder;
