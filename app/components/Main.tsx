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

const auth = firebase.auth();

export default function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [albumInfo, setAlbumInfo] = useState("");
  const [registeredAlbumIDs, setRegisteredAlbumIDs] = useState<string[]>([]);
  const [uid, setUid] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    artist: "",
    genre: "",
    composer: "",
    sampleRate: "",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  console.log("selectedItem: ", selectedItem);

  useEffect((): void => {
    auth
      .getRedirectResult()
      .then((result): void => {
        console.log("Main.result: ", result);
      })
      .catch((error): void => {
        console.log("Main.error: ", error);
      });

    auth.onAuthStateChanged((user): void => {
      console.log("Main.user: ", user);
      if (user) {
        setUid(user.uid);
        setIsLogin(true);
      }
    });
  }, []);

  return (
    <main>
      <Navbar setModalContent={setModalContent} onOpen={onOpen} />
      <ButtonGroup
        isLogin={isLogin}
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
          uid={uid}
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
        uid={uid}
        setIsLogin={setIsLogin}
      />
    </main>
  );
}
