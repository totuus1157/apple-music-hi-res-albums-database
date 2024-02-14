import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "components/fire";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const db = firebase.firestore();
const auth = firebase.auth();

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  albumInfo: string;
  uid: string;
};

export default function Delete(props: Props): JSX.Element {
  const { isOpen, onOpen, onOpenChange, onClose, albumInfo, uid } = props;

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

  const handleClose = (): void => onClose();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Deleting an album</ModalHeader>
            <ModalBody>
              <Table hideHeader>
                <TableHeader>
                  <TableColumn>Dummy</TableColumn>
                  <TableColumn>Dummy</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Artist</TableCell>
                    <TableCell>{artist}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>{title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Genre</TableCell>
                    <TableCell>{genre}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Composer</TableCell>
                    <TableCell>{composer ? composer : "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SampleRate</TableCell>
                    <TableCell>{sampleRate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
              <Button color="danger" onClick={doAction}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
