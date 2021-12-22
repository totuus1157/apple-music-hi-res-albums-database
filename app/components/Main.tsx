import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
import Title from "./Title";
import ButtonSection from "./ButtonSection";
import Album from "./Album";
import EditTable from "./EditTable";
import ModalWindow from "./ModalWindow";

const auth = firebase.auth();

export default function Main(props: { title: string }): JSX.Element {
  const [loginState, setLoginState] = useState(false);
  const [modalDetail, setModalDetail] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [albumData, setAlbumData] = useState("");

  useEffect((): void => {
    console.log("Side Effect!");
    auth
      .getRedirectResult()
      .then((result: { credential: any }): void => {
        if (result.credential) {
          console.log("User", result.credential);
          const changeTrue = loginState === false ? true : true;
          setLoginState(changeTrue);
        }
      })
      .catch((_error: any): void => {
        console.log("not logined.");
      });
  }, [loginState]);

  return (
    <main>
      <Title
        title={props.title}
        loginState={loginState}
        setLoginState={setLoginState}
      />
      <ButtonSection
        loginState={loginState}
        setModalDetail={setModalDetail}
        setShow={setShow}
        setEditing={setEditing}
      />
      {editing === false ? (
        <Album show={show} />
      ) : (
        <EditTable
          show={show}
          setShow={setShow}
          setModalDetail={setModalDetail}
          albumData={albumData}
          setAlbumData={setAlbumData}
        />
      )}
      <ModalWindow
        modalDetail={modalDetail}
        show={show}
        setShow={setShow}
        albumData={albumData}
      />
    </main>
  );
}
