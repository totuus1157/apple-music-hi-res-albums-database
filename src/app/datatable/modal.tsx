"use client";

import type { StorefrontsResponse, AlbumData } from "app/datatable/types";
import Register from "app/datatable/register";
import Analytics from "app/datatable/analytics";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  storefrontArray: StorefrontsResponse;
  registeredAlbumIDs: string[];
  setAlbumFetchTrigger: (arg0: number) => void;
  originalAlbumDataArray: AlbumData[];
};

export default function Modal(props: Props) {
  const {
    modalContent,
    albumInfo,
    isOpen,
    onOpen,
    onOpenChange,
    onClose,
    storefrontArray,
    registeredAlbumIDs,
    setAlbumFetchTrigger,
    originalAlbumDataArray,
  } = props;

  if (modalContent === "register") {
    return (
      <Register
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        storefrontArray={storefrontArray}
        registeredAlbumIDs={registeredAlbumIDs}
        setAlbumFetchTrigger={setAlbumFetchTrigger}
      />
    );
  }

  if (modalContent === "analytics") {
    return (
      <Analytics
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        originalAlbumDataArray={originalAlbumDataArray}
      />
    );
  }

  return null;
}
