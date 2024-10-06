import { useState } from "react";
import { makeApiRequestWithRetry } from "components/apiRequest";
import extractAlbumInfo from "components/extractAlbumInfo";
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
  Spinner,
} from "@nextui-org/react";

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

type Errors = {
  artist?: string | null;
  title?: string | null;
  genre?: string | null;
  composer?: string | null;
  link?: string | null;
};

type TargetValue = {
  target: {
    value: any;
  };
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
  storefrontArray: Storefront[];
  registeredAlbumIDs: string[];
  setAlbumFetchTrigger: (arg0: number) => void;
};

export default function Register(props: Props): JSX.Element {
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
  const [albumDataArrayExceptUS, setAlbumDataArrayExceptUS] = useState<any[]>(
    [],
  );
  const [rowsForAlbumSelection, setRowsForAlbumSelection] = useState<
    FormatAlbumDisplay[]
  >([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [isFetchingNonUSStorefrontData, setIsFetchingNonUSStorefrontData] =
    useState(false);

  const { user } = useUser();

  const onChangeLink = (e: TargetValue): void => {
    const inputLink = String(e.target.value);
    setLink(inputLink.trim());
    errors.link && setErrors({ ...errors, link: null });
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
          const allAlbumData: any[] = [];
          for (const storefront of storefrontArray) {
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
              albumData: any,
              storefrontArray: Storefront[],
            ): FormatAlbumDisplay => {
              const key: string = albumData.storefront;
              const artist: string = albumData.data[0].attributes.artistName;
              const album: string = albumData.data[0].attributes.name;
              const genre: string = albumData.data[0].attributes.genreNames[0];
              const storefront: string =
                storefrontArray.find(
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
      } catch (err: any) {
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
    albumData: any,
    productId: string,
    registrantId: string,
    countryCode: string,
  ): Promise<void> => {
    const object = extractAlbumInfo(albumData);

    for (let item of object) {
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
            countryCode,
          }),
        });

        if (response.ok) {
          setAlbumFetchTrigger(Date.now());
          handleClose();
        } else {
          const data = await response.json();
          console.log(`Error: ${data.error}`);
        }
      } catch (err: any) {
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
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Adding a New Album</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                type="url"
                label="Link"
                labelPlacement="outside"
                placeholder="https://music.apple.com/jp/album/now-and-then-single/1713197371"
                isInvalid={errors.link ? true : false}
                errorMessage={errors.link}
                onChange={onChangeLink}
              />
              <RadioGroup
                label="Sample Rate"
                value={sampleRate}
                defaultValue="96"
                onValueChange={setSampleRate}
              >
                <Radio value="88.2">88.2</Radio>
                <Radio value="96">96</Radio>
                <Radio value="176.4">176.4</Radio>
                <Radio value="192">192</Radio>
              </RadioGroup>

              {isFetchingNonUSStorefrontData &&
                albumDataArrayExceptUS.length === 0 &&
                !apiError && (
                  <Spinner
                    label="Please wait while we try to retrieve the album data from other storefronts..."
                    color="warning"
                    labelColor="primary"
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
              <Button color="primary" onClick={handleSaveAlbum}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
