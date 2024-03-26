import type { NextPage } from "next";
import Header from "components/Header";
import Main from "components/Main";

const DataTable: NextPage = (): JSX.Element => {
  const title = "Data table";

  return (
    <>
      <Header title={title} />
      <Main />
    </>
  );
};

export default DataTable;
