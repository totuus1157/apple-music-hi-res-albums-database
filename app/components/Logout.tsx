import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const user = auth.currentUser;

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

  const doDelete = () => {
    if (user) {
      user
        .delete()
        .then(() => {
          props.setLoginState(false);
          props.setShow(false);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  const handleClose = (): void => props.setShow(false);

  return (
    <>
      <style jsx>{`
        span.linkButton {
          position: relative;
          bottom: 2px;
          right: 5px;
        }
      `}</style>

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you want to execute{user !== null && `, ${user.displayName}`}?
          </p>
          <Card body>
            To delete your account registration,
            <span className="linkButton">
              <Button variant="link" onClick={doDelete}>
                click here.
              </Button>
            </span>
            <br />
            <span className="text-danger">
              Your registered album data will not be deleted.
            </span>
          </Card>
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
    </>
  );
}
