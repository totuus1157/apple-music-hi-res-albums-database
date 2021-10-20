import {
  ReactElement,
  JSXElementConstructor,
  ReactNodeArray,
  ReactPortal,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";

export default function Title(props: {
  title:
    | string
    | number
    | boolean
    | {}
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactNodeArray
    | ReactPortal
    | null
    | undefined;
}): JSX.Element {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>{props.title}</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {/* <Button variant="outline-light" onClick={doLogin}>
          {loginState}
        </Button> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
