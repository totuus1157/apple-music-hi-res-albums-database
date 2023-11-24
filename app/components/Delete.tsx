import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const db = firebase.firestore();
const auth = firebase.auth();

type Props = {
  setShow: (arg0: boolean) => void;
  isModalOpen: boolean;
  albumInfo: string;
  uid: string;
};

export default function Delete(props: Props): JSX.Element {
  const { setShow, isModalOpen, albumInfo, uid } = props;

  const albumDataArray = albumInfo.split(",");
  const [albumId, artist, title, genre, composer, sampleRate] = albumDataArray;

  const doAction = (): void => {
    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(uid)
        .collection("albums")
        .doc(albumId)
        .delete()
        .then((): void => {
          handleClose();
        });
    }
  };

  const handleClose = (): void => setShow(false);

  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
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
