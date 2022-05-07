import Button from "react-bootstrap/Button";

export default function ButtonSect(props: {
  setShow: (arg0: boolean) => void;
  editing: boolean;
  setEditing: (arg0: boolean) => void;
  setModalContent: (arg0: string) => void;
  loginState: boolean;
}): JSX.Element {
  const handleShow = (): void => {
    props.setShow(true);
    props.setModalContent("register");
  };

  return (
    <>
      <style jsx>{`
        .parent {
          margin: 10px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>

      <div className="parent">
        <div>
          <Button variant="success">All Items</Button>
        </div>
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
      </div>
    </>
  );
}
