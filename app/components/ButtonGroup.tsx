import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@nextui-org/react";

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type Props = {
  onOpen: () => void;
  isEditMode: boolean;
  setIsEditMode: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  selectedItem: SelectedItem;
  setSelectedItem: {
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
  };
};

export default function ButtonGroup(props: Props): JSX.Element {
  const {
    onOpen,
    isEditMode,
    setIsEditMode,
    setModalContent,
    selectedItem,
    setSelectedItem,
  } = props;
  const { user, error, isLoading } = useUser();

  const handleShow = (): void => {
    setModalContent("register");
    onOpen();
  };

  return (
    <div className="m-4 flex justify-between">
      <div>
        <Button
          color="success"
          isDisabled={
            !selectedItem.artist &&
            !selectedItem.genre &&
            !selectedItem.composer &&
            !selectedItem.sampleRate
          }
          onClick={(): void =>
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
          <Button color="primary" isDisabled={!user} onClick={handleShow}>
            Add
          </Button>
        )}{" "}
        {!isEditMode ? (
          <Button
            color="default"
            isDisabled={!user}
            onClick={(): void => setIsEditMode(true)}
          >
            Edit
          </Button>
        ) : (
          <Button
            color="default"
            variant="bordered"
            onClick={(): void => {
              setIsEditMode(false);
            }}
          >
            Exit
          </Button>
        )}
      </div>
    </div>
  );
}
