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

  const [selected, setSelected] = useState<"width" | "height">("width");

  const handleCalculate = () => {
    if (proportion !== 0 && wantedHeight !== 0) {
      setWantedWidth(Math.round(wantedHeight * proportion));
    }

    if (proportion !== 0 && wantedWidth !== 0) {
      setWantedHeight(Math.round(wantedWidth / proportion));
    }
  };

  const handleClear = () => {
    setWantedHeight(0);
    setWantedWidth(0);
  };

  return (
    <section className="flex flex-col gap-2 items-center mt-24 border-[1px] border-black rounded-md w-[460px] mx-auto p-10">
      <div className="flex items-center justify-center gap-4">
        <span className="flex flex-col w-[200px] gap-2">
          <input
            className="w-[200px]"
            type="number"
            placeholder="Width atual"
            onChange={e => setCurrentWidth(Number(e.target.value))}
          />
          <input
            className="w-[200px]"
            type="number"
            placeholder="Height atual"
            onChange={e => setCurrentHeight(Number(e.target.value))}
          />
        </span>
        <span className="flex flex-col w-[200px] gap-2">
          <select
            onChange={e => setSelected(e.target.value as "width" | "height")}
            value={selected}
          >
            <option value="width">Width</option>
            <option value="height">Height</option>
          </select>
          <input
            type="number"
            placeholder={
              selected === "height" ? "Height desejado" : "Width desejado"
            }
            disabled={disabled}
            className={`${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
            onChange={e =>
              selected === "height"
                ? setWantedHeight(Math.round(Number(e.target.value)))
                : setWantedWidth(Math.round(Number(e.target.value)))
            }
            value={
              selected === "height"
                ? wantedHeight === 0
                  ? ""
                  : wantedHeight
                : wantedWidth === 0
                ? ""
                : wantedWidth
            }
          />
        </span>
      </div>
      <span>Result: </span>
      <span className="h-8">
        {wantedHeight !== 0 && wantedWidth !== 0 && (
          <>
            {wantedWidth} Width x {wantedHeight} Height
          </>
        )}
      </span>
      <span className="flex justify-center gap-5">
        <button
          className="border-[1px] border-white p-3 rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer bg-green-600 text-white"
          disabled={disabled}
          onClick={handleCalculate}
        >
          Calcular
        </button>
        <button
          className="border-[1px] border-white p-3 rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer bg-green-600 text-white"
          disabled={disabled}
          onClick={handleClear}
        >
          Limpar
        </button>
      </span>
    </section>
  );
};
