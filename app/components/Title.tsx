import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const provider = new firebase.auth.OAuthProvider("apple.com");

export default function Title(props: {
  title: string;
  loginState: boolean;
  setLoginState: (arg0: boolean) => void;
  setModalContent: (arg0: string | null) => void;
  setShow: (arg0: boolean) => void;
}): JSX.Element {
  const login = (): void => {
    auth.signInWithRedirect(provider);
  };

  const logout = (): void => {
    auth.signOut();
    props.setLoginState(false);
  };

  const doLogin = (): void => {
    if (auth.currentUser == null) {
      login();
    } else {
      logout();
      window.location.reload();
    }
  };

  const handleselect = (eventKey: string | null): void => {
    props.setModalContent(eventKey);
    props.setShow(true);
    console.log(`selected ${eventKey}`);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" onSelect={handleselect}>
            <Nav.Link eventKey="about">About this site</Nav.Link>
            <Nav.Link eventKey="howto">How to use</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={doLogin}>
            {props.loginState !== true ? "Login" : "Logout"}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
