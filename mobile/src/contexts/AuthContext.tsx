import React, { useState, createContext, ReactNode, useEffect } from "react";

import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    const getUser = async () => {
      //pegar os dados salvos do user
      const userInfo = await AsyncStorage.getItem("@pizzaria");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      // verificar se recebemos as informações dele
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    setLoadingAuth(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      // console.log(response.data);
      const { id, name, token } = response.data;

      setUser({ id, name, email, token });

      const data = { ...response.data };

      await AsyncStorage.setItem("@pizzaria", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setLoadingAuth(false);
    } catch (error) {
      console.log("erro ao acessar", error);

      setLoadingAuth(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear().then(() => {
      setUser({ id: "", name: "", email: "", token: "" });
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
