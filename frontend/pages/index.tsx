import Head from 'next/head';
import UploadBox from '../components/UploadBox';

export default function Home() {
  return (
    <>
      <Head>
        <title>PDF Compressor</title>
        <meta name="description" content="Compress your PDF files easily" />
      </Head>
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <UploadBox/>
      </main>
    </>
  );
}
