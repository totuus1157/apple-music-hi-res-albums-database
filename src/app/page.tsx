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
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const year = new Date().getFullYear().toString();

const HomePage: NextPage = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center">
        <Navbar position="static">
          <NavbarBrand>
            <Image src="/favicon.ico" alt="Site logo" width={36} height={36} />
            <p className="font-bold text-inherit leading-none text-left sm:text-center">
              <span className="block sm:inline align-top -mb-2">
                Apple Music
              </span>
              <br className="block sm:hidden" />
              <span className="block sm:inline align-top">
                Hi-Res Albums Database
              </span>
            </p>
          </NavbarBrand>
        </Navbar>

        <h1 className="text-5xl font-extrabold my-10 text-black">
          Discover Over 10,000
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

        <section className="my-8 max-w-3xl bg-green-100 border border-green-500 p-4 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-green-800">
            Update Notice
          </h2>
          <h3 className="text-xl font-semibold mb-2 text-green-800">
            June 22, 2025
          </h3>
          <p className="text-left text-green-700 leading-7 mb-6">
            📊 A powerful new feature has arrived! You can now explore detailed{" "}
            <strong>statistics on registered albums</strong>—including
            distributions by <strong>Sample Rate</strong> and{" "}
            <strong>Genre</strong>—through a brand new{" "}
            <strong>&quot;Album Stats&quot;</strong> chart modal. 🎧✨
          </p>
          <p className="text-left text-green-700 leading-7 mb-6">
            • 📈 Want to know how many albums are available in 96kHz? Or which
            genre leads the Hi-Res scene?
            <br />
            • 🎼 Our visual charts make it easier than ever to get a sense of
            what&apos;s in the database.
            <br />• 🖱️ Try clicking the{" "}
            <strong>
              &quot;View Album Stats ( {<FontAwesomeIcon icon={faChartBar} />} )
              &quot;
            </strong>{" "}
            button and see for yourself!
          </p>
          <p className="text-left text-green-700 leading-7 mb-6">
            This is just the beginning—we plan to expand this feature with even
            more insights over time. Thank you for supporting the evolution of
            the Apple Music Hi-Res Albums Database! 🚀📀
          </p>
          <h3 className="text-xl font-semibold mb-2 text-green-800">
            May 30, 2025
          </h3>
          <p className="text-left text-green-700 leading-7 mb-4">
            🎉🎉 We have officially surpassed{" "}
            <strong>10,000 registered albums</strong> in the database! 🚀 Thank
            you to all users and contributors for helping us reach this
            incredible milestone. Let’s continue sharing the joy of
            high-resolution music with the world! 🌍🎶✨
          </p>
          <p className="text-left text-green-700 leading-7 mb-6">
            • 🗓️ Three years and three months since our service first launched.
            <br />
            • 🏔️ We have finally climbed to the summit of one great mountain.
            <br />
            • 🌅 What does the view from this peak look like? A crystal-clear
            blue sky? A sea of white clouds stretching below?
            <br />
            • 👀 I can see yet more mountains lined up on the horizon.
            <br />
            • 🎧 The journey to discover Hi-Res Lossless albums is far from
            over. New masterpieces are born every day, and surely there are past
            treasures still waiting to be uncovered.
            <br />• 🎉 Let’s continue this exciting journey together! 🚀
          </p>
          <h3 className="text-xl font-semibold mb-2 text-green-800">
            May 12, 2025
          </h3>
          <p className="text-left text-green-700 leading-7 mb-6">
            🎉 We have surpassed <strong>9000 registered albums</strong> in the
            database! 🚀 As we set our sights on the grand milestone of{" "}
            <strong>10,000 albums</strong>, we humbly invite you to lend your
            passion and support—together, let’s make this dream a reality! ✨
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
              By pressing the &quot;Random Albums&quot; button, you can display
              10 albums selected at random, allowing you to discover unexpected
              music.
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
