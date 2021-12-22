import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const db = firebase.firestore();
const auth = firebase.auth();

export default function Delete(props: {
  setShow: (arg0: boolean) => void;
  show: boolean;
  albumData: string;
}): JSX.Element {
  const doAction = (): void => {
    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(auth.currentUser.email!)
        .collection("albums")
        .doc(props.albumData)
        .delete()
        .then(() => {
          handleClose();
        });
    }
  };

  const handleClose = (): any => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Deleting an album</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        <p>Artist: {artist}</p>
        <p>Title: {title}</p>
        <p>Composer: {composer}</p>
      </Modal.Body> */}
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
