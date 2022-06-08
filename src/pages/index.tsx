import type { NextPage } from "next";
import { useState } from "react";

import { Calculator } from "../components/Calculator";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  return (
    <>
      <Header />
      <Calculator
        setCurrentWidth={setCurrentWidth}
        setCurrentHeight={setCurrentHeight}
        currentWidth={currentWidth}
        currentHeight={currentHeight}
      />
    </>
  );
};

export default Home;
