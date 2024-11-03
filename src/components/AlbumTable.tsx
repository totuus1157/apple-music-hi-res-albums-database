import { useState, useEffect } from "react";
import sampleRateList from "components/sampleRateList";
import Selector from "components/Selector";
import { summarizeAlbumData } from "components/albumFormatter";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Link,
  Spinner,
} from "@nextui-org/react";
import type { AlbumData, FormatAlbumForTable } from "types/types";

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
  storefrontArray: Storefront[];
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
  isRandomMode: boolean;
};

export default function AlbumTable(props: Props): JSX.Element {
  const {
    storefrontArray,
    albumDataArray,
    isOpen,
    registeredAlbumIDs,
    setRegisteredAlbumIDs,
    selectedItem,
    setSelectedItem,
    isRandomMode,
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

  const extractStorefrontNames = (countryCode: string): string => {
    const foundStorefront = storefrontArray.find((storefront): boolean => {
      return storefront.id === countryCode;
    });

    if (!foundStorefront) {
      return "Unknown";
    } else {
      return foundStorefront?.attributes.name;
    }
  };

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

    const filteredAlbums = albumElements.filter(
      (_album): boolean | undefined => {
        const matchesArtist = selectedItem.artist
          ? _album.artist?.includes(selectedItem.artist)
          : true;
        const matchesGenre = selectedItem.genre
          ? _album.genre?.includes(selectedItem.genre)
          : true;
        const matchesComposer = selectedItem.composer
          ? _album.composer?.includes(selectedItem.composer)
          : true;
        const matchesSampleRate = selectedItem.sampleRate
          ? _album.sampleRate?.includes(selectedItem.sampleRate)
          : true;

        return (
          matchesArtist && matchesGenre && matchesComposer && matchesSampleRate
        );
      },
    );

    setAlbumElementsList(filteredAlbums);
    setNonArticleNames(namesDeletedThe);
  };

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

    const formatAlbumForTable = summarizeAlbumData(filteredAlbums);

    formatAlbumForTable.forEach((doc): void => {
      tableRows.push(
        <TableRow key={doc.id}>
          <TableCell>{doc.artist}</TableCell>
          <TableCell>{doc.genre}</TableCell>
          <TableCell>{doc.composer}</TableCell>
          <TableCell>{doc.sample_rate}</TableCell>
          <TableCell>
            <Link
              isExternal
              href={`https://music.apple.com/${doc.country_code}/album/${doc.product_id}`}
              size="sm"
              underline="hover"
            >
              {doc.title}
            </Link>
          </TableCell>
          <TableCell>{extractStorefrontNames(doc.country_code)}</TableCell>
        </TableRow>,
      );
      albumIds.push(doc.product_id);
    });

    setData(tableRows);
    setRegisteredAlbumIDs(albumIds);
    setIsLoaded(true);
  };

  useEffect((): void => {
    fetchAlbumElements();
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
              {isRandomMode ||
              albumDataArray.length !== albumElementsList.length
                ? "Selected Albums: "
                : "All Albums: "}
              {albumElementsList.length}
            </caption>
          }
          classNames={{ td: "whitespace-pre-wrap" }}
        >
          <TableHeader>
            <TableColumn className={selectedItem.artist && "selected"}>
              <Selector
                displayName="Artist"
                propertyName="artist"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("artist")}
              />
            </TableColumn>
            <TableColumn className={selectedItem.genre && "selected"}>
              <Selector
                displayName="Genre"
                propertyName="genre"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("genre")}
              />
            </TableColumn>
            <TableColumn className={selectedItem.composer && "selected"}>
              <Selector
                displayName="Composer"
                propertyName="composer"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("composer")}
              />
            </TableColumn>
            <TableColumn className={selectedItem.sampleRate && "selected"}>
              <Selector
                displayName="Sample Rate"
                propertyName="sampleRate"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectionElements={selectionElements("sampleRate")}
              />
            </TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Storefront</TableColumn>
          </TableHeader>
          <TableBody>{data}</TableBody>
        </Table>
      ) : (
        <Spinner label="Loading..." className="ml-4" />
      )}
    </>
  );
}
