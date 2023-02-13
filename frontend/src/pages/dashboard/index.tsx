import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";

import Header from "../../components/header"

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header/>
        <h1>Painel</h1>
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
