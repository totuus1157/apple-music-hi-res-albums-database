import { useState, useEffect, SetStateAction, MouseEventHandler } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "./fire";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const db = firebase.firestore();
const auth = firebase.auth();

export default function EditTable(props: {
  albumData: string;
  setAlbumData: (arg0: string) => void;
  setShow: (arg0: boolean) => void;
  setModalDetail: (arg0: string) => void;
  show: boolean;
}): JSX.Element {
  const mydata: SetStateAction<any[]> = [];
  const [data, setData] = useState(mydata);
  const [loading, setLoading] = useState(true);

  const handleShow = (e: MouseEventHandler<HTMLElement>): void => {
    console.dir(e.currentTarget.__reactProps$tpd8clicdwp.value, {
      depth: null,
    });
    props.setAlbumData(e.currentTarget.value);
    props.setShow(true);
    props.setModalDetail("delete");
  };

  useEffect((): void => {
    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(auth.currentUser.email!)
        .collection("albums")
        .get()
        .then((snapshot): void => {
          snapshot.forEach((document): void => {
            const doc = document.data();
            mydata.push(
              <tr key={document.id}>
                <td>{doc.artist}</td>
                <td>{doc.genre}</td>
                <td>{doc.composer}</td>
                <td>{doc.sampleRate}</td>
                <td>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.title}
                  </a>
                </td>
                <td style={{ border: "none" }}>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    value={doc}
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
              </tr>
            );
          });
          setData(mydata);
          setLoading(false);
        });
    } else {
      mydata.push(
        <tr key="1">
          <th>Cannot retrieve data.</th>
        </tr>
      );
    }
  }, [props.show]);

  return (
    <div style={{ marginBottom: "20px" }}>
      {loading === false ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Genre</th>
              <th>Composer</th>
              <th>Sample Rate</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </Table>
      ) : (
        <p>Now loading...</p>
      )}
    </div>
  );
}
