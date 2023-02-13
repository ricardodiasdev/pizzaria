import Head from "next/head";
import Header from "../../components/header";

import { FormEvent, useState } from "react";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";

import  setupAPIClient  from "../../services/api";

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

        <main className={styles.contaneir}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.container} onSubmit={handleRegister}>
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
