"use client";

import type {
  AlbumData,
  FormatAlbumForTable,
  SelectedItem,
  StorefrontsResponse,
} from "app/datatable/types";
import { useState, useEffect, useMemo } from "react";
import { summarizeAlbumData } from "app/datatable/album-formatter";
import { getErrorMessage } from "app/datatable/get-error-message";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Progress,
  Autocomplete,
  AutocompleteItem,
  Pagination,
  getKeyValue,
} from "@heroui/react";

type AlbumElements = {
  artist?: string;
  genre?: string[];
  composer?: string[];
  sampleRate?: string;
};

type SelectionElements = {
  element: string;
};

type RowData = Omit<FormatAlbumForTable, "id" | "storefront"> & {
  key: number;
  storefront_name: string;
  storefront_code: string;
  product_id: string;
  registrant_id: string;
};

type Props = {
  storefrontArray: StorefrontsResponse;
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
  isEditMode: boolean;
  setAlbumFetchTrigger: (arg0: number) => void;
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
    isEditMode,
    setAlbumFetchTrigger,
  } = props;

  const { user } = useUser();
  const userID = user?.sub || process.env.NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID;

  const albumElements: AlbumElements[] = [];
  const albumIds: string[] = [];
  const namesDeletedThe: string[] = [];
  const [rows, setRows] = useState<RowData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [albumElementsList, setAlbumElementsList] = useState(albumElements);
  const [nonArticleNames, setNonArticleNames] = useState(namesDeletedThe);
  const [page, setPage] = useState(1);

  const rowsPerPage = 50;

  const handleDelete = async (productId: string): Promise<void> => {
    if (!userID) {
      alert("You must be logged in to delete albums.");
      return;
    }

    if (!confirm("Are you sure you want to delete this album?")) {
      return;
    }

    try {
      const response = await fetch("/api/database/delete-album", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, registrantId: userID }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete the album");
      }

      setAlbumFetchTrigger(Date.now());
    } catch (err) {
      const errorMessage: string = getErrorMessage(err);
      alert(`Failed to delete the album: ${errorMessage}`);
    }
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
      .map((uniqueElement): SelectionElements => {
        return { element: uniqueElement as string };
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
    const foundStorefront = storefrontArray.data.find((storefront): boolean => {
      return storefront.id === countryCode;
    });

    if (!foundStorefront || !foundStorefront.attributes) {
      return "Unknown";
    } else {
      return foundStorefront.attributes.name;
    }
  };

  const fetchAlbumElements = (): void => {
    albumDataArray.forEach((doc: AlbumData): void => {
      let artistName: string = doc.artist;
      if (/^The /.test(artistName) && artistName !== "The Band") {
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

    let filteredAlbums = filterAlbums(
      albumDataArray,
      selectedArtistName,
      selectedItem.genre,
      selectedItem.composer,
      selectedItem.sampleRate,
    );

    if (isEditMode && userID) {
      filteredAlbums = filteredAlbums.filter(
        (album): boolean => album.registrant_id === userID,
      );
    }

    const formatAlbumForTable = summarizeAlbumData(filteredAlbums);

    const newRows = formatAlbumForTable.map(
      ({ id, storefront, product_id, registrant_id, ...rest }): RowData => ({
        ...rest,
        key: id,
        storefront_name: extractStorefrontNames(storefront),
        storefront_code: storefront,
        product_id,
        registrant_id,
      }),
    );

    const albumIds = formatAlbumForTable.map(
      (album): string => album.product_id,
    );

    setRows(newRows);
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
    <>
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
    </>
  );

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo((): RowData[] => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

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

  const columns = [
    { key: "artist", label: "Artist" },
    { key: "title", label: "Title" },
    { key: "genre", label: "Genre" },
    { key: "composer", label: "Composer" },
    { key: "sample_rate", label: "Sample Rate" },
    { key: "storefront_name", label: "Storefront" },
  ];

  return (
    <>
      {isLoaded ? (
        <Table
          shadow="none"
          topContent={topContent}
          bottomContent={bottomContent}
          selectionMode="single"
          onRowAction={(key): void => {
            const album = rows.find((row): boolean => row.key === Number(key));
            if (!album) return;

            if (isEditMode && album.registrant_id === userID) {
              handleDelete(album.product_id);
            } else {
              window.open(
                `https://music.apple.com/${album.storefront_code}/album/${album.product_id}`,
                "_blank",
              );
            }
          }}
          className="max-md:mb-16"
          classNames={{ td: "whitespace-pre-wrap" }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
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
