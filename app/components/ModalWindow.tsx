import Register from "./Register";

export default function ModalWindow(_props: any): JSX.Element {
  return (
    <>
      <Register show={_props.show} setShow={_props.setShow} />
    </>
  );
}
