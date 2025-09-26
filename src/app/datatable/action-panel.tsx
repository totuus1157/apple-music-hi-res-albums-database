"use client";

import type { SelectedItem, SortMode } from "app/datatable/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, ButtonGroup, RadioGroup, Radio, Spacer } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faShuffle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  onOpen: () => void;
  isEditMode: boolean;
  setIsEditMode: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  selectedItem: SelectedItem;
  setSelectedItem: (arg0: SelectedItem) => void;
  sortMode: SortMode;
  setSortMode: (arg0: SortMode) => void;
};

export default function ActionPanel(props: Props) {
  const {
    onOpen,
    isEditMode,
    setIsEditMode,
    setModalContent,
    selectedItem,
    setSelectedItem,
    sortMode,
    setSortMode,
  } = props;
  const { user } = useUser();

  const handleShow = (): void => {
    setModalContent("register");
    onOpen();
  };

  const handleAllAlbumsClick = (): void => {
    setSelectedItem({
      artist: null,
      genre: null,
      composer: null,
      sampleRate: null,
    });
  };

  const isSelectedItemNotEmpty = Object.values(selectedItem).some(
    (value): boolean => value !== null,
  );

  return (
    <div className="m-4 flex justify-between">
      <div className="px-2">
        {!isEditMode && isSelectedItemNotEmpty ? (
          <Button color="success" onClick={handleAllAlbumsClick}>
            All Albums
          </Button>
        ) : (
          <ButtonGroup>
            <Button
              isIconOnly
              onClick={() => setSortMode("id_desc")}
              isDisabled={sortMode === "id_desc"}
            >
              {<FontAwesomeIcon icon={faArrowDownWideShort} size="xl" />}
            </Button>
            <Button
              isIconOnly
              onClick={() => setSortMode("likes_desc")}
              isDisabled={sortMode === "likes_desc"}
            >
              {<FontAwesomeIcon icon={faThumbsUp} size="xl" />}
            </Button>
            <Button
              isIconOnly
              onClick={() => setSortMode("random")}
              isDisabled={sortMode === "random"}
            >
              {<FontAwesomeIcon icon={faShuffle} size="xl" />}
            </Button>
          </ButtonGroup>
        )}
      </div>
      {!isEditMode ? (
        <div className="flex px-2">
          <Button
            color="primary"
            isDisabled={!user && process.env.NODE_ENV === "production"}
            onClick={handleShow}
          >
            Add
          </Button>
          <Spacer x={2} />
          <Button
            color="default"
            isDisabled={!user && process.env.NODE_ENV === "production"}
            onClick={(): void => setIsEditMode(true)}
          >
            Edit
          </Button>
        </div>
      ) : (
        <div className="flex px-2">
          <RadioGroup color="danger" defaultValue="delete" className="pt-2">
            <Radio value="delete">Delete</Radio>
          </RadioGroup>
          <Spacer x={4} />
          <Button
            color="default"
            variant="bordered"
            onClick={(): void => {
              setIsEditMode(false);
            }}
          >
            Exit
          </Button>
        </div>
      )}
    </div>
  );
}
