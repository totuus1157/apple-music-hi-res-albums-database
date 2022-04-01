import Link from "next/link";
import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
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

  return (
    <div style={{ marginBottom: "20px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Link href="/" passHref replace>
          <Navbar.Brand>&lt;&lt; Back to Home page</Navbar.Brand>
        </Link>
        <Button variant="outline-light" onClick={doLogin}>
          {props.loginState !== true ? "Login" : "Logout"}
        </Button>
      </Navbar>
    </div>
  );
}
