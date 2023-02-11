import { createContext, ReactNode, useState } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";

import Router from "next/router";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  try {
    destroyCookie(undefined, "@pizzaria.token");
    Router.push("/");
  } catch (error) {
    console.log("Erro ao deslogar...");
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();

  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post("/session", { email, password });
      // console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, "@pizzaria.token", token, {
        maxAge: 60 * 60 * 24 * 30, //expira em 1 mês
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });

      // passar para as próximas requisições o nosso token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // redirecionar o user para o /dashboard
      Router.push("/dashboard");
    } catch (error) {
      console.log("Erro ao acessar", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
