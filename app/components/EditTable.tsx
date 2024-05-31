import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
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

type Props = {
  albumInfo: string;
  setAlbumInfo: (arg0: string) => void;
  onOpen: () => void;
  setModalContent: (arg0: string) => void;
  isOpen: boolean;
};

export default function EditTable(props: Props): JSX.Element {
  const { albumInfo, setAlbumInfo, onOpen, setModalContent, isOpen } = props;
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user, error, isLoading } = useUser();

  const handleShow = (e: any): void => {
    setAlbumInfo(e.currentTarget.value);
    setModalContent("delete");
    onOpen();
  };

  useEffect((): void => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/get-albums-by-registrant?registrantId=${user.sub}`,
          );
          const result = await response.json();
          const albums = result.albums.rows.map((doc: any) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.artist}</TableCell>
              <TableCell>{doc.genre.join(", ")}</TableCell>
              <TableCell>{doc.composer.join(", ")}</TableCell>
              <TableCell>{doc.sample_rate}</TableCell>
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
                    doc.id,
                    doc.artist,
                    doc.title,
                    doc.genre.join(", "),
                    doc.composer.join(", "),
                    doc.sample_rate,
                  ]}
                  onClick={handleShow}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </TableCell>
            </TableRow>
          ));
          setData(albums);
          setIsLoaded(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user, isOpen]);

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return <p>Error loading user: {error.message}</p>;
  }

  return (
    <>
      {isLoaded ? (
        <Table isStriped shadow="none">
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
