import Register from "./Register";
import Delete from "./Delete";

export default function ModalWindow(props: {
  modalContent: string | null;
  albumInfo: string;
  show: boolean;
  setShow: (arg0: boolean) => void;
  registeredURL: string[];
  uid: string;
}): JSX.Element {
  let content = <></>;
  if (props.modalContent === "register") {
    content = (
      <Register
        show={props.show}
        setShow={props.setShow}
        uid={props.uid}
        registeredURL={props.registeredURL}
      />
    );
  } else if (props.modalContent === "delete") {
    content = (
      <Delete
        show={props.show}
        setShow={props.setShow}
        albumInfo={props.albumInfo}
        uid={props.uid}
      />
    );
  }

  return content;
}
