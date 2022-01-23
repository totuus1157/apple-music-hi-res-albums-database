import Register from "./Register";
import Delete from "./Delete";

export default function ModalWindow(props: {
  modalDetail: string;
  albumInfo: string;
  show: boolean;
  setShow: (arg0: boolean) => void;
  registeredURL: string[];
  user: object;
}): JSX.Element {
  return (
    <>
      {props.modalDetail === "register" && (
        <Register
          show={props.show}
          setShow={props.setShow}
          user={props.user}
          registeredURL={props.registeredURL}
        />
      )}
      {props.modalDetail === "delete" && (
        <Delete
          show={props.show}
          setShow={props.setShow}
          albumInfo={props.albumInfo}
          user={props.user}
        />
      )}
    </>
  );
}
