import { useState, useEffect, SetStateAction } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "components/fire";
import sampleRateList from "components/sampleRateList";
import Selector from "components/Selector";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";

const db = firebase.firestore();

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type AlbumElements = {
  artist?: string;
  genre?: string;
  composer?: string;
  sampleRate?: string;
};

type Props = {
  isOpen: boolean;
  registeredAlbumIDs: string[];
  setRegisteredAlbumIDs: (arg0: string[]) => void;
  selectedItem: SelectedItem;
  setSelectedItem: {
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
  };
};

export default function AlbumTable(props: Props): JSX.Element {
  const {
    isOpen,
    registeredAlbumIDs,
    setRegisteredAlbumIDs,
    selectedItem,
    setSelectedItem,
  } = props;

  const tableRows: SetStateAction<any[]> = [];
  const albumElements: AlbumElements[] = [];
  const albumIds: string[] = [];
  const nonTheNames: string[] = [];
  const [data, setData] = useState(tableRows);
  const [isLoaded, setIsLoaded] = useState(false);
  const [albumElementsList, setAlbumElementsList] = useState(albumElements);
  const [nonArticleNames, setNonArticleNames] = useState(nonTheNames);

  type SelectionElements = {
    id: number;
    element?: string;
  };

  const selectionElements = (
    _category: keyof AlbumElements,
  ): SelectionElements[] =>
    Array.from(
      new Set(
        albumElementsList
          .map((value): string | undefined => value[_category])
          .filter(Boolean),
      ),
    )
      .sort()
      .map((uniqueElement, key): SelectionElements => {
        return { id: key + 1, element: uniqueElement };
      });

  useEffect((): void => {
    db.collectionGroup("albums")
      .get()
      .then((snapshot): void => {
        snapshot.forEach((document): void => {
          const doc = document.data();
          let artistName: string = doc.artist;
          if (/^The /.test(artistName)) {
            artistName = artistName.replace(/^The /, "");
            nonTheNames.push(artistName);
          }
          albumElements.push({
            artist: artistName,
            genre: doc.genre,
            composer: doc.composer,
          });
        });
        setAlbumElementsList(albumElements);
        setNonArticleNames(nonTheNames);
      });
  }, [isOpen]);

  useEffect((): void => {
    let selectedArtistName = selectedItem.artist;
    if (nonArticleNames.includes(selectedArtistName)) {
      selectedArtistName = `The ${selectedArtistName}`;
    }

    let albumsRef = db.collectionGroup("albums");
    selectedItem.artist &&
      (albumsRef = albumsRef.where("artist", "==", selectedArtistName));
    selectedItem.genre &&
      (albumsRef = albumsRef.where("genre", "==", selectedItem.genre));
    selectedItem.composer &&
      (albumsRef = albumsRef.where("composer", "==", selectedItem.composer));
    selectedItem.sampleRate &&
      (albumsRef = albumsRef.where(
        "sampleRate",
        "==",
        selectedItem.sampleRate,
      ));

    albumsRef.get().then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        tableRows.push(
          <TableRow key={document.id}>
            <TableCell>{doc.artist}</TableCell>
            <TableCell>{doc.genre}</TableCell>
            <TableCell>{doc.composer}</TableCell>
            <TableCell>{doc.sampleRate}</TableCell>
            <TableCell>
              <Link
                isExternal
                href={`https://music.apple.com/album/${doc.albumId}`}
                size="sm"
                underline="hover"
              >
                {doc.title}
              </Link>
            </TableCell>
          </TableRow>,
        );
        albumIds.push(doc.albumId);
      });
      setData(tableRows);
      setRegisteredAlbumIDs(albumIds);
      setIsLoaded(true);
    });
  }, [isOpen, selectedItem]);

  return (
    <>
      {isLoaded ? (
        <Table
          isStriped
          shadow="none"
          topContent={
            <caption className="flex justify-start ml-4">
              Total: {albumElementsList.length}
            </caption>
          }
        >
          <TableHeader>
            <TableColumn className={selectedItem.artist && "selected"}>
              <Selector
                name="Artist"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("artist")}
              />
            </TableColumn>
            <TableColumn className={selectedItem.genre && "selected"}>
              <Selector
                name="Genre"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("genre")}
              />
            </TableColumn>
            <TableColumn className={selectedItem.composer && "selected"}>
              <Selector
                name="Composer"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("composer")}
              />
            </TableColumn>
            <TableColumn className={selectedItem.sampleRate && "selected"}>
              <Selector
                name="Sample Rate"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={sampleRateList.map(
                  (value): SelectionElements => ({
                    id: value.id,
                    element: value.sampleRate,
                  }),
                )}
              />
            </TableColumn>
            <TableColumn>Title</TableColumn>
          </TableHeader>
          <TableBody>{data}</TableBody>
        </Table>
      ) : (
        <p>Now loading...</p>
      )}
    </>
  );
}
