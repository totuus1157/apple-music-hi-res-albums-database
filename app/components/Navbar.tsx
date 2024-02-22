import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "components/fire";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const auth = firebase.auth();
const provider = new firebase.auth.OAuthProvider("apple.com");

type Props = {
  isLogin: boolean;
  setIsLogin: (arg0: boolean) => void;
  setModalContent: (arg0: string | null) => void;
  onOpen: () => void;
};

export default function Navbar(props: Props): JSX.Element {
  const { isLogin, setIsLogin, setModalContent, onOpen } = props;

  const login = (): void => {
    auth.signInWithRedirect(provider);
  };

  const doLogin = (): void => {
    if (auth.currentUser === null) {
      login();
    } else {
      setModalContent("logout");
      onOpen();
    }
  };

  return (
    <NextUINavbar maxWidth="full" isBordered>
      <NavbarContent>
        <NavbarItem>
          <Button href="/" as={Link}>
            Back
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="bordered" color="primary" onClick={doLogin}>
          {!isLogin ? "Login" : "Logout"}
        </Button>
      </NavbarContent>
    </NextUINavbar>
  );
}
