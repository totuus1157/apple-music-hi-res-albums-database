import Register from "./Register";
import Delete from "./Delete";

export default function ModalWindow(props: {
  modalDetail: string;
  albumData: string;
  show: boolean;
  setShow: (arg0: boolean) => any;
}): JSX.Element {
  return (
    <>
      {props.modalDetail === "register" && (
        <Register show={props.show} setShow={props.setShow} />
      )}
      {props.modalDetail === "delete" && (
        <Delete
          show={props.show}
          setShow={props.setShow}
          albumData={props.albumData}
        />
      )}
    </>
  );
}
