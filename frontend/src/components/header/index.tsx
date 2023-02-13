import { useContext } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src="/logo.svg"  width={60} height={60} alt={"Logomarca"} />
        </Link>
        <nav className={styles.menuNav}>
          <Link legacyBehavior href="/category">
            <a>Categoria</a>
          </Link>
          <Link legacyBehavior href="/product">
            <a>Cardápio</a>
          </Link>
          <button onClick={signOut}>
            <FiLogOut color="white" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
