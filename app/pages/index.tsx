// pages/index.tsx

import Head from "next/head";

const UnderMaintenancePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Apple Music Hi-Res Albums Database</title>
        <meta name="description" content="Apple Music Hi-Res Albums Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Site Under Maintenance</h1>
        <p className="text-lg text-gray-700 mb-8">
          Our website is currently undergoing maintenance. We apologize for any
          inconvenience caused.
        </p>
      </main>

      <footer className="w-full h-12 flex justify-center items-center border-t mt-auto">
        <p className="text-sm text-gray-500">
          © 2024 Apple Music Hi-Res Albums Database
        </p>
      </footer>
    </div>
  );
};

export default UnderMaintenancePage;
