import { canSSRAuth } from "../../utils/canSSRAuth";

const Dashboard = () => {
  return (
    <div>
      <h1>Bem vindo(a) ao painel</h1>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
