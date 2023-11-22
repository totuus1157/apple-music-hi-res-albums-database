import Button from "react-bootstrap/Button";

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type Props = {
  setShow: (arg0: boolean) => void;
  editing: boolean;
  setEditing: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  loginState: boolean;
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
    setShow,
    editing,
    setEditing,
    setModalContent,
    loginState,
    selectedItem,
    setSelectedItem,
  } = props;

  const handleShow = (): void => {
    setShow(true);
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
              disabled={!loginState}
              onClick={handleShow}
            >
              Add
            </Button>
          )}{" "}
          {!editing ? (
            <Button
              variant="dark"
              disabled={!loginState}
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
