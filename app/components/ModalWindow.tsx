import Register from "./Register";
import Delete from "./Delete";
import Logout from "./Logout";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  show: boolean;
  setShow: (arg0: boolean) => void;
  registeredAlbum: string[];
  uid: string;
  setLoginState: (arg0: boolean) => void;
};

export default function ModalWindow(props: Props): JSX.Element {
  const {
    modalContent,
    albumInfo,
    show,
    setShow,
    registeredAlbum,
    uid,
    setLoginState,
  } = props;

  let content = <></>;
  if (modalContent === "register") {
    content = (
      <Register
        show={show}
        setShow={setShow}
        uid={uid}
        registeredAlbum={registeredAlbum}
      />
    );
  } else if (modalContent === "delete") {
    content = (
      <Delete show={show} setShow={setShow} albumInfo={albumInfo} uid={uid} />
    );
  } else if (modalContent === "logout") {
    content = (
      <Logout show={show} setShow={setShow} setLoginState={setLoginState} />
    );
  }

  return content;
}
