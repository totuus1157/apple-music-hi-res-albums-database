import { useState, useEffect, SetStateAction } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import sampleRateList from "./sampleRateList";
import Selector from "./Selector";
import Table from "react-bootstrap/Table";

const db = firebase.firestore();

type AlbumElements = {
  artist?: string;
  genre?: string;
  composer?: string;
  sampleRate?: string;
};

export default function Albums(props: {
  show: boolean;
  registeredAlbum: string[];
  setRegisteredAlbum: (arg0: string[]) => void;
}): JSX.Element {
  const tableContent: SetStateAction<any[]> = [];
  const albumElements: AlbumElements[] = [];
  const albumId: string[] = [];
  const [data, setData] = useState(tableContent);
  const [loading, setLoading] = useState(true);
  const [albumElementsList, setAlbumElementsList] = useState(albumElements);
  const [selectedItem, setSelectedItem] = useState({
    artist: "",
    genre: "",
    composer: "",
    sampleRate: "",
  });

  type SelectionElements = {
    id: number;
    element?: string;
  };

  const selectionElements = (
    _category: keyof AlbumElements
  ): SelectionElements[] => {
    return Array.from(
      new Set(
        albumElementsList
          .map((albumElements): string | undefined => {
            return albumElements[_category];
          })
          .filter(Boolean)
      )
    )
      .sort()
      .map((uniqueElement, key): SelectionElements => {
        return { id: key + 1, element: uniqueElement };
      });
  };

  const renamedProperty = sampleRateList.map((value) => ({
    id: value.id,
    element: value.sampleRate,
  }));

  useEffect((): void => {
    const i = selectedItem;
    let albumsRef = db.collectionGroup("albums");
    i.artist && (albumsRef = albumsRef.where("artist", "==", i.artist));
    i.genre && (albumsRef = albumsRef.where("genre", "==", i.genre));
    i.composer && (albumsRef = albumsRef.where("composer", "==", i.composer));
    i.sampleRate &&
      (albumsRef = albumsRef.where("sampleRate", "==", i.sampleRate));

    albumsRef.get().then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        tableContent.push(
          <tr key={document.id}>
            <td>{doc.artist}</td>
            <td>{doc.genre}</td>
            <td>{doc.composer}</td>
            <td>{doc.sampleRate}</td>
            <td>
              <a
                href={`https://music.apple.com/album/${doc.albumId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {doc.title}
              </a>
            </td>
          </tr>
        );
        albumElements.push({
          artist: doc.artist,
          genre: doc.genre,
          composer: doc.composer,
        });
        albumId.push(doc.albumId);
      });
      setData(tableContent);
      setAlbumElementsList(albumElements);
      props.setRegisteredAlbum(albumId);
      setLoading(false);
    });
  }, [props.show, selectedItem]);

  return (
    <div style={{ marginBottom: "20px" }}>
      {loading !== true ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>
                <Selector
                  name="Artist"
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectionElements={selectionElements("artist")}
                />
              </th>
              <th>
                <Selector
                  name="Genre"
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectionElements={selectionElements("genre")}
                />
              </th>
              <th>
                <Selector
                  name="Composer"
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectionElements={selectionElements("composer")}
                />
              </th>
              <th>
                <Selector
                  name="Sample Rate"
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectionElements={renamedProperty}
                />
              </th>
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
