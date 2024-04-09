import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "components/fire";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Button,
} from "@nextui-org/react";
const auth = firebase.auth();
const user = auth.currentUser;
const provider = new firebase.auth.OAuthProvider("apple.com");

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  setIsLogin: (arg0: boolean) => void;
};

export default function Logout(props: Props): JSX.Element {
  const { isOpen, onOpen, onOpenChange, onClose, setIsLogin } = props;

  const doAction = (): void => {
    auth.signOut();
    setIsLogin(false);
    onClose();
  };

  const doDelete = (): void => {
    const unsubscribe = auth.onAuthStateChanged((user): void => {
      if (user) {
        if (confirm("Are you sure you want to do this?")) {
          user
            .delete()
            .then((): void => {
              setIsLogin(false);
              onClose();
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
                onClose();
              }
            });
        }
      }
      unsubscribe();
    });
  };

  const handleClose = (): void => onClose();

  return (
    <>
      <style jsx>{`
        span.link-button {
          position: relative;
          bottom: 2px;
          right: 5px;
        }
      `}</style>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Logout</ModalHeader>
              <ModalBody>
                <p>
                  Do you want to execute
                  {user !== null && `, ${user.displayName}`}?
                </p>
                <Card>
                  <CardBody>
                    To delete your account registration,
                    <span className="link-button">
                      <Button
                        color="danger"
                        variant="bordered"
                        size="sm"
                        onClick={doDelete}
                      >
                        click here.
                      </Button>
                    </span>
                    <br />
                    <span className="text-danger">
                      Notice: Your registered album data will not be deleted.
                    </span>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleClose}>Close</Button>
                <Button color="secondary" onClick={doAction}>
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
