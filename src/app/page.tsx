import type { NextPage, Metadata } from "next";
import Image from "next/image";
import GoogleAd from "app/googlead";
import { Link, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const metadata: Metadata = {
  title: "Home Page",
  description:
    "Explore and share Hi-Res Lossless albums on Apple Music with our comprehensive database. Discover new music and contribute by adding your favorite high-quality albums.",
};

const SLOT_ID = "1788301069";

const year = new Date().getFullYear().toString();

const HomePage: NextPage = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center">
        <h1 className="text-5xl font-extrabold my-10 text-black">
          Apple Music Hi-Res Albums Database
        </h1>

        <section className="my-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            A List of Hi-Res Lossless Albums for All &quot;Apple and Music
            Lovers&quot;
          </h2>
        </section>

        <div className="w-full max-w-[728px] mx-auto">
          <GoogleAd
            slot={SLOT_ID}
            format="auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="my-12">
          <Button
            href="/datatable"
            as={Link}
            size="lg"
            color="primary"
            showAnchorIcon
          >
            View Hi-Res Albums
          </Button>
        </div>

        <section className="my-8 max-w-3xl bg-yellow-100 border border-yellow-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-yellow-800">
            Notice to Users Before April 2024
          </h2>
          <p className="text-left text-yellow-700 leading-7">
            Due to a complete overhaul, previously registered album data can no
            longer be deleted.{" "}
            <span className="line-through">
              Additionally, not all album data could be migrated due to my
              residential area constraints.
            </span>{" "}
            (Resolved on October 9, 2024.)
          </p>
        </section>

        <section className="my-8 max-w-3xl bg-green-100 border border-green-500 p-4 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-green-800">
            Update Notice
          </h2>

          <h3 className="text-xl font-semibold mb-2 text-green-800">
            November 2, 2024
          </h3>
          <p className="text-left text-green-700 leading-7 mb-6">
            **Exciting New Feature:** The &apos;Random Albums&apos; button now
            allows you to randomly select 10 albums! Enjoy discovering
            unexpected music with just one click.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-green-800">
            October 30, 2024
          </h3>
          <p className="text-left text-green-700 leading-7 mb-6">
            **Improved Content Display for Composer Column:** In cases where the
            Composer cell contains a large amount of information, it has been
            adjusted to truncate the content for better readability. This change
            does not affect the search functionality in any way.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-green-800">
            October 19, 2024
          </h3>
          <p className="text-left text-green-700 leading-7 mb-6">
            🎉 We have surpassed <strong>1000 registered albums</strong> in the
            database! Thank you to all contributors for your support! Let&apos;s
            keep discovering amazing music together! 🎶🌟
          </p>
        </section>

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
              Filter content by &quot;Artist&quot; &quot;Genre&quot;
              &quot;Composer&quot; and &quot;Sample Rate&quot; to narrow down
              what is displayed.
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
              isExternal
              href="https://x.com/totuus_tweet"
              underline="hover"
              showAnchorIcon
            >
              X
            </Link>{" "}
            or{" "}
            <Link
              href="mailto:totuus_webservices@icloud.com"
              underline="hover"
              showAnchorIcon
            >
              my email
            </Link>
            . I&apos;ll make the necessary corrections.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-8">
            I want to delete my registered account, but where is the menu for
            that?
          </h3>
          <p className="text-left text-gray-800 leading-8">
            Unfortunately, there is no feature that allows users to delete their
            accounts directly. Please contact me via{" "}
            <Link
              isExternal
              href="https://x.com/totuus_tweet"
              underline="hover"
              showAnchorIcon
            >
              X
            </Link>{" "}
            or{" "}
            <Link
              href="mailto:totuus_webservices@icloud.com"
              underline="hover"
              showAnchorIcon
            >
              my email
            </Link>
            , and I&apos;ll handle the deletion for you. However, any album data
            you have registered will not be removed from the database.
          </p>
        </section>

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
          <Button
            as={Link}
            href="https://twitter.com/intent/tweet?text=Apple%20Music%20Hi-Res%20Albums%20Database%0A%0A&url=https%3A%2F%2Fwww.applemusichiresalbumsdb.com&hashtags=Applemusichiresalbumsdb,AppleMusic,Apple"
            isExternal
            size="lg"
            className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
          >
            {<FontAwesomeIcon icon={faSquareXTwitter} />}
          </Button>
          <Button
            as={Link}
            href="mailto:totuus_webservices@icloud.com"
            size="lg"
            className="bg-transparent text-black shadow-none hover:bg-transparent hover:shadow-none"
          >
            {<FontAwesomeIcon icon={faEnvelope} />}
          </Button>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          © {year}{" "}
          <Link
            isExternal
            href="https://x.com/totuus_tweet"
            underline="hover"
            showAnchorIcon
            size="sm"
          >
            Totuus1157
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
