import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { Calculator } from "../components/Calculator";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  return (
    <>
      <Head>
        <title>Image Resize Calculator - Perfect Proportions</title>
        <meta
          name="description"
          content="Calculate perfect proportions for your image resizing needs with our modern calculator tool."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Header />
        <Calculator
          setCurrentWidth={setCurrentWidth}
          setCurrentHeight={setCurrentHeight}
          currentWidth={currentWidth}
          currentHeight={currentHeight}
        />
      </div>
    </>
  );
};

export default Home;
