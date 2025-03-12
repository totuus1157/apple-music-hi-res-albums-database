"use client";

import { Link, Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function SocialActionsBar() {
  return (
    <div className="flex gap-4 mt-8 mb-2">
      <Button
        as={Link}
        href="https://www.facebook.com/dialog/share?app_id=1094439279122110&href=https%3A%2F%2Fwww.applemusichiresalbumsdb.com%2F&hashtag=%23AppleMusicHiResAlbumsDB"
        isExternal
        size="lg"
        className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
      >
        {<FontAwesomeIcon icon={faSquareFacebook} size="2xl" />}
      </Button>
      <Button
        as={Link}
        href="https://twitter.com/intent/tweet?text=Apple%20Music%20Hi-Res%20Albums%20Database%0A%0A&url=https%3A%2F%2Fwww.applemusichiresalbumsdb.com%2F&hashtags=AppleMusicHiResAlbumsDB,AppleMusic,HiRes"
        isExternal
        size="lg"
        className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
      >
        {<FontAwesomeIcon icon={faSquareXTwitter} size="2xl" />}
      </Button>
      <Button
        as={Link}
        href="mailto:anzumaru_software@icloud.com"
        size="lg"
        className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
      >
        {<FontAwesomeIcon icon={faEnvelope} size="2xl" />}
      </Button>
    </div>
  );
}
