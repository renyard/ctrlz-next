import Link from "next/link";

import styles from "./more-link.module.scss";

export default async function MoreLink() {
  return (
    <Link href="/newsletter" className={styles["more-link"]}>
      More Newsletters &gt;&gt;&gt;
    </Link>
  );
}
