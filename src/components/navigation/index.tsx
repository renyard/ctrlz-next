"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logo from "../../images/ctrlz-logo-small.png";

import styles from "./navigation.module.scss";

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
          <Link href="/radio">Radio</Link>
        </li>
        {/* <li>
          <Link href="https://store.ctrlz.club">Store</Link>
        </li> */}
      </ul>
    </nav>
  );
}
