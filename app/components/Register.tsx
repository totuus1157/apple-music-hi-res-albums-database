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
} from "@nextui-org/react";

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

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  registeredAlbumIDs: string[];
};

export default function Register(props: Props): JSX.Element {
  const { isOpen, onOpen, onOpenChange, onClose, registeredAlbumIDs } = props;

  const [artist, setArtist] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [composer, setComposer] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [sampleRate, setSampleRate] = useState("96");
  const [errors, setErrors] = useState<Errors>({});

  const { user } = useUser();

  const onChangeLink = (e: TargetValue): void => {
    const inputLink = String(e.target.value);
    setLink(inputLink.trim());
    errors.link && setErrors({ ...errors, link: null });
  };

  const onChangeSampleRate = (e: TargetValue): void => {
    setSampleRate(e.target.value);
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

  function extractUniqueComposerNames(data: any): string[] {
    const composerNamesSet: Set<string> = new Set();

    data.data.forEach((album: any): void => {
      album.relationships.tracks.data.forEach((track: any): void => {
        composerNamesSet.add(track.attributes.composerName);
      });
    });

    return Array.from(composerNamesSet);
  }

  const convertArrayToDatabaseColumnString = (array: string[]) => {
    return `{${array
      .map((item) => {
        return `"${item.replace(/"/g, '\\"')}"`;
      })
      .join(", ")}}`;
  };

  const doAction = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    const newErrors = findFormErrors();
    const productId = albumId(link);
    const registrantId = user && user.sub;
    const countryCode = "us"; // Provisional measures

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else if (productId && registrantId) {
      const albumData = await makeApiRequestWithRetry(`/api/${productId}`);
      const ob = extractAlbumInfo(albumData);

      for (let item of ob) {
        const artist = item.artistName;
        const title = item.name;
        const genre = convertArrayToDatabaseColumnString(item.genreNames);
        const composer = convertArrayToDatabaseColumnString(item.composerName);

        try {
          const response = await fetch("/api/add-album", {
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

          const data = await response.json();
          if (response.ok) {
            handleClose();
          } else {
            console.log(`Error: ${data.error}`);
          }
        } catch (err: any) {
          console.log(`Error: ${err.message}`);
        }
      }
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

  const handleClose = (): void => {
    setArtist(null);
    setTitle(null);
    setGenre(null);
    setComposer(null);
    setLink(null);
    setSampleRate("96");
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
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
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
              <Button color="primary" onClick={doAction}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
