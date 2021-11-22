import Button from "react-bootstrap/Button";

export default function Buttons(props: {
  setShow: (arg0: boolean) => any;
  loginState: any;
}): JSX.Element {
  const handleShow = () => props.setShow(true);

  return (
    <>
      <style jsx>{`
        div {
          margin: 10px;
          float: right;
        }
      `}</style>

      <div>
        <Button
          variant="primary"
          disabled={!props.loginState}
          onClick={handleShow}
        >
          Add
        </Button>{" "}
        <Button variant="secondary" disabled={!props.loginState}>
          Edit
        </Button>
      </div>
    </>
  );
}
