"use client";

import { Link, Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareXTwitter,
  faSquareThreads,
  faSquareBluesky,
} from "@fortawesome/free-brands-svg-icons";

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
    icon: faSquareThreads,
    href: "https://www.threads.net/intent/post?text=Apple%20Music%20Hi-Res%20Albums%20Database%0A%0A%23ApplemusichiresalbumsDB&url=https%3A%2F%2Fapplemusichiresalbumsdb.com%2F",
  },
  {
    id: 4,
    icon: faSquareBluesky,
    href: "https://bsky.app/intent/compose?text=Apple%20Music%20Hi-Res%20Albums%20Database%0A%0Ahttps%3A%2F%2Fapplemusichiresalbumsdb.com%0A%0A%23ApplemusichiresalbumsDB",
  },
];

export default function SocialActionsBar() {
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
