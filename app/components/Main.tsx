import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "components/fire";
import Navbar from "components/Navbar";
import ButtonGroup from "components/ButtonGroup";
import AlbumTable from "components/AlbumTable";
import EditTable from "components/EditTable";
import Modal from "components/Modal";
import { useDisclosure } from "@nextui-org/react";

export default function Main(): JSX.Element {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [albumInfo, setAlbumInfo] = useState("");
  const [registeredAlbumIDs, setRegisteredAlbumIDs] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState({
    artist: "",
    genre: "",
    composer: "",
    sampleRate: "",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <main>
      <Navbar setModalContent={setModalContent} onOpen={onOpen} />
      <ButtonGroup
        setModalContent={setModalContent}
        onOpen={onOpen}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      {isEditMode !== true ? (
        <AlbumTable
          isOpen={isOpen}
          registeredAlbumIDs={registeredAlbumIDs}
          setRegisteredAlbumIDs={setRegisteredAlbumIDs}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      ) : (
        <EditTable
          isOpen={isOpen}
          onOpen={onOpen}
          setModalContent={setModalContent}
          albumInfo={albumInfo}
          setAlbumInfo={setAlbumInfo}
        />
      )}
      <Modal
        modalContent={modalContent}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        albumInfo={albumInfo}
        registeredAlbumIDs={registeredAlbumIDs}
      />
    </main>
  );
}
