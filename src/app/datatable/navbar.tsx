"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Tooltip,
  Spacer,
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
    setModalContent("albumStats");
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
          <div className="flex">
            <Tooltip
              color="secondary"
              content="View Album Stats"
              placement="left"
              showArrow={true}
            >
              <Button
                color="secondary"
                variant="bordered"
                radius="full"
                isIconOnly
                onPress={handleShow}
              >
                {<FontAwesomeIcon icon={faChartBar} />}
              </Button>
            </Tooltip>
            <Spacer x={2} />
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
                variant="bordered"
                color="danger"
                onPress={(): void => {
                  const confirmed = window.confirm(
                    "Are you sure you want to log out?",
                  );
                  if (confirmed) {
                    localStorage.setItem("display", "ok");
                    window.location.href = "/api/auth/logout";
                  }
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
