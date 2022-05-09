import { useState, useEffect, SetStateAction } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./fire";
import sampleRateList from "./sampleRateList";
import Selector from "./Selector";

const db = firebase.firestore();

type SelectedItem = {
  artist: string;
  genre: string;
  composer: string;
  sampleRate: string;
};

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
  selectedItem: SelectedItem;
  setSelectedItem: {
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
    (arg0: SelectedItem): void;
  };
}): JSX.Element {
  const tableContent: SetStateAction<any[]> = [];
  const albumElements: AlbumElements[] = [];
  const albumId: string[] = [];
  const nameNoArticle: string[] = [];
  const [data, setData] = useState(tableContent);
  const [loading, setLoading] = useState(true);
  const [albumElementsList, setAlbumElementsList] = useState(albumElements);
  const [noDefiniteArticle, setNoDefiniteArticle] = useState(nameNoArticle);

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
          .map((value): string | undefined => {
            return value[_category];
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

  useEffect(() => {
    db.collectionGroup("albums")
      .get()
      .then((snapshot) => {
        snapshot.forEach((document): void => {
          const doc = document.data();
          const regex = /^The /;
          let artist = doc.artist;
          if (regex.test(artist)) {
            artist = artist.replace(regex, "");
            nameNoArticle.push(artist);
          }
          albumElements.push({
            artist: artist,
            genre: doc.genre,
            composer: doc.composer,
          });
        });
        setAlbumElementsList(albumElements);
        setNoDefiniteArticle(nameNoArticle);
      });
  }, [props.show]);

  useEffect((): void => {
    const i = props.selectedItem;
    let artist = i.artist;
    if (noDefiniteArticle.includes(artist)) {
      artist = `The ${artist}`;
    }

    let albumsRef = db.collectionGroup("albums");
    i.artist && (albumsRef = albumsRef.where("artist", "==", artist));
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
        albumId.push(doc.albumId);
      });
      setData(tableContent);
      props.setRegisteredAlbum(albumId);
      setLoading(false);
    });
  }, [props.show, props.selectedItem]);

  return (
    <>
      <style jsx>{`
        div.table-responsive {
          height: 90%;
        }

        .selecting {
          background-color: #ffe8a1;
        }
      `}</style>

      {loading !== true ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <caption>Total: {albumElementsList.length}</caption>
            <thead>
              <tr>
                <th className={props.selectedItem.artist && "selecting"}>
                  <Selector
                    name="Artist"
                    selectedItem={props.selectedItem}
                    setSelectedItem={props.setSelectedItem}
                    selectionElements={selectionElements("artist")}
                  />
                </th>
                <th className={props.selectedItem.genre && "selecting"}>
                  <Selector
                    name="Genre"
                    selectedItem={props.selectedItem}
                    setSelectedItem={props.setSelectedItem}
                    selectionElements={selectionElements("genre")}
                  />
                </th>
                <th className={props.selectedItem.composer && "selecting"}>
                  <Selector
                    name="Composer"
                    selectedItem={props.selectedItem}
                    setSelectedItem={props.setSelectedItem}
                    selectionElements={selectionElements("composer")}
                  />
                </th>
                <th className={props.selectedItem.sampleRate && "selecting"}>
                  <Selector
                    name="Sample Rate"
                    selectedItem={props.selectedItem}
                    setSelectedItem={props.setSelectedItem}
                    selectionElements={renamedProperty}
                  />
                </th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      ) : (
        <p>Now loading...</p>
      )}
    </>
  );
}
