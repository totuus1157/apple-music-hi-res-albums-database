import Register from "./Register";
import Delete from "./Delete";
import Logout from "./Logout";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  registeredAlbum: string[];
  uid: string;
  setIsLoggedIn: (arg0: boolean) => void;
};

export default function ModalWindow(props: Props): JSX.Element {
  const {
    modalContent,
    albumInfo,
    isModalOpen,
    setIsModalOpen,
    registeredAlbum,
    uid,
    setIsLoggedIn,
  } = props;

  let content = <></>;
  if (modalContent === "register") {
    content = (
      <Register
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        uid={uid}
        registeredAlbum={registeredAlbum}
      />
    );
  } else if (modalContent === "delete") {
    content = (
      <Delete
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        albumInfo={albumInfo}
        uid={uid}
      />
    );
  } else if (modalContent === "logout") {
    content = (
      <Logout
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return content;
}
