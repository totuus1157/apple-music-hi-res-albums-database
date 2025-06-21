"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  link,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

type Props = {
  setModalContent: (arg0: string | null) => void;
  onOpen: () => void;
};

/*
When the user account deletion function is re-implemented, it should be created on a separate page.
The setModalContent and onOpen should be retained for future modal implementations of the help viewer.
*/

export default function Navbar(props: Props) {
  const { setModalContent, onOpen } = props;
  const { user, error, isLoading } = useUser();

  const handleShow = (): void => {
    setModalContent("analytics");
    onOpen();
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
        <NavbarItem>
          <Button
            color="secondary"
            variant="bordered"
            radius="full"
            isIconOnly
            onPress={handleShow}
          >
            {<FontAwesomeIcon icon={faChartBar} />}
          </Button>{" "}
          {!user ? (
            <Button
              href="/api/auth/login"
              as={Link}
              variant="bordered"
              color="primary"
              onPress={(): void => {
                localStorage.setItem("display", "ok");
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              href="/api/auth/logout"
              as={Link}
              variant="bordered"
              color="primary"
              onPress={(): void => {
                localStorage.setItem("display", "ok");
              }}
            >
              Logout
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
