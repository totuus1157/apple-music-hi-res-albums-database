"use client";

import type { StorefrontsResponse } from "app/datatable/types";
import React, { useState, useEffect } from "react";
import { makeApiRequestWithRetry } from "app/datatable/api-request";
import extractAlbumInfo from "app/datatable/extract-album-info";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  RadioGroup,
  Radio,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Spacer,
  Spinner,
  Switch,
} from "@heroui/react";

type Errors = {
  artist?: string | null;
  title?: string | null;
  genre?: string | null;
  composer?: string | null;
  link?: string | null;
};

type FormatAlbumDisplay = {
  key: string;
  artist: string;
  album: string;
  genre: string;
  storefront: string;
};

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  storefrontArray: StorefrontsResponse;
  registeredAlbumIDs: string[];
  setAlbumFetchTrigger: (arg0: number) => void;
};

function usePersistentState<T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  });

  useEffect((): void => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function Register(props: Props) {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose,
    storefrontArray,
    registeredAlbumIDs,
    setAlbumFetchTrigger,
  } = props;

  const [link, setLink] = useState<string | null>(null);
  const [sampleRate, setSampleRate] = useState("96");
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [albumDataArrayExceptUS, setAlbumDataArrayExceptUS] = useState([]);
  const [rowsForAlbumSelection, setRowsForAlbumSelection] = useState<
    FormatAlbumDisplay[]
  >([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [isFetchingNonUSStorefrontData, setIsFetchingNonUSStorefrontData] =
    useState(false);
  const [isTweetEnabled, setTweetEnabled] = usePersistentState<boolean>(
    "isTweetEnabled",
    false,
  );

  const handleToggle = (): void => setTweetEnabled((prev): boolean => !prev);

  const { user } = useUser();

  const onChangeLink = (e): void => {
    const inputLink = String(e.target.value);
    setLink(inputLink.trim());
    if (errors.link) {
      setErrors({ ...errors, link: null });
    }
  };

  const albumId = (link: string | null): string | undefined => {
    if (link) {
      const matches = link.match(
        /^https?:\/\/music\.apple\.com\/(?:[a-z]{2}\/)?album\/(?:[^\/]+\/)?([0-9]+)(?:\?l=\w+-\w+)?$/,
      );
      if (matches) {
        return matches[1];
      }
    }
  };

  const doAction = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    setApiError(null);
    const newErrors = findFormErrors();
    const productId = albumId(link);
    const registrantId = user
      ? user.sub
      : process.env.NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else if (productId && registrantId) {
      try {
        // First get the album data from US storefront
        const usAlbumData = await makeApiRequestWithRetry("us", productId);
        if (usAlbumData) {
          // If data for US storefronts is available, it will be registered in database
          await saveAlbumToDatabase(usAlbumData, productId, registrantId, "us");
        } else {
          // If US storefront data retrieval fails, set fetching flag to true
          setIsFetchingNonUSStorefrontData(true);

          // If it fails in US storefront, get it in another storefront
          const allAlbumData = [];
          for (const storefront of storefrontArray.data) {
            if (storefront.id !== "us") {
              const otherAlbumData = await makeApiRequestWithRetry(
                storefront.id,
                productId,
              );
              if (otherAlbumData) {
                allAlbumData.push({
                  ...otherAlbumData,
                  storefront: storefront.id,
                });
              }
            }
          }
          if (allAlbumData.length > 0) {
            setAlbumDataArrayExceptUS(allAlbumData); // Set the data for other storefronts

            const formatAlbumDisplay = (
              albumData,
              storefrontArray: StorefrontsResponse,
            ): FormatAlbumDisplay => {
              const key: string = albumData.storefront;
              const artist: string = albumData.data[0].attributes.artistName;
              const album: string = albumData.data[0].attributes.name;
              const genre: string =
                albumData.data[0].attributes.genreNames.join("\n");
              const storefront: string =
                storefrontArray.data.find(
                  (storefront): boolean =>
                    storefront.id === albumData.storefront,
                )?.attributes.name || "Unknown";

              return { key, artist, album, genre, storefront };
            };

            setRowsForAlbumSelection(
              allAlbumData.map((albumData): FormatAlbumDisplay => {
                return formatAlbumDisplay(albumData, storefrontArray);
              }),
            );
          }
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
        setApiError("Failed to fetch album data.");
      }
    }
  };

  const convertArrayToDatabaseColumnString = (array: string[]): string => {
    return `{${array
      .map((item): string => {
        return `"${item.replace(/"/g, '\\"')}"`;
      })
      .join(", ")}}`;
  };

  const saveAlbumToDatabase = async (
    albumData,
    productId: string,
    registrantId: string,
    storefront: string,
  ): Promise<void> => {
    const object = extractAlbumInfo(albumData);

    for (const item of object) {
      const artist = item.artistName;
      const title = item.name;
      const genre = convertArrayToDatabaseColumnString(item.genreNames);
      const composer = convertArrayToDatabaseColumnString(item.composerName);

      try {
        const response = await fetch("/api/database/add-album", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            artist,
            title,
            genre,
            composer,
            productId,
            sampleRate,
            registrantId,
            storefront,
          }),
        });

        if (response.ok) {
          setAlbumFetchTrigger(Date.now());
          handleClose();

          if (isTweetEnabled) {
            const tweetContent = `Registered "${title}" by '${artist}'!\n\nhttps://applemusichiresalbumsdb.com\n\n#ApplemusichiresalbumsDB\n#AppleMusic\n#HiRes`;
            try {
              const tweetResponse = await fetch("/api/twitter/tweet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tweetContent }),
              });
              if (!tweetResponse.ok) {
                console.error("Failed to post tweet");
              }
            } catch (tweetError) {
              console.error("Error posting tweet", tweetError);
            }
          }
        } else {
          const data = await response.json();
          console.log(`Error: ${data.error}`);
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleSaveAlbum = async (): Promise<void> => {
    const selectedStorefrontKey = Array.from(selectedKeys)[0];
    const selectedAlbum = albumDataArrayExceptUS.find(
      (album): boolean => album.storefront === selectedStorefrontKey,
    );

    if (selectedAlbum) {
      const productId = albumId(link);
      const registrantId = user
        ? user.sub
        : process.env.NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID;
      const storefront: string = selectedAlbum.storefront;

      if (productId && registrantId && storefront) {
        await saveAlbumToDatabase(
          selectedAlbum,
          productId,
          registrantId,
          storefront,
        );
      }
    } else {
      await doAction({ preventDefault: (): void => {} });
    }
  };

  const findFormErrors = (): Errors => {
    const newErrors: Errors = {};
    const regex = {
      appleMusicLink: new RegExp(
        /^https?:\/\/music\.apple\.com\/(?:[a-z]{2}\/)?album\/(?:[^\/]+\/)?([0-9]+)(?:\?l=\w+-\w+)?$/,
      ),
    };

    if (!link || link === "") newErrors.link = "cannot be blank!";
    else if (!regex.appleMusicLink.test(link))
      newErrors.link = "only links to Apple Music albums can be allowed.";
    else if (registeredAlbumIDs.find((id): boolean => id === albumId(link))) {
      newErrors.link = "This album is already registered";
    }

    return newErrors;
  };

  const columnsForAlbumSelection = [
    { key: "artist", label: "Artist" },
    { key: "album", label: "Album" },
    { key: "genre", label: "Genre" },
    { key: "storefront", label: "Storefront" },
  ];

  const handleClose = (): void => {
    setLink(null);
    setSampleRate("96");
    setErrors({});
    setApiError(null);
    setAlbumDataArrayExceptUS([]);
    setRowsForAlbumSelection([]);
    setSelectedKeys(new Set([""]));
    setIsFetchingNonUSStorefrontData(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      onClose={handleClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Adding a New Album</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                size="lg"
                type="url"
                label="Link"
                labelPlacement="outside"
                placeholder="https://music.apple.com/jp/album/now-and-then-single/1713197371"
                isInvalid={errors.link ? true : false}
                errorMessage={errors.link}
                onChange={onChangeLink}
              />

              <RadioGroup
                label="Sample Rate (kHz)"
                value={sampleRate}
                defaultValue="96"
                onValueChange={setSampleRate}
              >
                <Radio value="88.2">88.2</Radio>
                <Radio value="96">96</Radio>
                <Radio value="176.4">176.4</Radio>
                <Radio value="192">192</Radio>
              </RadioGroup>

              <Spacer />

              {process.env.NODE_ENV === "development" && (
                <Switch
                  size="sm"
                  isSelected={isTweetEnabled}
                  onValueChange={handleToggle}
                >
                  Post registered album on X (ex-Twitter)
                </Switch>
              )}

              {isFetchingNonUSStorefrontData &&
                albumDataArrayExceptUS.length === 0 &&
                !apiError && (
                  <Spinner
                    label="Please wait while we try to retrieve the album data from other storefronts..."
                    color="warning"
                    labelColor="secondary"
                  />
                )}

              {isFetchingNonUSStorefrontData &&
                albumDataArrayExceptUS.length > 0 &&
                !apiError && (
                  <p className="text-blue-500 text-center mt-4">
                    Please select one of the available storefronts below and
                    press the &quot;Save&quot; button to register the album.
                  </p>
                )}

              {albumDataArrayExceptUS.length > 0 && !apiError && (
                <Table
                  hideHeader
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys): void => {
                    setSelectedKeys(keys as Set<string>);
                  }}
                  classNames={{ td: "whitespace-pre-wrap" }}
                >
                  <TableHeader columns={columnsForAlbumSelection}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={rowsForAlbumSelection}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}

              {apiError && <p className="text-red-500">{apiError}</p>}
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
              <Button
                color="primary"
                onClick={handleSaveAlbum}
                isDisabled={
                  isFetchingNonUSStorefrontData &&
                  albumDataArrayExceptUS.length === 0 &&
                  !apiError
                }
              >
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
