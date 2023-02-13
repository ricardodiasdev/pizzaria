import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";

import Router from "next/router";

import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
  name: string;
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
    toast.error("Erro ao acessar!");
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@pizzaria.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({ id, name, email });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

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
      toast.success("Logado com sucesso!");

      // redirecionar o user para o /dashboard
      Router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao acessar!");
      console.log("Erro ao acessar", error);
    }
  };

  const signUp = async ({ name, email, password }: SignUpProps) => {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso!");
      console.log("Cadastrado com sucesso...");

      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar!");
      console.log("Erro ao cadastrar...", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
