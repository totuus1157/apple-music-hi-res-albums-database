import Register from "./Register";

export default function ModalWindow(props: {
  modalDetail: string;
  show: boolean;
  setShow: (arg0: boolean) => any;
}): JSX.Element {
  return (
    <>
      {props.modalDetail === "register" && (
        <Register show={props.show} setShow={props.setShow} />
      )}
    </>
  );
}
