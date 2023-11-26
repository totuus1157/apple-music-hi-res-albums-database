import Button from "react-bootstrap/Button";

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type Props = {
  setIsModalOpen: (arg0: boolean) => void;
  editing: boolean;
  setEditing: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  isLoggedIn: boolean;
  selectedItem: SelectedItem;
  setSelectedItem: {
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
  };
};

export default function ButtonSect(props: Props): JSX.Element {
  const {
    setIsModalOpen,
    editing,
    setEditing,
    setModalContent,
    isLoggedIn,
    selectedItem,
    setSelectedItem,
  } = props;

  const handleShow = (): void => {
    setIsModalOpen(true);
    setModalContent("register");
  };

  return (
    <>
      <style jsx>{`
        .parent {
          margin: 10px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>

      <div className="parent">
        <div>
          <Button
            variant="success"
            disabled={
              !selectedItem.artist &&
              !selectedItem.genre &&
              !selectedItem.composer &&
              !selectedItem.sampleRate
            }
            onClick={() =>
              setSelectedItem({
                artist: "",
                genre: "",
                composer: "",
                sampleRate: "",
              })
            }
          >
            All Items
          </Button>
        </div>
        <div>
          {!editing && (
            <Button
              variant="primary"
              disabled={!isLoggedIn}
              onClick={handleShow}
            >
              Add
            </Button>
          )}{" "}
          {!editing ? (
            <Button
              variant="dark"
              disabled={!isLoggedIn}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              onClick={() => {
                setEditing(false);
              }}
            >
              Exit
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
