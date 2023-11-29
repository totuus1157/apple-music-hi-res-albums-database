import Register from "components/Register";
import Delete from "components/Delete";
import Logout from "components/Logout";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  registeredAlbumIDs: string[];
  uid: string;
  setIsLogin: (arg0: boolean) => void;
};

export default function Modal(props: Props): JSX.Element {
  const {
    modalContent,
    albumInfo,
    isModalOpen,
    setIsModalOpen,
    registeredAlbumIDs,
    uid,
    setIsLogin,
  } = props;

  if (modalContent === "register") {
    return (
      <Register
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        uid={uid}
        registeredAlbumIDs={registeredAlbumIDs}
      />
    );
  }
  if (modalContent === "delete") {
    return (
      <Delete
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        albumInfo={albumInfo}
        uid={uid}
      />
    );
  }
  if (modalContent === "logout") {
    return (
      <Logout
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsLogin={setIsLogin}
      />
    );
  }

  return <div />;
}
