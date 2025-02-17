"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Main from "app/datatable/main";

export default function DataTable() {
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

  if (!isDisplay) return null;

  return <Main />;
}
