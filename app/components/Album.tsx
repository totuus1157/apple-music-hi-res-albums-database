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
              <td>{doc.sampleRate}</td>
              <td>{doc.title}</td>
            </tr>
          );
        });
        setData(mydata);
      });
  }, []);

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Genre</th>
          <th>Sample rate</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </Table>
  );
}
