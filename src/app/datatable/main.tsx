"use client";

import type {
  AlbumData,
  SelectedItem,
  StorefrontsResponse,
} from "app/datatable/types";
import { useState, useEffect } from "react";
import Navbar from "app/datatable/navbar";
import ButtonGroup from "app/datatable/button-group";
import AlbumTable from "app/datatable/album-table";
import EditTable from "app/datatable/edit-table";
import Modal from "app/datatable/modal";
import { useDisclosure } from "@heroui/react";
import { KofiFloatingButtonReact } from "kofi-react-widget";

export default function Main() {
  const [storefrontArray, setStorefrontArray] = useState<StorefrontsResponse>({
    data: [],
  });
  const [albumDataArray, setAlbumDataArray] = useState<AlbumData[]>([]);
  const [originalAlbumDataArray, setOriginalAlbumDataArray] = useState<
    AlbumData[]
  >([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [albumFetchTrigger, setAlbumFetchTrigger] = useState(Date.now());
  const [albumInfo, setAlbumInfo] = useState("");
  const [registeredAlbumIDs, setRegisteredAlbumIDs] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    artist: null,
    genre: null,
    composer: null,
    sampleRate: null,
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect((): void => {
    const getStorefronts = async (): Promise<void> => {
      const response = await fetch("api/apple-music/get-storefronts");
      const result = await response.json();
      const storefronts: StorefrontsResponse = result;

      setStorefrontArray(storefronts);
    };

    getStorefronts();
  }, []);

  useEffect((): void => {
    const getAlbumDatabase = async (): Promise<void> => {
      const response = await fetch("/api/database/get-albums");
      const result = await response.json();
      const albums: AlbumData[] = result.albums.rows;

      setAlbumDataArray(albums);
      setOriginalAlbumDataArray(albums);
    };

    getAlbumDatabase();
  }, [albumFetchTrigger]);

  const selectRandomAlbums = (): void => {
    const shuffledAlbums = [...originalAlbumDataArray]
      .sort((): number => 0.5 - Math.random())
      .slice(0, 10);
    setAlbumDataArray(shuffledAlbums);
  };

  useEffect((): void => {
    if (isRandomMode) {
      selectRandomAlbums();
    } else {
      setAlbumDataArray(originalAlbumDataArray);
    }
  }, [isRandomMode]);

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
        {!isEditMode ? (
          <AlbumTable
            storefrontArray={storefrontArray}
            albumDataArray={albumDataArray}
            isOpen={isOpen}
            registeredAlbumIDs={registeredAlbumIDs}
            setRegisteredAlbumIDs={setRegisteredAlbumIDs}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isRandomMode={isRandomMode}
          />
        ) : (
          <EditTable
            albumDataArray={albumDataArray}
            isOpen={isOpen}
            onOpen={onOpen}
            setModalContent={setModalContent}
            albumInfo={albumInfo}
            setAlbumInfo={setAlbumInfo}
            setAlbumFetchTrigger={setAlbumFetchTrigger}
          />
        )}
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
          originalAlbumDataArray={originalAlbumDataArray}
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
