import { useState, useEffect } from "react";
import { summarizeAlbumData } from "components/albumFormatter";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import type { AlbumData, FormatAlbumForTable } from "types/types";

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
  const [data, setData] = useState<FormatAlbumForTable[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user, error, isLoading } = useUser();

  const userID = user?.sub || process.env.NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID;

  const handleDelete = async (productId: string): Promise<void> => {
    if (!userID) {
      alert("User not authenticated");
      return;
    }

    if (!confirm("Are you sure you want to delete this album?")) {
      return;
    }

    try {
      const response = await fetch("/api/database/delete-album", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, registrantId: userID }),
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

  useEffect((): void => {
    if (userID) {
      const getUserAlbumsData = albumDataArray.filter((albumData): boolean => {
        return albumData.registrant_id === userID;
      });
      const formatAlbumForTable = summarizeAlbumData(getUserAlbumsData);
      setData(formatAlbumForTable);
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
      {isLoaded || userID ? (
        <Table
          isStriped
          shadow="none"
          classNames={{ td: "whitespace-pre-wrap" }}
        >
          <TableHeader>
            <TableColumn>Artist</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Genre</TableColumn>
            <TableColumn>Composer</TableColumn>
            <TableColumn>Sample Rate</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.artist}</TableCell>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.genre}</TableCell>
                <TableCell>{doc.composer}</TableCell>
                <TableCell>{doc.sample_rate}</TableCell>
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
        <Spinner label="Loading..." className="ml-4" />
      )}
    </>
  );
}
