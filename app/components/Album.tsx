/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, SetStateAction } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import Table from "react-bootstrap/Table";

const db = firebase.firestore();

export default function Album(): JSX.Element {
  const mydata: SetStateAction<any[]> = [];
  const [data, setData] = useState(mydata);

  useEffect((): void => {
    db.collection("users")
      .doc("VhTtKxlWjDbmkq0qyzAc")
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
                <a href={doc.link} target="_blank" rel="noopener noreferrer">
                  {doc.title}
                </a>
              </td>
            </tr>
          );
        });
        setData(mydata);
      });
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Genre</th>
            <th>Composer</th>
            <th>Sample rate</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    </div>
  );
}
