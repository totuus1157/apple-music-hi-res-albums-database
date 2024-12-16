import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "components/Header";
import Main from "components/Main";

const DataTable: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect((): void => {
    if (process.env.NODE_ENV !== "development") {
      if (localStorage.getItem("display") === "ok") {
        setIsDisplay(true);
        localStorage.removeItem("display");
      } else {
        router.push("/");
      }
    } else {
      setIsDisplay(true);
    }
  }, []);

  return isDisplay ? (
    <>
      <Header
        title="Data Table"
        description="Browse and manage a comprehensive list of Hi-Res Lossless albums on Apple Music. Edit album information, view details, and contribute to the database."
        keywords="Apple Music, Hi-Res Lossless, High-Resolution Albums, Music Database, Edit Albums, Album Information, Music Management"
        author="totuus1157"
      />
      <Main />
    </>
  ) : (
    <></>
  );
};

export default DataTable;
