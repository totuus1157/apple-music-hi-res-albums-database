import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function HowTo(props: {
  setShow: (arg0: boolean) => any;
  show: boolean;
}): JSX.Element {
  const handleClose = (): void => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>How to Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>
            Display the desired album from the Music app, and select "Get Info"
            from the "..." icon to the right of the title.
          </li>
          <li>
            Copy “artist", “album", and “composer" (if the genre is "Classical")
            from the items in the opened window and paste them into the
            "Artist", "Title", and "Composer" text boxes of our app,
            respectively. At the same time, select "Genre" (if "Classical" is
            not selected, the "Composer" text box will not be activated).
          </li>
          <li>
            Play the album and click on the wavy icon on the right side of the
            window where the song title is displayed, the sampling rate will be
            displayed and you can select it from the radio buttons in our app.
          </li>
          <li>
            Finally, click the "..." icon next to the album name again. icon
            again, do "Share" -{">"} "Copy Link", and paste the address you got
            into the "URL" text box of our app.
          </li>
          <li>
            Click on the "Save changes" button and make sure that the registered
            album appears correctly in the database.
          </li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
