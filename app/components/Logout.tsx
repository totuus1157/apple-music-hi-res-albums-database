import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();

export default function Logout(props: {
  show: boolean;
  setShow: (arg0: boolean) => void;
  setLoginState: (arg0: boolean) => void;
}): JSX.Element {
  const doAction = (): void => {
    auth.signOut();
    props.setLoginState(false);
    props.setShow(false);
  };

  const handleClose = (): void => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to execute?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="info" onClick={doAction}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
