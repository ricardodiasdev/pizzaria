import Head from "next/head";
import Header from "../../components/header";

import styles from "./styles.module.scss";

import { FormEvent, useState } from "react";

import { toast } from "react-toastify";

import setupAPIClient from "../../services/api";

import { canSSRAuth } from "../../utils/canSSRAuth";

const Category = () => {
  const [name, setName] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (name === "") {
      return;
    }
    const apiClient = setupAPIClient();
    await apiClient.post("/category", { name: name });
    toast.success("Categoria cadastrada com sucesso...");
    setName("");
  };

  return (
    <>
      <Head>
        <title>Cadastro de Categoria - Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Category;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
