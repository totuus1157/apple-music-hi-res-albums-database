import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./fire";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const user = auth.currentUser;
const provider = new firebase.auth.OAuthProvider("apple.com");

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  setIsLogin: (arg0: boolean) => void;
};

export default function Logout(props: Props): JSX.Element {
  const { isModalOpen, setIsModalOpen, setIsLogin } = props;

  const doAction = (): void => {
    auth.signOut();
    setIsLogin(false);
    setIsModalOpen(false);
  };

  const doDelete = (): void => {
    const unsubscribe = auth.onAuthStateChanged((user): void => {
      if (user) {
        if (confirm("Are you sure you want to do this?")) {
          user
            .delete()
            .then((): void => {
              setIsLogin(false);
              setIsModalOpen(false);
              alert("Your account registration has been successfully deleted.");
            })
            .catch((error): void => {
              if (
                confirm(
                  `${error.message} Would you like to re-authenticate your account now?`,
                )
              ) {
                user.reauthenticateWithRedirect(provider);
              } else {
                setIsModalOpen(false);
              }
            });
        }
      }
      unsubscribe();
    });
  };

  const handleClose = (): void => setIsModalOpen(false);

  return (
    <>
      <style jsx>{`
        span.link-button {
          position: relative;
          bottom: 2px;
          right: 5px;
        }
      `}</style>

      <Modal show={isModalOpen} onHide={handleClose}>
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
