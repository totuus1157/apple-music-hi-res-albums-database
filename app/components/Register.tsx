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

export default function ModalWindow(props: {
  setShow: (arg0: boolean) => void;
  show: boolean;
}): JSX.Element {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [composer, setComposer] = useState("");
  const [link, setLink] = useState("");
  const [sampleRate, setSampleRate] = useState("96");
  const [checked, setChecked] = useState("96");

  console.log(artist, title, genre, composer, link, sampleRate, checked);

  type TargetValue = {
    target: {
      value: SetStateAction<string>;
    };
  };

  const onChangeArtist = (e: TargetValue): void => {
    setArtist(e.target.value);
  };
  const onChangeTitle = (e: TargetValue): void => {
    setTitle(e.target.value);
  };
  const onChangeGenre = (e: TargetValue): void => {
    setGenre(e.target.value);
  };
  const onChangeComposer = (e: TargetValue): void => {
    setComposer(e.target.value);
  };
  const onChangeLink = (e: TargetValue): void => {
    setLink(e.target.value);
  };
  const onChangeSampleRate = (e: TargetValue): void => {
    setSampleRate(e.target.value);
    setChecked(e.target.value);
  };

  const doAction = (_e: any): void => {
    const matches = link.match(/[1-9][0-9]*$/);
    const albumId = matches && matches[0];
    const normalizedURL = `https://music.apple.com/album/${albumId}`;

    console.log("albumId: ", albumId);
    console.log("normalizedURL: ", normalizedURL);

    let ob = {
      artist: artist,
      title: title,
      genre: genre,
      url: normalizedURL,
      sampleRate: sampleRate,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (composer !== "") ob.composer = composer;

    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(auth.currentUser.email!)
        .collection("albums")
        .doc(albumId)
        .set(ob)
        .then((): void => {
          setArtist("");
          setTitle("");
          setGenre("");
          setComposer("");
          setLink("");
          setSampleRate("96");
          setChecked("96");
          handleClose();
        });
    }
  };

  const handleClose = (): void => {
    return props.setShow(false);
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
              <Form.Control type="text" onChange={onChangeArtist} />
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" onChange={onChangeTitle} />
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Genre:</Form.Label>
              <Form.Control as="select" onChange={onChangeGenre}>
                <option hidden>-- Please select a genre --</option>
                {genreList.map((value) => (
                  <option key={value.id}>{value.genreName}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Composer:</Form.Label>
              <Form.Control
                type="text"
                onChange={onChangeComposer}
                disabled={genre !== "Classical" && true}
              />
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
              <Form.Control type="text" onChange={onChangeLink} />
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
