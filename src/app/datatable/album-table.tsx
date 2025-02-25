"use client";

import type {
  AlbumData,
  FormatAlbumForTable,
  Storefront,
  SelectedItem,
} from "app/datatable/types";
import { useState, useEffect, useMemo } from "react";
import { summarizeAlbumData } from "app/datatable/album-formatter";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Link,
  Progress,
  Autocomplete,
  AutocompleteItem,
  Pagination,
} from "@heroui/react";

type AlbumElements = {
  artist?: string;
  genre?: string[];
  composer?: string[];
  sampleRate?: string;
};

type SelectionElements = {
  id: number;
  element: string;
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

export default function AlbumTable(props: Props) {
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
  const [page, setPage] = useState(1);

  const rowsPerPage = 100;

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
    artist?: string | null,
    genre?: string | null,
    composer?: string | null,
    sample_rate?: string | null,
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
    if (selectedArtistName) {
      if (nonArticleNames.includes(selectedArtistName)) {
        selectedArtistName = `The ${selectedArtistName}`;
      }
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
          <TableCell>
            <Link
              isExternal
              href={`https://music.apple.com/${doc.storefront}/album/${doc.product_id}`}
              size="sm"
              underline="hover"
            >
              {doc.title}
            </Link>
          </TableCell>
          <TableCell>{doc.genre}</TableCell>
          <TableCell>{doc.composer}</TableCell>
          <TableCell>{doc.sample_rate}</TableCell>
          <TableCell>{extractStorefrontNames(doc.storefront)}</TableCell>
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

  const autocompleteConfigs: { key: keyof AlbumElements; label: string }[] = [
    { key: "artist", label: "Search an artist" },
    { key: "genre", label: "Search a genre" },
    { key: "composer", label: "Search a composer" },
    { key: "sampleRate", label: "Search a sample rate" },
  ];

  const topContent = (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {autocompleteConfigs.map(({ key, label }) => (
          <Autocomplete
            key={key}
            defaultItems={selectionElements(key)}
            label={label}
            selectedKey={selectedItem[key]}
            size="lg"
            variant="faded"
            onSelectionChange={(keyValue): void => {
              setSelectedItem({
                ...selectedItem,
                [key]: keyValue === null ? null : String(keyValue),
              });
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.element}>
                {item.element}
              </AutocompleteItem>
            )}
          </Autocomplete>
        ))}
      </div>
      <caption className="flex justify-start ml-4">
        {isRandomMode || albumDataArray.length !== albumElementsList.length
          ? "Selected Albums: "
          : "All Albums: "}
        {albumElementsList.length}
      </caption>
    </div>
  );

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const bottomContent = (
    <div className="flex w-full justify-center">
      <Pagination
        showControls
        showShadow
        page={page}
        total={pages}
        onChange={(page): void => setPage(page)}
      />
    </div>
  );

  return (
    <>
      {isLoaded ? (
        <Table
          isStriped
          shadow="none"
          topContent={topContent}
          bottomContent={bottomContent}
          classNames={{ td: "whitespace-pre-wrap" }}
        >
          <TableHeader>
            <TableColumn>Artist</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Genre</TableColumn>
            <TableColumn>Composer</TableColumn>
            <TableColumn>Sample Rate</TableColumn>
            <TableColumn>Storefront</TableColumn>
          </TableHeader>
          <TableBody>{items}</TableBody>
        </Table>
      ) : (
        <Progress
          label="Loading..."
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          classNames={{ label: "ml-6" }}
        />
      )}
    </>
  );
}
