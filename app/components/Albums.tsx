import { useState, useEffect, SetStateAction } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Table from "react-bootstrap/Table";

const db = firebase.firestore();

export default function Albums(props: { show: boolean }): JSX.Element {
  const tableContent: SetStateAction<any[]> = [];
  const [data, setData] = useState(tableContent);
  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    db.collectionGroup("albums")
      .get()
      .then((snapshot): void => {
        snapshot.forEach((document): void => {
          const doc = document.data();
          tableContent.push(
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
            </tr>
          );
        });
        setData(tableContent);
        setLoading(false);
      });
  }, [props.show]);

  return (
    <div style={{ marginBottom: "20px" }}>
      {loading !== true ? (
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
