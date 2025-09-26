"use client";

import type {
  SelectedItem,
  FocusedAlbum,
  SortMode,
  StorefrontsResponse,
} from "app/datatable/types";
import { useState, useEffect } from "react";
import Navbar from "app/datatable/navbar";
import ActionPanel from "app/datatable/action-panel";
import AlbumTable from "app/datatable/album-table";
import Modal from "app/datatable/modal";
import { useDisclosure } from "@heroui/react";
import { KofiFloatingButtonReact } from "kofi-react-widget";
import useSWR from "swr";
import { useUser } from "@auth0/nextjs-auth0/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Main() {
  const [storefrontArray, setStorefrontArray] = useState<StorefrontsResponse>({
    data: [],
  });
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("id_desc");
  const [albumFetchTrigger, setAlbumFetchTrigger] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState("");
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

  const { user } = useUser();
  const userID = user?.sub || process.env.NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID;

  const rowsPerPage = 50;

  const { data, isLoading: isSWRLoading } = useSWR(
    `/api/database/get-albums?page=${page}&limit=${rowsPerPage}&filters=${encodeURIComponent(JSON.stringify(selectedItem))}&sort=${sortMode}&t=${albumFetchTrigger}`,
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
        <ActionPanel
          setModalContent={setModalContent}
          onOpen={onOpen}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          sortMode={sortMode}
          setSortMode={setSortMode}
        />
        <AlbumTable
          storefrontArray={storefrontArray}
          albumDataArray={albumDataArray}
          isOpen={isOpen}
          onOpen={onOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          sortMode={sortMode}
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
          setAlbumFetchTrigger={setAlbumFetchTrigger}
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
