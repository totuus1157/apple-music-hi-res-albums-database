"use client";

import { Link, Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const parameters = [
  {
    id: 1,
    icon: faSquareFacebook,
    href: "https://www.facebook.com/anzumaru.software/",
  },
  { id: 2, icon: faSquareXTwitter, href: "https://x.com/anzumaru_sw/" },
  {
    id: 3,
    icon: faEnvelope,
    href: "mailto:anzumaru_software@icloud.com",
  },
];

export default function SNSLinkButtons() {
  return (
    <>
      {parameters.map((parameter) => {
        return (
          <Button
            key={parameter.id}
            as={Link}
            href={parameter.href}
            isExternal
            size="lg"
            isIconOnly
            disableAnimation
            className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
          >
            {<FontAwesomeIcon icon={parameter.icon} size="2xl" />}
          </Button>
        );
      })}
    </>
  );
}
