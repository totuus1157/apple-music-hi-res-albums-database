import { useState, useEffect } from "react";
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

type Album = {
  id: string;
  product_id: string;
  artist: string;
  genre: string[];
  composer: string[];
  sample_rate: string;
  title: string;
};

export default function AlbumTable(props: Props): JSX.Element {
  const {
    isOpen,
    registeredAlbumIDs,
    setRegisteredAlbumIDs,
    selectedItem,
    setSelectedItem,
  } = props;

  const tableRows: JSX.Element[] = [];
  const albumElements: AlbumElements[] = [];
  const albumIds: string[] = [];
  const namesDeletedThe: string[] = [];
  const [data, setData] = useState(tableRows);
  const [isLoaded, setIsLoaded] = useState(false);
  const [albumElementsList, setAlbumElementsList] = useState(albumElements);
  const [nonArticleNames, setNonArticleNames] = useState(namesDeletedThe);

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
    const fetchAlbumElements = async () => {
      const response = await fetch("/api/get-albums");
      const result = await response.json();
      const albums: Album[] = result.albums.rows;

      albums.forEach((doc: Album) => {
        let artistName: string = doc.artist;
        if (/^The /.test(artistName)) {
          artistName = artistName.replace(/^The /, "");
          namesDeletedThe.push(artistName);
        }
        albumElements.push({
          artist: artistName,
          genre: doc.genre.join(", "), // Assuming genre is an array
          composer: doc.composer.join(", "), // Assuming composer is an array
        });
      });

      setAlbumElementsList(albumElements);
      setNonArticleNames(namesDeletedThe);
    };

    fetchAlbumElements();
  }, [isOpen]);

  useEffect((): void => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();

      let selectedArtistName = selectedItem.artist;
      if (nonArticleNames.includes(selectedArtistName)) {
        selectedArtistName = `The ${selectedArtistName}`;
      }

      if (selectedArtistName) queryParams.append("artist", selectedArtistName);
      if (selectedItem.genre) queryParams.append("genre", selectedItem.genre);
      if (selectedItem.composer)
        queryParams.append("composer", selectedItem.composer);
      if (selectedItem.sampleRate)
        queryParams.append("sample_rate", selectedItem.sampleRate);

      const response = await fetch(`/api/get-albums?${queryParams.toString()}`);
      const result = await response.json();
      const albums: Album[] = result.albums.rows;

      console.log("albums: ", albums);

      albums.forEach((doc: Album) => {
        tableRows.push(
          <TableRow key={doc.id}>
            <TableCell>{doc.artist}</TableCell>
            <TableCell>
              <ul>
                {doc.genre.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <ul>
                {doc.composer.map((composer, index) => (
                  <li key={index}>{composer}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>{doc.sample_rate}</TableCell>
            <TableCell>
              <Link
                isExternal
                href={`https://music.apple.com/album/${doc.product_id}`}
                size="sm"
                underline="hover"
              >
                {doc.title}
              </Link>
            </TableCell>
          </TableRow>,
        );
        albumIds.push(doc.product_id);
      });

      setData(tableRows);
      setRegisteredAlbumIDs(albumIds);
      setIsLoaded(true);
    };

    fetchData();
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
