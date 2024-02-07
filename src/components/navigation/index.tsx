"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./navigation.module.scss";
import Image from "next/image";

import logo from "../../images/ctrlz_logo.png";

export default function Navigation() {
  const [navVisible, setNavVisible] = useState(false);

  return (
    <nav className={styles.nav}>
      <h1 className={styles.header}>
        <Link href="/">
          <Image src={logo} width={80} height={80} alt="" />
          <span>CTRL Z</span>
        </Link>
      </h1>
      <button
        className={`${styles["menu-button"]} ${navVisible ? styles.close : ""}`}
        onClick={() => setNavVisible(!navVisible)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.hidden}>Menu</span>
      </button>

      <ul
        className={`${styles.links} ${navVisible ? styles["nav-visible"] : ""}`}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/newsletter">Newsletter</Link>
        </li>
        <li>
          <Link href="/podcast">Radio Show</Link>
        </li>
        <li>
          <Link href="https://store.ctrlz.club">Store</Link>
        </li>
      </ul>
    </nav>
  );
}
