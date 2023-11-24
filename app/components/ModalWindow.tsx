import Register from "./Register";
import Delete from "./Delete";
import Logout from "./Logout";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isModalOpen: boolean;
  setShow: (arg0: boolean) => void;
  registeredAlbum: string[];
  uid: string;
  setIsLoggedIn: (arg0: boolean) => void;
};

export default function ModalWindow(props: Props): JSX.Element {
  const {
    modalContent,
    albumInfo,
    isModalOpen,
    setShow,
    registeredAlbum,
    uid,
    setIsLoggedIn,
  } = props;

  let content = <></>;
  if (modalContent === "register") {
    content = (
      <Register
        isModalOpen={isModalOpen}
        setShow={setShow}
        uid={uid}
        registeredAlbum={registeredAlbum}
      />
    );
  } else if (modalContent === "delete") {
    content = (
      <Delete
        isModalOpen={isModalOpen}
        setShow={setShow}
        albumInfo={albumInfo}
        uid={uid}
      />
    );
  } else if (modalContent === "logout") {
    content = (
      <Logout
        isModalOpen={isModalOpen}
        setShow={setShow}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return content;
}
