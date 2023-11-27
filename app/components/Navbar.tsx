import Link from "next/link";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "components/fire";
import BSNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const provider = new firebase.auth.OAuthProvider("apple.com");

type Props = {
  isLogin: boolean;
  setIsLogin: (arg0: boolean) => void;
  setModalContent: (arg0: string | null) => void;
  setIsModalOpen: (arg0: boolean) => void;
};

export default function Navbar(props: Props): JSX.Element {
  const { isLogin, setIsLogin, setModalContent, setIsModalOpen } = props;

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
      <BSNavbar bg="dark" variant="dark">
        <Link href="/" passHref replace legacyBehavior>
          <BSNavbar.Brand>&lt;&lt; Back to Home page</BSNavbar.Brand>
        </Link>
        <BSNavbar.Toggle />
        <BSNavbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={doLogin}>
            {isLogin !== true ? "Login" : "Logout"}
          </Button>
        </BSNavbar.Collapse>
      </BSNavbar>
    </div>
  );
}
