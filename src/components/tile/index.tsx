import Link from "next/link";

import styles from "./tile.module.scss";
import Image from "next/image";

export default async function Tile({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <li className={styles.tile}>
      <Link href={link} className={styles.link}>
        <Image
          src={image}
          alt=""
          fill={true}
          className={styles["tile-image"]}
          loading="lazy"
        />
        <span className={styles.title}>{title}</span>
      </Link>
    </li>
  );
}
