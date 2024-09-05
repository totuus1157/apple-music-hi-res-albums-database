import Register from "components/Register";
import Delete from "components/Delete";

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  registeredAlbumIDs: string[];
  setAlbumFetchTrigger: (arg0: number) => void;
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
    setAlbumFetchTrigger,
  } = props;

  if (modalContent === "register") {
    return (
      <Register
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        registeredAlbumIDs={registeredAlbumIDs}
        setAlbumFetchTrigger={setAlbumFetchTrigger}
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

  return <div />;
}
