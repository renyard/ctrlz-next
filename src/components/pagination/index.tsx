import Link from "next/link";

import styles from "./pagination.module.scss";

const getAsLink = (asPattern: string, page: number) =>
  asPattern.replace("[page]", `${page}`);

export default function Pagination({
  numberOfPages,
  currentPage,
  href,
  asPattern,
}: {
  numberOfPages: number;
  currentPage: number;
  href: string;
  asPattern: string;
}) {
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  return (
    <ul className={styles.list}>
      <li>
        <Link href={href} as={getAsLink(asPattern, currentPage - 1)}>
          &lt;
          <span className={styles.hidden}>Previous</span>
        </Link>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber}>
          <Link href={href} as={getAsLink(asPattern, pageNumber)}>
            {pageNumber}
          </Link>
        </li>
      ))}
      <li>
        <Link href={href} as={getAsLink(asPattern, currentPage + 1)}>
          &gt;
          <span className={styles.hidden}>Next</span>
        </Link>
      </li>
    </ul>
  );
}
