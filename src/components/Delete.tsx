import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  albumInfo: string;
};

export default function Delete(props: Props): JSX.Element {
  const { isOpen, onOpenChange, onClose, albumInfo } = props;

  console.log("albumInfo: ", albumInfo);

  const albumDataArray = albumInfo.split(",");
  const [albumId, artist, title, genre, composer, sampleRate] = albumDataArray;

  const { user, error, isLoading } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const doAction = async (): Promise<void> => {
    if (!user) {
      setDeleteError("You must be logged in to delete an album.");
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const requestBody = { productId: albumId, registrantId: user.sub };
      console.log("Request Body:", requestBody); // リクエストボディをコンソールに出力

      const response = await fetch("/api/database/delete-album", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response:", response); // レスポンスをコンソールに出力

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete the album");
      }

      handleClose();
    } catch (error: any) {
      console.error("Error:", error); // エラーをコンソールに出力
      setDeleteError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = (): void => onClose();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Deleting an album</ModalHeader>
            <ModalBody>
              {deleteError && <div style={{ color: "red" }}>{deleteError}</div>}
              <Table hideHeader>
                <TableHeader>
                  <TableColumn>Dummy</TableColumn>
                  <TableColumn>Dummy</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Artist</TableCell>
                    <TableCell>{artist}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>{title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Genre</TableCell>
                    <TableCell>{genre}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Composer</TableCell>
                    <TableCell>{composer ? composer : "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SampleRate</TableCell>
                    <TableCell>{sampleRate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
              <Button color="danger" onClick={doAction} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
