import type { NextPage } from "next";
import Header from "components/Header";
import Main from "components/Main";
import styles from "styles/Home.module.css";

const DataTable: NextPage = (): JSX.Element => {
  const title = "Data table";

  return (
    <div className={styles.container}>
      <Header title={title} />
      <Main />
    </div>
  );
};

export default DataTable;
