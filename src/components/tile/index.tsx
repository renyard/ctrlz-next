import Link from "next/link";

import styles from "./tile.module.scss";
import Image, { StaticImageData } from "next/image";

export default async function Tile({
  title,
  subtitle,
  image,
  link,
}: {
  title: string;
  subtitle?: string;
  image: string | StaticImageData;
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
        <span className={styles.title}>
          <span>{title}</span>
          {subtitle && <span className={styles.subtitle}></span>}
        </span>
      </Link>
    </li>
  );
}
