"use client";

import type {
  AlbumData,
  SelectedItem,
  FocusedAlbum,
  StorefrontsResponse,
} from "app/datatable/types";
import { useState, useEffect } from "react";
import Navbar from "app/datatable/navbar";
import ButtonGroup from "app/datatable/button-group";
import AlbumTable from "app/datatable/album-table";
import Modal from "app/datatable/modal";
import { useDisclosure } from "@heroui/react";
import { KofiFloatingButtonReact } from "kofi-react-widget";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Main() {
  const [storefrontArray, setStorefrontArray] = useState<StorefrontsResponse>({
    data: [],
  });
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [albumFetchTrigger, setAlbumFetchTrigger] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState("");
  const [registeredAlbumIDs, setRegisteredAlbumIDs] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    artist: null,
    genre: null,
    composer: null,
    sampleRate: null,
  });
  const [focusedAlbum, setFocusedAlbum] = useState<FocusedAlbum>({
    id: null,
    storefront: null,
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 50;

  const { data, isLoading: isSWRLoading } = useSWR(
    `/api/database/get-albums?page=${page}&limit=${rowsPerPage}&filters=${encodeURIComponent(JSON.stringify(selectedItem))}`,
    fetcher,
    { keepPreviousData: true },
  );

  useEffect((): void => {
    const getStorefronts = async (): Promise<void> => {
      const response = await fetch("api/apple-music/get-storefronts");
      const result = await response.json();
      const storefronts: StorefrontsResponse = result;

      setStorefrontArray(storefronts);
    };

    getStorefronts();
  }, []);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const albumDataArray = data?.albums.rows || [];
  const totalAlbums = data?.totalAlbums || 0;

  return (
    <div>
      <main>
        <Navbar setModalContent={setModalContent} onOpen={onOpen} />
        <ButtonGroup
          setModalContent={setModalContent}
          onOpen={onOpen}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isRandomMode={isRandomMode}
          setIsRandomMode={setIsRandomMode}
        />
        <AlbumTable
          storefrontArray={storefrontArray}
          albumDataArray={albumDataArray}
          isOpen={isOpen}
          onOpen={onOpen}
          registeredAlbumIDs={registeredAlbumIDs}
          setRegisteredAlbumIDs={setRegisteredAlbumIDs}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isRandomMode={isRandomMode}
          isEditMode={isEditMode}
          setAlbumFetchTrigger={setAlbumFetchTrigger}
          setModalContent={setModalContent}
          setFocusedAlbum={setFocusedAlbum}
          isLoading={isSWRLoading}
          totalAlbums={totalAlbums}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
        />
        <Modal
          modalContent={modalContent}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          albumInfo={albumInfo}
          storefrontArray={storefrontArray}
          registeredAlbumIDs={registeredAlbumIDs}
          setAlbumFetchTrigger={setAlbumFetchTrigger}
          originalAlbumDataArray={[]}
          focusedAlbum={focusedAlbum}
        />
      </main>
      <KofiFloatingButtonReact
        username="anzumaru_software"
        background="#fcbf47"
        textColor="#323842"
        text="Support Us"
      />
    </div>
  );
}
