import { createContext, ReactNode, useState } from "react";

import { destroyCookie } from "nookies";

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
    console.log('Erro ao deslogar...')
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();

  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInProps) => {
    console.log("Dados para logar: ", email, " - ", password);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
