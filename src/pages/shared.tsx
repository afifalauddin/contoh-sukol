import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Shared: NextPage = () => {
  const hello = api.greeting.hello.useQuery({ text: "from PARA[Shared]" }); //contoh backend call

  return (
    <>
      <Head>
        <title>Contoh Amin</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {hello.data && (
          <h1 className="text-4xl text-white">{hello.data.greeting}</h1>
        )}
      </main>
    </>
  );
};

export default Shared;