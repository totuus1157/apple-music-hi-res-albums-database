import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const db = firebase.firestore();
const auth = firebase.auth();

export default function Delete(props: {
  setShow: (arg0: boolean) => void;
  show: boolean;
  albumData: string;
}): JSX.Element {
  const albumDataArray = props.albumData.split(",");
  const [albumId, artist, title, genre, composer, sampleRate] = albumDataArray;

  const doAction = (): void => {
    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(auth.currentUser.email!)
        .collection("albums")
        .doc(albumId)
        .delete()
        .then(() => {
          handleClose();
        });
    }
  };

  const handleClose = (): void => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Deleting an album</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <tbody>
            <tr>
              <td>Artist</td>
              <td>{artist}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td>{genre}</td>
            </tr>
            <tr>
              <td>Composer</td>
              <td>{composer ? composer : "-"}</td>
            </tr>
            <tr>
              <td>SampleRate</td>
              <td>{sampleRate}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={doAction}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
