import React, { useState, createContext, ReactNode } from "react";

import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage"

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

  const isAuthenticated = !!user.name;

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      // console.log(response.data);
      const { id, name, token } = response.data;

      setUser({ id, name, email, token });

      const data = { ...response.data};

      await AsyncStorage.setItem('@pizzaria', JSON.stringify(data))

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setLoadingAuth(false);
    } catch (error) {
      console.log("erro ao acessar", error);

      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
