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
        <Button>Add</Button>
      </div>
    </>
  );
}
