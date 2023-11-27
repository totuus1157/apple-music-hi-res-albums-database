import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "components/fire";
import sampleRateList from "components/sampleRateList";
import genreList from "components/genreList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
  setIsModalOpen: (arg0: boolean) => void;
  isModalOpen: boolean;
  registeredAlbum: string[];
  uid: string;
};

export default function Register(props: Props): JSX.Element {
  const { setIsModalOpen, isModalOpen, registeredAlbum, uid } = props;

  const [artist, setArtist] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [composer, setComposer] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [sampleRate, setSampleRate] = useState("96");
  const [checked, setChecked] = useState("96");
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
    setChecked(e.target.value);
  };

  const albumId = (link: string | null) => {
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
    else if (registeredAlbum.find((id) => id === albumId(link))) {
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
    setChecked("96");
    setErrors({});
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="form-group">
              <Form.Label>Artist:</Form.Label>
              <Form.Control
                type="text"
                onChange={onChangeArtist}
                isInvalid={errors.artist ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.artist}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                onChange={onChangeTitle}
                isInvalid={errors.title ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Genre:</Form.Label>
              <Form.Control
                as="select"
                onChange={onChangeGenre}
                isInvalid={errors.genre ? true : false}
              >
                <option hidden>-- Please select a genre --</option>
                {genreList.map((value) => (
                  <option key={value.id}>{value.genreName}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.genre}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Composer:</Form.Label>
              <Form.Control
                type="text"
                onChange={onChangeComposer}
                isInvalid={errors.composer ? true : false}
                disabled={genre !== "Classical"}
              />
              <Form.Control.Feedback type="invalid">
                {errors.composer}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Sample Rate:</Form.Label>
              {sampleRateList.map((value) => (
                <Form.Check
                  key={value.id}
                  label={value.sampleRate}
                  type="radio"
                  id={`radios${value.sampleRate}`}
                  name="sampleRate.value"
                  value={value.sampleRate}
                  onChange={onChangeSampleRate}
                  checked={checked === value.sampleRate}
                />
              ))}
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Link:</Form.Label>
              <Form.Control
                type="text"
                onChange={onChangeLink}
                isInvalid={errors.link ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.link}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={doAction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
