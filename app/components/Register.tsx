import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "components/fire";
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

  const onChangeArtist = (e: TargetValue): void => {
    const inputArtist = String(e.target.value);
    setArtist(inputArtist.trim());
    errors.artist && setErrors({ ...errors, artist: null });
  };
  const onChangeTitle = (e: TargetValue): void => {
    const inputTitle = String(e.target.value);
    setTitle(inputTitle.trim());
    errors.title && setErrors({ ...errors, title: null });
  };
  const onChangeGenre = (e: TargetValue): void => {
    setGenre(e.target.value);
    errors.genre && setErrors({ ...errors, genre: null });
  };
  const onChangeComposer = (e: TargetValue): void => {
    const inputComposer = String(e.target.value);
    inputComposer !== ""
      ? setComposer(inputComposer.trim())
      : setComposer(null);
    errors.composer && setErrors({ ...errors, composer: null });
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

  const doAction = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const ob = {
        artist: artist,
        title: title,
        genre: genre,
        composer: composer,
        albumId: albumId(link),
        sampleRate: sampleRate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: null,
      };

      if (auth.currentUser !== null) {
        db.collection("users")
          .doc(uid)
          .collection("albums")
          .doc(albumId(link))
          .set(ob)
          .then((): void => {
            handleClose();
          });
      }
    }
  };

  const findFormErrors = (): {} => {
    const newErrors: Errors = {};
    const regex = {
      ltnAndNum: new RegExp(
        /^[\p{Script=Latin}\p{Punctuation}\p{Symbol}\d\s]+$/,
        "u",
      ),
      appleMusicLink: new RegExp(
        /^https:\/\/music\.apple\.com\/?[a-z]*\/album\/?[\w-%]*\/?[\d]+(\?l=\w+)*$/,
      ),
    };

    if (!artist || artist === "") newErrors.artist = "cannot be blank!";
    else if (!regex.ltnAndNum.test(artist))
      newErrors.artist = "only Latin letters be used";
    if (!title || title === "") newErrors.title = "cannot be blank!";
    else if (!regex.ltnAndNum.test(title))
      newErrors.title = "only Latin letters be used";
    if (!genre || genre === "") newErrors.genre = "select a genre!";
    /* if (genre == "Classical") */ // The following code does not work if you use the IF nesting structure
    if (genre === "Classical" && (!composer || composer === ""))
      newErrors.composer = "cannot be blank!";
    else if (
      genre === "Classical" &&
      composer !== null &&
      !regex.ltnAndNum.test(composer)
    )
      newErrors.composer = "only Latin letters can be used";
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
                type="text"
                label="Artist"
                isInvalid={errors.artist ? true : false}
                errorMessage={errors.artist}
                onChange={onChangeArtist}
              />
              <Input
                isRequired
                type="text"
                label="Title"
                isInvalid={errors.title ? true : false}
                errorMessage={errors.title}
                onChange={onChangeTitle}
              />
              <Input
                isRequired
                type="text"
                label="Genre"
                isInvalid={errors.genre ? true : false}
                errorMessage={errors.genre}
                onChange={onChangeGenre}
              />
              <Input
                isRequired
                type="text"
                label="Composer"
                isInvalid={errors.composer ? true : false}
                errorMessage={errors.composer}
                onChange={onChangeComposer}
              />
              <RadioGroup label="Sample Rate" defaultValue="96">
                <Radio value="88.2">88.2</Radio>
                <Radio value="96">96</Radio>
                <Radio value="176.4">176.4</Radio>
                <Radio value="192">192</Radio>
              </RadioGroup>
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
function setChecked(value: any) {
  throw new Error("Function not implemented.");
}
