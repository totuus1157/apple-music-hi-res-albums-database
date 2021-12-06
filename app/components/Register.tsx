import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
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

  const onChangeArtist = (e) => {
    setArtist(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeGenre = (e) => {
    setGenre(e.target.value);
  };
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };
  const onChangeSampleRate = (e) => {
    setSampleRate(e.target.value);
  };
  const onChangeComposer = (e) => {
    setComposer(e.target.value);
  };

  const doAction = (e) => {
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
        .add(ob)
        .then((ref) => {
          console.log("ref: ", ref);
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
              <Form.Control type="text" onChange={onChangeGenre} />
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Composer:</Form.Label>
              <Form.Control type="text" onChange={onChangeComposer} />
            </Form.Group>
            <Form.Group controlId="form-group">
              <Form.Label>Sample Rate:</Form.Label>
              <Form.Control type="text" onChange={onChangeSampleRate} />
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
