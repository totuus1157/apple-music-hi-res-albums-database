import Register from "components/Register";
import Delete from "components/Delete";
import Logout from "components/Logout";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  registeredAlbumIDs: string[];
  uid: string;
  setIsLogin: (arg0: boolean) => void;
};

export default function Modal(props: Props): JSX.Element {
  const {
    modalContent,
    albumInfo,
    isOpen,
    onOpen,
    onOpenChange,
    onClose,
    registeredAlbumIDs,
    uid,
    setIsLogin,
  } = props;

  if (modalContent === "register") {
    return (
      <Register
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        registeredAlbumIDs={registeredAlbumIDs}
        uid={uid}
      />
    );
  }
  if (modalContent === "delete") {
    return (
      <Delete
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        albumInfo={albumInfo}
        uid={uid}
      />
    );
  }
  if (modalContent === "logout") {
    return (
      <Logout
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        setIsLogin={setIsLogin}
      />
    );
  }

  return <div />;
}
