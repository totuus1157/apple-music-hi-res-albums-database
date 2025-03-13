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
    href: "https://www.facebook.com/dialog/share?app_id=1094439279122110&href=https%3A%2F%2Fwww.applemusichiresalbumsdb.com%2F&hashtag=%23AppleMusicHiResAlbumsDB",
  },
  {
    id: 2,
    icon: faSquareXTwitter,
    href: "https://twitter.com/intent/tweet?text=Apple%20Music%20Hi-Res%20Albums%20Database%0A%0A&url=https%3A%2F%2Fwww.applemusichiresalbumsdb.com%2F&hashtags=AppleMusicHiResAlbumsDB,AppleMusic,HiRes",
  },
  {
    id: 3,
    icon: faEnvelope,
    href: "mailto:anzumaru_software@icloud.com",
  },
];

export default function SocialActionsBar() {
  return (
    <div className="flex gap-4 mt-8 mb-2">
      {parameters.map((parameter): void => {
        return (
          <Button
            key={parameter.id}
            as={Link}
            href={parameter.href}
            isExternal
            size="lg"
            disableAnimation
            className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
          >
            {<FontAwesomeIcon icon={parameter.icon} size="2xl" />}
          </Button>
        );
      })}
    </div>
  );
}
