import type { NextPage } from "next";
import Image from "next/image";
import SNSLinkButtons from "app/sns-link-buttons";
import GoToDatabaseButton from "app/go-to-database-button";
import GoogleAd from "app/googlead";
import SocialActionsBar from "app/social-actions-bar";
import googleAdSlotId from "app/googlead-slot-id";
import KofiSymbol from "app/kofi-symbol";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  Divider,
} from "@heroui/react";

const year = new Date().getFullYear().toString();

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center">
        <Navbar position="static">
          <NavbarBrand>
            <Image src="/favicon.ico" alt="Site logo" width={36} height={36} />
            <p className="font-bold text-inherit leading-none text-left sm:text-center">
              <span className="block sm:inline align-top -mb-2">
                Apple Music{" "}
              </span>
              <br className="block sm:hidden" />
              <span className="block sm:inline align-top">
                Hi-Res Albums Database
              </span>
            </p>
          </NavbarBrand>
        </Navbar>

        <h1 className="text-5xl font-extrabold my-10 text-black">
          Discover Over 30,000
          <br />
          Apple Music Hi-Res Albums
          <br />
          in Our Database
        </h1>

        <section className="mt-6">
          <p className="text-3xl font-semibold mb-6 text-gray-900">
            Search and filter by artist, genre, composer, or sample rate.
          </p>
        </section>

        <div className="w-full max-w-[728px] flex justify-end mb-4">
          <SocialActionsBar />
        </div>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={googleAdSlotId.subtitle}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="my-12">
          <GoToDatabaseButton />
        </div>

        <section className="my-8 max-w-3xl bg-red-100 border border-red-500 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">
            Important Notice — Oct 15, 2025
          </h2>

          <p className="text-left text-red-700 leading-7 mb-4">
            Thanks to the generous support from Ko-fi contributors, I’ve been
            able to cover the renewal fee for the{" "}
            <strong>Apple Developer Program</strong>. 🎉 This means the Apple
            Music Hi-Res Albums Database can continue its operation for the
            foreseeable future — something I truly couldn’t have achieved alone.
          </p>

          <p className="text-left text-red-700 leading-7 mb-4">
            To everyone who stepped forward to help, whether by donating,
            sharing the site, or simply visiting — <strong>thank you</strong>.
            Your kindness and encouragement have kept this project alive. 🙏
          </p>

          <p className="text-left text-red-700 leading-7 mb-4">
            That said, there are still ongoing expenses — particularly the{" "}
            <strong>$20 monthly server cost</strong>. If you believe in what
            this project stands for and would like to help sustain it, please
            consider offering support through Ko-fi:
            <a
              href="https://ko-fi.com/anzumaru_software"
              className="text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ko-fi.com/anzumaru_software
            </a>
          </p>

          <p className="text-left text-red-700 leading-7 mb-4">
            Every bit of help — big or small — makes a real difference in
            keeping this independent service running. I remain committed to
            improving and expanding it for all Apple Music Hi-Res listeners
            worldwide. 🌍🎧
          </p>

          <p className="text-left text-red-700 leading-7 mb-4">
            By the way, the new <strong>Ranking feature</strong> isn’t getting
            much use yet — so please don’t hesitate to hit that 👍️ and “Like”
            your favorite albums! The more you interact, the more meaningful and
            fun the ranking data will become. 📈🎵
          </p>

          <p className="text-left text-red-700 leading-7 font-semibold">
            Thank you again for standing with me and for helping this project
            survive another year. ❤️ Let’s continue discovering amazing Hi-Res
            albums together.
          </p>
        </section>

        <section className="my-8 max-w-3xl bg-green-100 border border-green-500 p-4 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-green-800">
            Update Notice
          </h2>
          <h3 className="text-lg font-semibold mb-2 text-green-800">
            Oct 1, 2025
          </h3>
          <p className="text-left text-green-700 leading-7 mb-4">
            We are excited to announce the launch of the new{" "}
            <strong>Ranking Feature</strong>! 🏆 Albums can now be sorted by the
            number of user “Likes” 👍, making it easier than ever to discover
            the most popular Hi-Res albums in the community. 🎶
          </p>
          <p className="text-left text-green-700 leading-7 mb-4">
            Logged-in users (via Apple ID 🔑) can now “Like” their favorite
            albums ❤️, and those Likes directly contribute to the ranking. This
            makes the database not only a reference, but also a community-driven
            guide for discovering Hi-Res music ✨.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-green-800">
            Aug 24, 2025
          </h3>
          <p className="text-left text-green-700 leading-7 mb-4">
            🎉🎉🎉 We have reached an incredible milestone:{" "}
            <strong>30,000 registered albums</strong> in the database! 🚀 What
            began as a small project has grown into a vast treasure trove of
            Hi-Res music, thanks to the passion and contributions of users
            worldwide. 🌍🎶✨
          </p>
          <p className="text-left text-green-700 leading-7 mb-6">
            • 🗓️ Just over three years since launch, the database has tripled in
            size from our first 10k celebration.
            <br />
            • 🏔️ We are no longer just climbing mountains—we are now exploring
            entire ranges of musical discovery.
            <br />
            • 🌌 Each album is another star lighting up the galaxy of Hi-Res
            Lossless music.
            <br />
            • 🎧 Hidden gems of the past and groundbreaking new releases
            continue to join our collection every day.
            <br />• 🚀 Let’s continue building this global archive
            together—onward to <strong>40,000 albums</strong> and beyond!
          </p>

          <h3 className="text-xl font-semibold mb-2 text-green-800">
            Aug 14, 2025
          </h3>
          <p className="text-left text-green-700 leading-7 mb-4">
            🎉🎉 We have officially surpassed{" "}
            <strong>20,000 registered albums</strong> in the database! 🚀 This
            marks an extraordinary milestone for our community of Hi-Res music
            lovers. Thank you to every user and contributor who helped make this
            possible—your passion is the heartbeat of this project. 🌍🎶✨
          </p>
          <p className="text-left text-green-700 leading-7 mb-6">
            • 🗓️ Just three years and five months since our launch, and we’ve
            already doubled the count from 10k to 20k.
            <br />
            • 🏔️ From the summit of one mountain, we’ve climbed to an even
            greater peak.
            <br />
            • 🌌 The view now? A breathtaking horizon filled with limitless
            musical possibilities.
            <br />
            • 🎧 Each album represents a story, a moment in time, a piece of art
            waiting to be discovered.
            <br />• 🚀 Let’s keep exploring, sharing, and celebrating Hi-Res
            Lossless music together—the journey is far from over!
          </p>
        </section>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={googleAdSlotId.updateNotice}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <section className="my-12 max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">About</h2>
          <p className="text-left text-gray-800 leading-8">
            This is a database where users who discover Hi-Res Lossless albums
            available on Apple Music can register them and share them with other
            users.
          </p>
        </section>

        <section className="my-12 max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Why I Created This Service
          </h2>
          <p className="text-left text-gray-800 leading-8">
            Apple launched high-resolution lossless distribution of Apple Music
            in June 2021. However, a way to directly search for high-resolution
            music sources has yet to be provided.
          </p>
          <p className="text-left text-gray-800 leading-8 mt-6">
            So I thought it would be very useful to have a database where Apple
            Music users could register and share high-resolution albums that
            they know, and I actually developed it.
          </p>
          <p className="text-left text-gray-800 leading-8 mt-6">
            Of course, I understand that sound quality is not the most important
            criterion for evaluating a piece of music.
          </p>
          <p className="text-left text-gray-800 leading-8 mt-6">
            However, I believe that the desire for better sound quality is
            rooted in the natural instincts of human beings, and above all, it
            would be wonderful if this service could help us discover unknown
            and amazing music that we have never had the chance to experience in
            the culture we grew up in.
          </p>
          <p className="text-left text-gray-800 leading-8 mt-6">
            If you know of a high-resolution album that has not yet been
            registered in this database, please add it. Any small contribution
            would be greatly appreciated.
          </p>
          <p className="text-left text-gray-800 leading-8 mt-6">
            Let&apos;s enjoy the universal language of the world: music!
          </p>
        </section>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={googleAdSlotId.whyICreatedThisService}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <section className="my-12 max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            App Overview
          </h2>
          <ul className="list-disc text-left text-gray-800 leading-8 ml-6">
            <li>
              You can easily add Hi-Res Lossless albums found on Apple Music to
              the database with just a few simple steps (Apple ID login
              required).
            </li>
            <li>
              Narrow down displayed content by filtering with
              &quot;Artist&quot;, &quot;Genre&quot;, &quot;Composer&quot;, and
              &quot;Sample Rate&quot;. Partial text search is also supported.
            </li>
            <li>
              You can “Like” your favorite albums to show appreciation and
              contribute to the ranking (Apple ID login required).
            </li>
            <li>
              You can choose how albums are sorted in the table: by registration
              order, by number of Likes, or at random.
            </li>
            <li>
              The app supports responsive design, making it usable on PC,
              tablet, and smartphone without limitations.
            </li>
          </ul>
        </section>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={googleAdSlotId.appOverview}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <section className="my-12 max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            How to Register an Album
          </h2>

          {/* Desktop Instructions */}
          <h3 className="text-2xl font-semibold mb-4">On Desktop</h3>
          <ol className="list-decimal text-left text-gray-800 leading-8 ml-6">
            <li className="mb-6">
              Check the sample rate.
              <div className="my-4">
                <Image
                  src="/images/desktop/desktopss01.jpg"
                  alt="Check sample rate on desktop"
                  width={1712}
                  height={1886}
                  className="rounded-lg shadow-md"
                />
              </div>
            </li>
            <li className="mb-6">
              Copy the album link.
              <div className="my-4">
                <Image
                  src="/images/desktop/desktopss02.jpg"
                  alt="Copy album link on desktop"
                  width={1712}
                  height={1886}
                  className="rounded-lg shadow-md"
                />
              </div>
            </li>
            <li className="mb-6">
              Paste it into the app.
              <div className="my-4">
                <Image
                  src="/images/desktop/desktopss03.jpg"
                  alt="Paste link into the app on desktop"
                  width={1712}
                  height={1886}
                  className="rounded-lg shadow-md"
                />
              </div>
            </li>
          </ol>

          {/* Mobile Instructions */}
          <h3 className="text-2xl font-semibold mb-4">On Mobile</h3>
          <ol className="list-decimal text-left text-gray-800 leading-8 ml-6">
            <li className="mb-6">
              Check the sample rate.
              <div className="grid grid-cols-2 gap-4 my-4">
                <Image
                  src="/images/mobile/mobiless01.jpg"
                  alt="Check sample rate on mobile"
                  width={621}
                  height={1334}
                  className="rounded-lg shadow-md"
                />
                <Image
                  src="/images/mobile/mobiless02.jpg"
                  alt="Check sample rate on mobile step 2"
                  width={621}
                  height={1334}
                  className="rounded-lg shadow-md"
                />
                <Image
                  src="/images/mobile/mobiless03.jpg"
                  alt="Check sample rate on mobile step 3"
                  width={621}
                  height={1334}
                  className="rounded-lg shadow-md"
                />
              </div>
            </li>
            <li className="mb-6">
              Copy the album link.
              <div className="grid grid-cols-2 gap-4 my-4">
                <Image
                  src="/images/mobile/mobiless04.jpg"
                  alt="Copy album link on mobile"
                  width={621}
                  height={1334}
                  className="rounded-lg shadow-md"
                />
                <Image
                  src="/images/mobile/mobiless05.jpg"
                  alt="Copy album link on mobile step 2"
                  width={621}
                  height={1334}
                  className="rounded-lg shadow-md"
                />
              </div>
            </li>
            <li className="mb-6">
              Paste it into the app.
              <div className="grid grid-cols-2 gap-4 my-4">
                <Image
                  src="/images/mobile/mobiless06.jpg"
                  alt="Paste link into the app on mobile"
                  width={621}
                  height={1334}
                  className="rounded-lg shadow-md"
                />
              </div>
            </li>
          </ol>
        </section>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={googleAdSlotId.howToRegisterAnAlbum}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <section className="my-12 max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Frequently Asked Questions
          </h2>

          <h3 className="text-2xl font-semibold mb-4">
            I found an album that&apos;s different from Apple Music&apos;s
            content or has been removed. What should I do?
          </h3>
          <p className="text-left text-gray-800 leading-8">
            Please contact me via{" "}
            <Link
              href="https://www.facebook.com/anzumaru.software"
              size="lg"
              underline="hover"
              showAnchorIcon
            >
              Facebook
            </Link>
            ,{" "}
            <Link
              href="https://x.com/anzumaru_sw"
              size="lg"
              underline="hover"
              showAnchorIcon
            >
              X
            </Link>
            , or{" "}
            <Link
              href="mailto:anzumaru_software@icloud.com"
              size="lg"
              underline="hover"
              showAnchorIcon
            >
              email
            </Link>
            . I will make the necessary corrections.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-8">
            I want to delete my registered account, but where is the menu for
            that?
          </h3>
          <p className="text-left text-gray-800 leading-8">
            Unfortunately, there is no feature that allows users to delete their
            accounts directly. Please contact me via{" "}
            <Link
              href="https://www.facebook.com/anzumaru.software"
              size="lg"
              underline="hover"
              showAnchorIcon
            >
              Facebook
            </Link>
            ,{" "}
            <Link
              href="https://x.com/anzumaru_sw"
              size="lg"
              underline="hover"
              showAnchorIcon
            >
              X
            </Link>
            , or{" "}
            <Link
              href="mailto:anzumaru_software@icloud.com"
              size="lg"
              underline="hover"
              showAnchorIcon
            >
              email
            </Link>
            , and I will handle the deletion for you. However, any album data
            you have registered will not be removed from the database.
          </p>
        </section>

        <section className="my-12 max-w-2xl bg-blue-100 border border-blue-500 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-semibold mb-4 text-blue-800">
            Support My Work
          </h2>
          <p className="text-gray-800 leading-7">
            I develop and maintain the{" "}
            <strong>Apple Music Hi-Res Albums Database</strong> as an
            independent project. Software development is often a battle against
            sleepiness, and coffee is my greatest ally. If you enjoy this
            service, consider buying me a coffee to keep me energized! ☕✨
          </p>
          <div className="mt-6">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
              as={Link}
              href="https://ko-fi.com/anzumaru_software"
              size="lg"
              startContent={<KofiSymbol width={30} height={30} />}
            >
              Support me on Ko-fi
            </Button>
          </div>
        </section>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={googleAdSlotId.supportMyWork}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <section className="my-12 max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            In Conclusion
          </h2>
          <p className="text-left text-gray-800 leading-8">
            &quot;Apple Music Hi-Res Albums Database&quot; is a modest service
            developed for all those who love Apple and music. Please feel free
            to use it and enjoy discovering better music with friends around the
            world!
          </p>
        </section>
      </main>

      <footer className="w-full h-20 flex flex-col justify-center items-center border-t">
        <div className="flex gap-4 mt-8 mb-2">
          <SNSLinkButtons />
        </div>
        <p className="text-sm text-gray-500 mb-2">
          © 2022-{year}{" "}
          <Link
            isExternal
            href="https://ko-fi.com/anzumaru_software"
            underline="hover"
            showAnchorIcon
            size="sm"
          >
            Anzumaru Software
          </Link>
        </p>
        <div className="text-sm text-gray-500">
          <Link
            isExternal
            href="https://app.getterms.io/view/sHbek/privacy/en-us"
            underline="hover"
            showAnchorIcon
            size="sm"
          >
            Privacy Policy
          </Link>{" "}
          <Link
            isExternal
            href="https://app.getterms.io/view/sHbek/cookie/en-us"
            underline="hover"
            showAnchorIcon
            size="sm"
          >
            Cookie Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
