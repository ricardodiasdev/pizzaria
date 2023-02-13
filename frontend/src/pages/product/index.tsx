import styles from "./styles.module.scss";

import Head from "next/head";
import Header from "../../components/header";

import { canSSRAuth } from "../../utils/canSSRAuth";

const Product = () => {
  return (
    <>
      <Head>
        <title>Cadastro de Produto - Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form}>
            <select name="" id="">
              <option value="">Bebidas</option>
              <option value="">Pizzas</option>
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite o nome do produto"
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Digite o preço do produto"
            />
            <textarea
              className={styles.input}
              placeholder="Descreva seu produto..."
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

export default Product;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
