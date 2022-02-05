import styles from "../styles/Home.module.css";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        Copyright (C) {year}{" "}
        <a
          href="https://twitter.com/totuus_tweet"
          rel="external nofollow noopener noreferrer"
          target="_blank"
        >
          Totuus1157
        </a>{" "}
        All Rights Reserved.
      </p>
    </footer>
  );
}
