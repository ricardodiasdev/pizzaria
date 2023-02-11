import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/home.module.scss";

import Link from "next/link";

import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const  Home = () => {
  return (
    <>
      <Head>
        <title>Pizzaria - Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da Pizzaria" />
        <div className={styles.login}>
          <h1>Criando a sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>
          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça o login</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home
