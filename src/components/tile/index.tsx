import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import styles from "./tile.module.scss"

export default async function Tile({
  title,
  subtitle,
  image,
  link,
}: {
  title: string
  subtitle?: string
  image: string | StaticImageData
  link: string
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
          sizes="(min-width: 900px) 450px, (min-width: 700px) 350px, (min-width: 600px) 300px, 150px"
        />
        <span className={styles.title}>
          <span>{title}</span>
          {subtitle && (
            <>
              <span className={styles.subtitle}>
                <br />
                {subtitle}
              </span>
            </>
          )}
        </span>
      </Link>
    </li>
  )
}
