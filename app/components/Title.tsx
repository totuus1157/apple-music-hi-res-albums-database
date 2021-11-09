import {
  ReactElement,
  JSXElementConstructor,
  ReactNodeArray,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./fire";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const auth = firebase.auth();
const provider = new firebase.auth.OAuthProvider("apple.com");

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
  const [loginState, setLoginState] = useState("Login");

  useEffect((): void => {
    auth
      .getRedirectResult()
      .then((result): void => {
        if (result.credential) {
          console.log("User", result.credential);
          setLoginState("Logout");
        }
      })
      .catch((_error): void => {
        console.log("not logined.");
      });
  }, []);

  const login = (): void => {
    auth.signInWithRedirect(provider);
  };

  const logout = (): void => {
    auth.signOut();
    setLoginState("Login");
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>{props.title}</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={doLogin}>
            {loginState}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
