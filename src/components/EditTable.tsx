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

type AlbumData = {
  id: string;
  product_id: string;
  title: string;
  artist: string;
  genre: string[];
  composer: string[];
  sample_rate: string;
  registrant_id: string;
  created_at: Date;
  updated_at: Date;
  country_code: string;
};

type Album = {
  id: string;
  product_id: string;
  artist: string;
  genre: string[];
  composer: string[];
  sample_rate: string;
  title: string;
};

type Props = {
  albumDataArray: AlbumData[];
  albumInfo: string;
  setAlbumInfo: (arg0: string) => void;
  onOpen: () => void;
  setModalContent: (arg0: string) => void;
  isOpen: boolean;
  setAlbumFetchTrigger: (arg0: number) => void;
};

export default function EditTable(props: Props): JSX.Element {
  const {
    albumDataArray,
    albumInfo,
    setAlbumInfo,
    onOpen,
    setModalContent,
    isOpen,
    setAlbumFetchTrigger,
  } = props;
  const [data, setData] = useState<Album[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user, error, isLoading } = useUser();

  const handleDelete = async (productId: string): Promise<void> => {
    if (!user?.sub) {
      alert("User not authenticated");
      return;
    }

    if (!confirm("Are you sure you want to delete this album?")) {
      return;
    }

    try {
      const response = await fetch("/api/delete-album", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, registrantId: user.sub }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete the album");
      }

      // Refresh the album list after successful deletion
      setAlbumFetchTrigger(Date.now());
    } catch (error: any) {
      console.error("Error deleting album:", error);
      alert("Failed to delete the album: " + error.message);
    }
  };

  const fetchData = async () => {
    if (!user?.sub) return; // Check if user.sub is defined

    try {
      const response = await fetch(
        `/api/get-albums-by-registrant?registrantId=${user.sub}`,
      );
      const result = await response.json();
      setData(result.albums.rows);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect((): void => {
    if (userID) {
      const getUserAlbumsData = albumDataArray.filter((albumData): boolean => {
        return albumData.registrant_id === userID;
      });
      setData(getUserAlbumsData);
    }
  }, [albumDataArray]);

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
          <TableBody>
            {data.map((doc: Album) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.artist}</TableCell>
                <TableCell>
                  <ul>
                    {doc.genre.map((genre, index) => (
                      <li key={index}>{genre}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {doc.composer.map((composer, index) => (
                      <li key={index}>{composer}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{doc.sample_rate}</TableCell>
                <TableCell>{doc.title}</TableCell>
                <TableCell style={{ border: "none" }}>
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(doc.product_id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Now loading...</p>
      )}
    </>
  );
}
