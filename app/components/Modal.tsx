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
  } = props;

  if (modalContent === "register") {
    return (
      <Register
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        registeredAlbumIDs={registeredAlbumIDs}
      />
    );
  }
  if (modalContent === "delete") {
    return (
      <Delete
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        albumInfo={albumInfo}
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
      />
    );
  }

  return <div />;
}
