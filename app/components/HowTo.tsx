import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function HowTo(props: {
  setShow: (arg0: boolean) => any;
  show: boolean;
}): JSX.Element {
  const handleClose = (): void => props.setShow(false);

  return (
    <>
      {" "}
      <style jsx>{`
        p {
          color: red;
        }
      `}</style>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <p>You will need to log in with your Apple ID in advance.</p>
            <li>
              Display the desired album from the Music app, and select &quot;Get
              Info&quot; from the &quot;...&quot; icon to the right of the
              title.
            </li>
            <li>
              Copy &quot;artist&quot;, &quot;album&quot;, and
              &quot;composer&quot; (if the genre is &quot;Classical&quot;) from
              the items in the opened window and paste them into the
              &quot;Artist&quot;, &quot;Title&quot;, and &quot;Composer&quot;
              text boxes of our app, respectively. At the same time, select
              &quot;Genre&quot; (if &quot;Classical&quot; is not selected, the
              &quot;Composer&quot; text box will not be activated).
            </li>
            <li>
              Play the album and click on the wavy icon on the right side of the
              window where the song title is displayed, the sampling rate will
              be displayed and you can select it from the radio buttons in our
              app.
            </li>
            <li>
              Finally, click the &quot;...&quot; icon next to the album name
              again. icon again, do &quot;Share&quot; -{">"} &quot;Copy
              Link&quot;, and paste the address you got into the &quot;URL&quot;
              text box of our app.
            </li>
            <li>
              Click on the &quot;Save changes&quot; button and make sure that
              the registered album appears correctly in the database.
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
