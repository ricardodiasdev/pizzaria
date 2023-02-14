import styles from "./styles.module.scss";

import { ChangeEvent, useState } from "react";
import Head from "next/head";
import Header from "../../components/header";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";

import setupAPIClient from "../../services/api";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

const Product = ({ categoryList }: CategoryProps) => {
  // console.log(categoryList);

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleChangeCategory = (event) => {
    // console.log('Index das categoria - ', event.target.value);
    setCategorySelected(event.target.value);
  };

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
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="white" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />
              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
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
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/category");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
