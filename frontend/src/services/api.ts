import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

import { signOut } from "../contexts/AuthContext";

const setupAPIClient = (ctx = undefined) => {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${cookies["@pizzaria.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // não autorizado -  devemos deslogar usuário
        if (typeof window !== undefined) {
          // chamar a função para deslogar o usuário
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(new AuthTokenError());
    }
  );

  return api;
};

export default setupAPIClient;
