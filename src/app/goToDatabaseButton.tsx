"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function GoToDatabaseButton() {
  const router = useRouter();

  const goDataBase = (): void => {
    localStorage.setItem("display", "ok");
    router.push("/datatable");
  };

  return (
    <Button
      size="lg"
      color="primary"
      onPress={(): void => {
        goDataBase();
      }}
    >
      View Hi-Res Albums
    </Button>
  );
}
