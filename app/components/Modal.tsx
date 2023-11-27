import Register from "components/Register";
import Delete from "components/Delete";
import Logout from "components/Logout";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  registeredAlbum: string[];
  uid: string;
  setIsLogin: (arg0: boolean) => void;
};

export default function Modal(props: Props): JSX.Element {
  const {
    modalContent,
    albumInfo,
    isModalOpen,
    setIsModalOpen,
    registeredAlbum,
    uid,
    setIsLogin,
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
        setIsLogin={setIsLogin}
      />
    );
  }

  return content;
}
