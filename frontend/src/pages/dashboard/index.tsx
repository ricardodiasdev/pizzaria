import { useState } from "react";

import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

import Header from "../../components/header";
import { FiRefreshCcw } from "react-icons/fi";

import ModalOrder from "../../components/ModalOrder";

import setupAPIClient from "../../services/api";

import Modal from "react-modal";
import { toast } from "react-toastify";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order_id: string;
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

const Dashboard = ({ orders }: HomeProps) => {
  const [orderList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModalView = async (id: string) => {
    const apiClient = setupAPIClient();

    const response = await apiClient.get("/order/detail", {
      params: {
        order_id: id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  };

  const handleRefreshOrders= async () => {
    const apiClient = setupAPIClient();

    const response = await apiClient.get("/orders");

    setOrderList(response.data);
  }

  const handleFinishItem = async (id: string) => {
    const apiClient = setupAPIClient();

    await apiClient.put("/order/finish", {
      order_id: id,
    });

    toast.success("Pedido fechado com sucesso!");

    handleRefreshOrders();

    setModalVisible(false);
  };

  Modal.setAppElement("#__next");
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
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={styles.listOrders}>
            {orderList.length === 0 && <span className={styles.emptyList}>Nenhum pedido aberto...</span>}
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
