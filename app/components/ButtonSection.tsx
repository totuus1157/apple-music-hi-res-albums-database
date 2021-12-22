import Button from "react-bootstrap/Button";

export default function Buttons(props: {
  setShow: (arg0: boolean) => void;
  editing: boolean;
  setEditing: (arg0: boolean) => void;
  setModalDetail: (arg0: string) => void;
  loginState: boolean;
}): JSX.Element {
  const handleShow = () => {
    props.setShow(true);
    props.setModalDetail("register");
  };

  console.log(props.editing);

  return (
    <>
      <style jsx>{`
        div {
          margin: 10px;
          float: right;
        }
      `}</style>

      <div>
        {!props.editing && (
          <Button
            variant="primary"
            disabled={!props.loginState}
            onClick={handleShow}
          >
            Add
          </Button>
        )}{" "}
        {!props.editing ? (
          <Button
            variant="dark"
            disabled={!props.loginState}
            onClick={() => props.setEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="outline-dark"
            onClick={() => {
              props.setEditing(false);
            }}
          >
            Exit
          </Button>
        )}
      </div>
    </>
  );
}
