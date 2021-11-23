import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function ModalWindow(props: {
  setShow: (arg0: boolean) => any;
  show: boolean;
}): JSX.Element {
  const handleClose = (): any => {
    return props.setShow(false);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hello World!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
