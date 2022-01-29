import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        Copyright (C) {year}{" "}
        <a href="https://twitter.com/totuus_tweet">Totuus1157</a> All Rights
        Reserved.
      </p>
    </footer>
  );
}
