"use client";

import type {
  StorefrontsResponse,
  AlbumData,
  FocusedAlbum,
} from "app/datatable/types";
import Register from "app/datatable/register";
import AlbumStats from "app/datatable/album-stats";
import AlbumDetail from "app/datatable/album-detail";

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
  focusedAlbum: FocusedAlbum;
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
    focusedAlbum,
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

  if (modalContent === "albumDetail") {
    return (
      <AlbumDetail
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        focusedAlbum={focusedAlbum}
      />
    );
  }

  if (modalContent === "albumStats") {
    return (
      <AlbumStats
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        originalAlbumDataArray={originalAlbumDataArray}
      />
    );
  }

  return null;
}
