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

type AlbumData = {
  id: string;
  product_id: string;
  title: string;
  artist: string;
  genre: string[];
  composer: string[];
  sample_rate: string;
  registrant_id: string;
  created_at: Date;
  updated_at: Date;
  country_code: string;
};

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

type AlbumElements = {
  artist?: string;
  genre?: string[];
  composer?: string[];
  sampleRate?: string;
};

type Props = {
  albumDataArray: AlbumData[];
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
  country_code: string;
};

export default function AlbumTable(props: Props): JSX.Element {
  const {
    albumDataArray,
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
  ): SelectionElements[] => {
    const elements = albumElementsList
      .flatMap((value) =>
        Array.isArray(value[_category]) ? value[_category] : [value[_category]],
      )
      .filter(Boolean);
    return Array.from(new Set(elements))
      .sort((a, b) => {
        if (_category === "sampleRate") {
          return parseFloat(a) - parseFloat(b);
        } else {
          return a.localeCompare(b);
        }
      })
      .map((uniqueElement, key): SelectionElements => {
        return { id: key + 1, element: uniqueElement as string };
      });
  };

  const filterAlbums = (
    albumDataArray: AlbumData[],
    artist?: string,
    genre?: string,
    composer?: string,
    sample_rate?: string,
  ): AlbumData[] => {
    return albumDataArray.filter((album): boolean => {
      const matchArtist = artist ? album.artist === artist : true;
      const matchGenre = genre ? album.genre.includes(genre) : true;
      const matchComposer = composer ? album.composer.includes(composer) : true;
      const matchSampleRate = sample_rate
        ? album.sample_rate === sample_rate
        : true;

      return matchArtist && matchGenre && matchComposer && matchSampleRate;
    });
  };

  useEffect((): void => {
    const fetchAlbumElements = (): void => {
      albumDataArray.forEach((doc: AlbumData): void => {
        let artistName: string = doc.artist;
        if (/^The /.test(artistName)) {
          artistName = artistName.replace(/^The /, "");
          namesDeletedThe.push(artistName);
        }
        albumElements.push({
          artist: artistName,
          genre: doc.genre,
          composer: doc.composer,
          sampleRate: doc.sample_rate,
        });
      });

      setAlbumElementsList(albumElements);
      setNonArticleNames(namesDeletedThe);
    };

    fetchAlbumElements();
  }, [albumDataArray]);

  useEffect((): void => {
    const fetchData = (): void => {
      let selectedArtistName = selectedItem.artist;
      if (nonArticleNames.includes(selectedArtistName)) {
        selectedArtistName = `The ${selectedArtistName}`;
      }

      const filteredAlbums = filterAlbums(
        albumDataArray,
        selectedArtistName,
        selectedItem.genre,
        selectedItem.composer,
        selectedItem.sampleRate,
      );

      filteredAlbums.forEach((doc: AlbumData): void => {
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
                href={`https://music.apple.com/${doc.country_code}/album/${doc.product_id}`}
                size="sm"
                underline="hover"
              >
                {doc.title} [{doc.country_code.toUpperCase()}]
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
  }, [albumDataArray, selectedItem]);

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
                selectionElements={selectionElements("sampleRate")}
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
