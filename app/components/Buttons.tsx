import Button from "react-bootstrap/Button";

export default function Buttons(props: { loginState: boolean }): JSX.Element {
  return (
    <>
      <style jsx>{`
        div {
          margin: 10px;
          float: right;
        }
      `}</style>

      <div>
        <Button variant="primary" disabled={!props.loginState}>
          Add
        </Button>{" "}
        <Button variant="secondary" disabled={!props.loginState}>
          Edit
        </Button>
      </div>
    </>
  );
}
