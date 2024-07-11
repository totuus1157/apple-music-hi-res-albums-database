import type { NextPage } from "next";
import Header from "components/Header";
import Main from "components/Main";

const DataTable: NextPage = (): JSX.Element => {
  return (
    <>
      <Header
        title="Data Table"
        description="Browse and manage a comprehensive list of Hi-Res Lossless albums on Apple Music. Edit album information, view details, and contribute to the database."
        keywords="Apple Music, Hi-Res Lossless, High-Resolution Albums, Music Database, Edit Albums, Album Information, Music Management"
        author="totuus1157"
      />
      <Main />
    </>
  );
};

export default DataTable;
