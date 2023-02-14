import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

import Header from "../../components/header";
import { FiRefreshCcw } from "react-icons/fi";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={styles.listOrders}>
            <section className={styles.orderItem}>
              <button>
                <div className={styles.tag}></div>
                <span>Mesa 30</span>
              </button>
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
