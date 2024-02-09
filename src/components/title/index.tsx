import { ReactNode } from "react";
import Image from "next/image";
import styles from "./title.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Title({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string | ReactNode;
  image: string | StaticImport;
}) {
  return (
    <div className={styles.container}>
      <Image src={image} alt="" fill={true} className={styles.image} />
      <h1 className={styles.heading}>
        <span>{title}</span>
      </h1>
      {subtitle && (
        <h2 className={styles.subtitle}>
          <span>{subtitle}</span>
        </h2>
      )}
    </div>
  );
}
