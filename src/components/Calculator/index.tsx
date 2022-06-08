import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ICalculator {
  currentWidth: number;
  currentHeight: number;
  setCurrentWidth: Dispatch<SetStateAction<number>>;
  setCurrentHeight: Dispatch<SetStateAction<number>>;
}

export const Calculator = ({
  currentWidth,
  currentHeight,
  setCurrentWidth,
  setCurrentHeight,
}: ICalculator) => {
  const [proportion, setProportion] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [wantedWidth, setWantedWidth] = useState(0);
  const [wantedHeight, setWantedHeight] = useState(0);

  useEffect(() => {
    setProportion(currentWidth / currentHeight);

    if (currentWidth === 0 || currentHeight === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    setWantedHeight(0);
    setWantedWidth(0);
  }, [currentWidth, currentHeight]);

  useEffect(() => {
    if (proportion !== 0 && wantedWidth !== 0) {
      setWantedHeight(Math.round(wantedWidth / proportion));
    }

    if (wantedWidth === 0) {
      setWantedHeight(0);
    }
  }, [proportion, wantedWidth]);

  useEffect(() => {
    if (proportion !== 0 && wantedHeight !== 0) {
      setWantedWidth(Math.round(wantedHeight * proportion));
    }

    if (wantedHeight === 0) {
      setWantedWidth(0);
    }
  }, [proportion, wantedHeight]);

  return (
    <section className="flex flex-col gap-4 items-center mt-24">
      <h2 className="text-3xl">Resize Calculator</h2>
      <div className="flex items-center gap-4">
        <span className="flex flex-col w-[200px] gap-2">
          <input
            type="number"
            placeholder="Width atual"
            onChange={e => setCurrentWidth(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Height atual"
            onChange={e => setCurrentHeight(Number(e.target.value))}
          />
        </span>
        <span className="flex flex-col w-[200px] gap-2">
          <input
            type="number"
            placeholder="Width desejado"
            disabled={disabled}
            className={`${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
            onChange={e => setWantedWidth(Math.round(Number(e.target.value)))}
            value={wantedWidth === 0 ? "" : wantedWidth}
          />
          <input
            type="number"
            placeholder="Height desejado"
            disabled={disabled}
            className={`${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
            onChange={e => setWantedHeight(Math.round(Number(e.target.value)))}
            value={wantedHeight === 0 ? "" : wantedHeight}
          />
        </span>
      </div>
    </section>
  );
};
