import Register from "components/Register";
import Delete from "components/Delete";

type Storefront = {
  id: string;
  type: string;
  href: string;
  attributes: {
    defaultLanguageTag: string;
    explicitContentPolicy: "allowed" | "opt-in" | "prohibited";
    name: string;
    supportedLanguageTags: string[];
  };
};

type Props = {
  modalContent: string | null;
  albumInfo: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  storefrontArray: Storefront[];
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
    storefrontArray,
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
        storefrontArray={storefrontArray}
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
