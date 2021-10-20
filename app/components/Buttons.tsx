import Button from "react-bootstrap/Button";

export default function Buttons(): JSX.Element {
  return (
    <>
      <style jsx>{`
        div {
          margin: 10px;
          float: right;
        }
      `}</style>

      <div>
        <Button variant="primary">Add</Button>{" "}
        <Button variant="secondary">Edit</Button>
      </div>
    </>
  );
}
