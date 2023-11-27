import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "components/fire";
import Navbar from "components/Navbar";
import ButtonGroup from "components/ButtonGroup";
import Albums from "components/Albums";
import EditTable from "components/EditTable";
import Modal from "components/Modal";

const auth = firebase.auth();

export default function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [albumInfo, setAlbumInfo] = useState("");
  const [registeredAlbum, setRegisteredAlbum] = useState<string[]>([]);
  const [uid, setUid] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    artist: "",
    genre: "",
    composer: "",
    sampleRate: "",
  });

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
    <>
      <style jsx>{`
        main {
          height: 100%;
        }
      `}</style>

      <main>
        <Navbar
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
        />
        <ButtonGroup
          isLogin={isLogin}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        {isEditMode !== true ? (
          <Albums
            isModalOpen={isModalOpen}
            registeredAlbum={registeredAlbum}
            setRegisteredAlbum={setRegisteredAlbum}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <EditTable
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
            albumInfo={albumInfo}
            setAlbumInfo={setAlbumInfo}
            uid={uid}
          />
        )}
        <Modal
          modalContent={modalContent}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          albumInfo={albumInfo}
          registeredAlbum={registeredAlbum}
          uid={uid}
          setIsLogin={setIsLogin}
        />
      </main>
    </>
  );
}
