import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const user = auth.currentUser;
const provider = new firebase.auth.OAuthProvider("apple.com");

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

  const doDelete = (): void => {
    const unsubscribe = auth.onAuthStateChanged((user): void => {
      if (user) {
        if (confirm("Are you sure you want to do this?")) {
          user
            .delete()
            .then((): void => {
              props.setLoginState(false);
              props.setShow(false);
              alert("Your account registration has been successfully deleted.");
            })
            .catch((error): void => {
              if (
                confirm(
                  `${error.message} Would you like to re-authenticate your account now?`
                )
              ) {
                user.reauthenticateWithRedirect(provider);
              } else {
                props.setShow(false);
              }
            });
        }
      }
      unsubscribe();
    });
  };

  const handleClose = (): void => props.setShow(false);

  return (
    <>
      <style jsx>{`
        span.link-button {
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
            <span className="link-button">
              <Button variant="link" onClick={doDelete}>
                click here.
              </Button>
            </span>
            <br />
            <span className="text-danger">
              Notice: Your registered album data will not be deleted.
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
