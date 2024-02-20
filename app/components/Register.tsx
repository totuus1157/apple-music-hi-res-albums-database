import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "components/fire";
import { makeApiRequestWithRetry } from "components/apiRequest";
import sampleRateList from "components/sampleRateList";
import genreList from "components/genreList";
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

const db = firebase.firestore();
const auth = firebase.auth();

type Errors = {
  artist?: string | null;
  title?: string | null;
  genre?: string | null;
  composer?: string | null;
  link?: string | null;
};

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  registeredAlbumIDs: string[];
  uid: string;
};

export default function Register(props: Props): JSX.Element {
  const { isOpen, onOpen, onOpenChange, onClose, registeredAlbumIDs, uid } =
    props;

  const [artist, setArtist] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [composer, setComposer] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [sampleRate, setSampleRate] = useState("96");
  const [errors, setErrors] = useState<Errors>({});

  type TargetValue = {
    target: {
      value: any;
    };
  };

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
      const matches = link.match(/(?<digit>[1-9][0-9]+)(\?l=[\w]+)*$/);
      if (matches && matches.groups !== undefined) {
        return matches.groups.digit;
      }
    }
  };

  function extractUniqueComposerNames(data): string[] {
    const composerNamesSet: Set<string> = new Set();

    data.data.forEach((album) => {
      album.relationships.tracks.data.forEach((track) => {
        composerNamesSet.add(track.attributes.composerName);
      });
    });

    return Array.from(composerNamesSet);
  }

  const doAction = async (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    const newErrors = findFormErrors();
    const apiEndpoint = `/api/${albumId(link)}`;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const albumData = (await makeApiRequestWithRetry(apiEndpoint)).data[0];
      const ob = {
        artist: albumData.attributes.artistName,
        title: albumData.attributes.name,
        genre: albumData.attributes.genreNames,
        composer: extractUniqueComposerNames(
          await makeApiRequestWithRetry(apiEndpoint),
        ),
        albumId: albumId(link),
        sampleRate: sampleRate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: null,
      };

      console.log("ob: ", ob);

      /* if (auth.currentUser !== null) {
       *   db.collection("users")
       *     .doc(uid)
       *     .collection("albums")
       *     .doc(albumId(link))
       *     .set(ob)
       *     .then((): void => {
       *       handleClose();
       *     });
       * } */
    }
  };

  const findFormErrors = (): {} => {
    const newErrors: Errors = {};
    const regex = {
      appleMusicLink: new RegExp(
        /^https?:\/\/music\.apple\.com\/(?:[a-z]{2}\/)?album\/(?:[^\/]+\/)?([1-9][0-9]*)(?:\?l=\w+-\w+)?$/,
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
              <RadioGroup label="Sample Rate" defaultValue="96">
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
