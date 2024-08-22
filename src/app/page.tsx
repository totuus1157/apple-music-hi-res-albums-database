import type { NextPage, Metadata } from "next";
import Link from "next/link";
import GoogleAd from "components/googlead";

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
          <Link
            href="/datatable"
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            passHref
          >
            View Hi-Res Albums
          </Link>
        </div>

        <section className="my-8 max-w-3xl bg-yellow-100 border border-yellow-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-yellow-800">
            Notice to Users Before April 2024
          </h2>
          <p className="text-left text-yellow-700 leading-7">
            Due to a complete overhaul, previously registered album data can no
            longer be deleted. Additionally, not all album data could be
            migrated due to my residential area constraints. I apologize for any
            inconvenience this may cause.
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
      </main>

      <footer className="w-full h-20 flex flex-col justify-center items-center border-t">
        {" "}
        <p className="text-sm text-gray-500 mb-2">
          © {year}{" "}
          <a
            href="https://github.com/totuus1157"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Totuus1157
          </a>
        </p>
        <div className="text-sm text-gray-500">
          <a
            href="https://app.getterms.io/view/sHbek/privacy/en-us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mr-4"
          >
            Privacy Policy
          </a>
          <a
            href="https://app.getterms.io/view/sHbek/cookie/en-us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Cookie Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
