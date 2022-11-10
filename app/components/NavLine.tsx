import Link from "next/link";
import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const provider = new firebase.auth.OAuthProvider("apple.com");

export default function NavLine(props: {
  title: string;
  loginState: boolean;
  setLoginState: (arg0: boolean) => void;
  setModalContent: (arg0: string | null) => void;
  setShow: (arg0: boolean) => void;
}): JSX.Element {
  const login = (): void => {
    auth.signInWithRedirect(provider);
  };

  const doLogin = (): void => {
    if (auth.currentUser == null) {
      login();
    } else {
      props.setShow(true);
      props.setModalContent("logout");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Navbar bg="dark" variant="dark">
        <Link href="/" passHref replace legacyBehavior>
          <Navbar.Brand>&lt;&lt; Back to Home page</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={doLogin}>
            {props.loginState !== true ? "Login" : "Logout"}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
