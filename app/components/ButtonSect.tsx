import Button from "react-bootstrap/Button";

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type Props = {
  setIsModalOpen: (arg0: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  isLogin: boolean;
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
    isEditMode,
    setIsEditMode,
    setModalContent,
    isLogin,
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
          {!isEditMode && (
            <Button variant="primary" disabled={!isLogin} onClick={handleShow}>
              Add
            </Button>
          )}{" "}
          {!isEditMode ? (
            <Button
              variant="dark"
              disabled={!isLogin}
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              onClick={() => {
                setIsEditMode(false);
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
