import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
import Title from "./Title";
import ButtonSection from "./ButtonSection";
import Albums from "./Albums";
import EditTable from "./EditTable";
import ModalWindow from "./ModalWindow";

const auth = firebase.auth();

export default function Main(props: { title: string }): JSX.Element {
  const [loginState, setLoginState] = useState(false);
  const [modalDetail, setModalDetail] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [albumInfo, setAlbumInfo] = useState("");
  const [user, setUser] = useState({});

  useEffect((): void => {
    auth
      .getRedirectResult()
      .then((result): void => {
        if (result.user) {
          setUser(result.user);
        }
        const changeTrue = loginState === false ? true : true;
        setLoginState(changeTrue);
      })
      .catch((): void => {
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
        editing={editing}
        setEditing={setEditing}
      />
      {editing === false ? (
        <Albums show={show} />
      ) : (
        <EditTable
          show={show}
          setShow={setShow}
          setModalDetail={setModalDetail}
          albumInfo={albumInfo}
          setAlbumInfo={setAlbumInfo}
        />
      )}
      <ModalWindow
        modalDetail={modalDetail}
        show={show}
        setShow={setShow}
        albumInfo={albumInfo}
        user={user}
      />
    </main>
  );
}
