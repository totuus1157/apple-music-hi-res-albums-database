import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "./fire";
import NavLine from "./NavLine";
import ButtonSect from "./ButtonSect";
import Albums from "./Albums";
import EditTable from "./EditTable";
import ModalWindow from "./ModalWindow";

const auth = firebase.auth();

export default function Main(): JSX.Element {
  const [loginState, setLoginState] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
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
        setLoginState(true);
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
        <NavLine
          loginState={loginState}
          setLoginState={setLoginState}
          setModalContent={setModalContent}
          setShow={setShow}
        />
        <ButtonSect
          loginState={loginState}
          setModalContent={setModalContent}
          setShow={setShow}
          editing={editing}
          setEditing={setEditing}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        {editing !== true ? (
          <Albums
            show={show}
            registeredAlbum={registeredAlbum}
            setRegisteredAlbum={setRegisteredAlbum}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <EditTable
            show={show}
            setShow={setShow}
            setModalContent={setModalContent}
            albumInfo={albumInfo}
            setAlbumInfo={setAlbumInfo}
            uid={uid}
          />
        )}
        <ModalWindow
          modalContent={modalContent}
          show={show}
          setShow={setShow}
          albumInfo={albumInfo}
          registeredAlbum={registeredAlbum}
          uid={uid}
          setLoginState={setLoginState}
        />
      </main>
    </>
  );
}
