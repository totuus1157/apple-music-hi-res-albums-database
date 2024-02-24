import { useState, useEffect, SetStateAction } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "components/fire";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const db = firebase.firestore();
const auth = firebase.auth();

type Props = {
  albumInfo: string;
  setAlbumInfo: (arg0: string) => void;
  onOpen: () => void;
  setModalContent: (arg0: string) => void;
  isOpen: boolean;
  uid: string;
};

export default function EditTable(props: Props): JSX.Element {
  const { albumInfo, setAlbumInfo, onOpen, setModalContent, isOpen, uid } =
    props;

  const tableRows: SetStateAction<any[]> = [];
  const [data, setData] = useState(tableRows);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleShow = (e: any): void => {
    setAlbumInfo(e.currentTarget.value);
    setModalContent("delete");
    onOpen();
  };

  useEffect((): void => {
    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(uid)
        .collection("albums")
        .get()
        .then((snapshot): void => {
          snapshot.forEach((document): void => {
            const doc = document.data();
            tableRows.push(
              <TableRow key={document.id}>
                <TableCell>{doc.artist}</TableCell>
                <TableCell>{doc.genre}</TableCell>
                <TableCell>{doc.composer}</TableCell>
                <TableCell>{doc.sampleRate}</TableCell>
                <TableCell>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.title}
                  </a>
                </TableCell>
                <TableCell style={{ border: "none" }}>
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    value={[
                      document.id,
                      doc.artist,
                      doc.title,
                      doc.genre,
                      doc.composer,
                      doc.sampleRate,
                    ]}
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </TableCell>
              </TableRow>,
            );
          });
          setData(tableRows);
          setIsLoaded(true);
        });
    } else {
      tableRows.push(
        <TableRow key="1">
          <TableCell>Cannot retrieve data.</TableCell>
        </TableRow>,
      );
    }
  }, [isOpen]);

  return (
    <>
      {isLoaded ? (
        <Table isStriped>
          <TableHeader>
            <TableColumn>Artist</TableColumn>
            <TableColumn>Genre</TableColumn>
            <TableColumn>Composer</TableColumn>
            <TableColumn>Sample Rate</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>{data}</TableBody>
        </Table>
      ) : (
        <p>Now loading...</p>
      )}
    </>
  );
}
