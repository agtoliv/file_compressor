import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PDF Compressor</title>
        <meta name="description" content="Compress your PDF files easily" />
      </Head>
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">Welcome to PDF Compressor</h1>
      </main>
    </>
  );
}
