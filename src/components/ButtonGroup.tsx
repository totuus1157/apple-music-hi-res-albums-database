import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@heroui/react";
import type { SelectedItem } from "types/types";

type Props = {
  onOpen: () => void;
  isEditMode: boolean;
  setIsEditMode: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  selectedItem: SelectedItem;
  setSelectedItem: (arg0: SelectedItem) => void;
  isRandomMode: boolean;
  setIsRandomMode: (arg0: boolean) => void;
};

export default function ButtonGroup(props: Props): JSX.Element {
  const {
    onOpen,
    isEditMode,
    setIsEditMode,
    setModalContent,
    selectedItem,
    setSelectedItem,
    isRandomMode,
    setIsRandomMode,
  } = props;
  const { user } = useUser();

  const handleShow = (): void => {
    setModalContent("register");
    onOpen();
  };

  const handleAllAlbumsClick = (): void => {
    setIsRandomMode(false);
    setSelectedItem({
      artist: null,
      genre: null,
      composer: null,
      sampleRate: null,
    });
  };

  const handleRandomAlbumsClick = (): void => {
    setIsRandomMode(true);
  };

  const isSelectedItemNotEmpty = Object.values(selectedItem).some(
    (value): boolean => value !== null,
  );

  return (
    <div className="m-4 flex justify-between">
      <div className="px-2">
        {!isEditMode &&
          (isRandomMode || isSelectedItemNotEmpty ? (
            <Button color="success" onClick={handleAllAlbumsClick}>
              All Albums
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={handleRandomAlbumsClick}
            >
              Random Albums
            </Button>
          ))}
      </div>
      <div className="px-2">
        {!isEditMode && (
          <Button
            color="primary"
            isDisabled={!user && process.env.NODE_ENV === "production"}
            onClick={handleShow}
          >
            Add
          </Button>
        )}{" "}
        {!isEditMode ? (
          <Button
            color="default"
            isDisabled={!user && process.env.NODE_ENV === "production"}
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
