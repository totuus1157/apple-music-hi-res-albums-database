import Link from "next/link";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "./fire";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const provider = new firebase.auth.OAuthProvider("apple.com");

type Props = {
  isLoggedIn: boolean;
  setIsLoggedIn: (arg0: boolean) => void;
  setModalContent: (arg0: string | null) => void;
  setIsModalOpen: (arg0: boolean) => void;
};

export default function NavLine(props: Props): JSX.Element {
  const { isLoggedIn, setIsLoggedIn, setModalContent, setIsModalOpen } = props;

  const login = (): void => {
    auth.signInWithRedirect(provider);
  };

  const doLogin = (): void => {
    if (auth.currentUser == null) {
      login();
    } else {
      setIsModalOpen(true);
      setModalContent("logout");
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
            {isLoggedIn !== true ? "Login" : "Logout"}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
