import { SetStateAction, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import sampleRateList from "./sampleRateList";
import genreList from "./genreList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const db = firebase.firestore();
const auth = firebase.auth();

export default function Register(props: {
  setShow: (arg0: boolean) => void;
  show: boolean;
  user: object;
}): JSX.Element {
  const [artist, setArtist] = useState(null);
  const [title, setTitle] = useState(null);
  const [genre, setGenre] = useState(null);
  const [composer, setComposer] = useState(null);
  const [link, setLink] = useState(null);
  const [sampleRate, setSampleRate] = useState("96");
  const [checked, setChecked] = useState("96");
  const [errors, setErrors] = useState({});

  const userId = props.user.uid;

  type TargetValue = {
    target: {
      value: SetStateAction<string>;
    };
  };

  const onChangeArtist = (e: TargetValue): void => {
    setArtist(e.target.value);
    errors.artist && setErrors({ ...errors, artist: null });
  };
  const onChangeTitle = (e: TargetValue): void => {
    setTitle(e.target.value);
    errors.title && setErrors({ ...errors, title: null });
  };
  const onChangeGenre = (e: TargetValue): void => {
    setGenre(e.target.value);
    errors.genre && setErrors({ ...errors, genre: null });
  };
  const onChangeComposer = (e: TargetValue): void => {
    e.target.value !== "" ? setComposer(e.target.value) : setComposer(null);
    errors.composer && setErrors({ ...errors, composer: null });
  };
  const onChangeLink = (e: TargetValue): void => {
    setLink(e.target.value);
    errors.link && setErrors({ ...errors, link: null });
  };
  const onChangeSampleRate = (e: TargetValue): void => {
    setSampleRate(e.target.value);
    setChecked(e.target.value);
  };

  const doAction = (_e: any): void => {
    _e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const matches = link.match(/(?<digit>[1-9][0-9]+)(\?l=[\w]+)*$/);
      const albumId = matches && matches.groups.digit;
      const normalizedURL = `https://music.apple.com/album/${albumId}`;

      let ob = {
        artist: artist,
        title: title,
        genre: genre,
        composer: composer,
        url: normalizedURL,
        sampleRate: sampleRate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: null,
      };

      if (auth.currentUser !== null) {
        db.collection("users")
          .doc(userId)
          .collection("albums")
          .doc(albumId)
          .set(ob)
          .then((): void => {
            handleClose();
          });
      }
    }
  };

  const findFormErrors = (): {} => {
    const newErrors = {};
    const regex = {
      ltnAndNum: new RegExp(/^[\p{Script=Latin}\p{Punctuation}\d\s]+$/, "u"),
      appleMusicLink: new RegExp(
        /^https:\/\/music\.apple\.com\/?[a-z]*\/album\/?[\w-]*\/?[\d]+(\?l=\w+)*$/
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
    else if (genre === "Classical" && !regex.ltnAndNum.test(composer))
      newErrors.composer = "only Latin letters can be used";
    if (!link || link === "") newErrors.link = "cannot be blank!";
    else if (!regex.appleMusicLink.test(link))
      newErrors.link = "only links to Apple Music albums can be allowed.";

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
    props.setShow(false);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
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
                isInvalid={errors.artist}
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
                isInvalid={errors.title}
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
                isInvalid={errors.genre}
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
                isInvalid={errors.composer}
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
                isInvalid={errors.link}
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
