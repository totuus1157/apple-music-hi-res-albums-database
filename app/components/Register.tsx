import { useState } from "react";
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
  setShow: (arg0: boolean) => any;
  show: boolean;
}): JSX.Element {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [url, setUrl] = useState("");
  const [sampleRate, setSampleRate] = useState("");
  const [composer, setComposer] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const [checked, setChecked] = useState("96");

  console.log(
    artist,
    title,
    genre,
    url,
    sampleRate,
    composer,
    albumId,
    checked
  );

  const onChangeArtist = (e) => {
    setArtist(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeGenre = (e) => {
    setGenre(e.target.value);
  };
  const onChangeSampleRate = (e) => {
    setSampleRate(e.target.value);
    setChecked(e.target.value);
  };
  const onChangeComposer = (e) => {
    setComposer(e.target.value);
  };
  const onChangeUrl = (e) => {
    const link = e.target.value;
    const str = link.match(/[1-9][0-9]*$/);
    setUrl(`https://music.apple.com/album/${str}`);
    setAlbumId(str[0]);
  };

  const doAction = () => {
    const ob = {
      artist: artist,
      title: title,
      genre: genre,
      url: url,
      sampleRate: sampleRate,
      composer: composer,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (auth.currentUser != null) {
      db.collection("users")
        .doc(auth.currentUser.email!)
        .collection("albums")
        .doc(albumId)
        .set(ob)
        .then((): void => {
          setArtist("");
          setTitle("");
          setGenre("");
          setUrl("");
          setSampleRate("");
          setComposer(null);
          setAlbumId("");
          setChecked("96");
          handleClose();
        });
    }
  };

  const handleClose = (): any => {
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
                {genreList.map((genre) => (
                  <option key={genre.id}>{genre.value}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Composer:</Form.Label>
              <Form.Control type="text" onChange={onChangeComposer} />
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Sample Rate:</Form.Label>
              {sampleRateList.map((sampleRate) => (
                <Form.Check
                  key={sampleRate.id}
                  label={sampleRate.value}
                  type="radio"
                  id={`radios${sampleRate.value}`}
                  name="sampleRate.value"
                  value={sampleRate.value}
                  onChange={onChangeSampleRate}
                  checked={checked === sampleRate.value}
                />
              ))}
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>URL:</Form.Label>
              <Form.Control type="text" onChange={onChangeUrl} />
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
