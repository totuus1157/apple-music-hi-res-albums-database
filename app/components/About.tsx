import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function About(props: {
  setShow: (arg0: boolean) => any;
  show: boolean;
}): JSX.Element {
  const handleClose = (): void => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>About this site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Apple launched high-resolution lossless distribution of Apple Music in
          June of 2021. However, a way to directly search for high-resolution
          music sources has yet to be provided to us.
        </p>
        <p>
          So I thought it would be very useful to have a database where Apple
          Music users could register and share high-resolution albums that they
          know, and I actually developed it.
        </p>
        <p>
          Of course, I know that sound quality is not the most important
          criterion for evaluating a piece of music.
        </p>
        <p>
          However, I believe that the desire for better sound quality is rooted
          in the natural instincts of human beings, and above all, it would be
          wonderful if this service could help us encounter unknown and amazing
          music that we have never had the chance to experience in the culture
          we grew up in.
        </p>
        <p>
          If you know of a high-resolution album that has not yet been
          registered to this database, please add it. Any small contribution
          would be greatly appreciated.
        </p>
        <p>Let's enjoy together the common language of the world, music!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
