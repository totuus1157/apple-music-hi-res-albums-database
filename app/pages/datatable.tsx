import type { NextPage } from "next";
import Header from "components/Header";
import Main from "components/Main";

const DataTable: NextPage = (): JSX.Element => {
  return (
    <>
      <Header title="Data Table" />
      <Main />
    </>
  );
};

export default DataTable;
