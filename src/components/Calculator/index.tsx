import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Toast } from "../Toast";

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
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

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
    if (currentWidth === 0 || currentHeight === 0) {
      setToast({
        message: "Please enter current dimensions first",
        type: "error",
      });
      return;
    }

    if (selected === "width" && wantedWidth === 0) {
      setToast({ message: "Please enter desired width", type: "error" });
      return;
    }

    if (selected === "height" && wantedHeight === 0) {
      setToast({ message: "Please enter desired height", type: "error" });
      return;
    }

    if (proportion !== 0 && wantedHeight !== 0) {
      setWantedWidth(Math.round(wantedHeight * proportion));
    }

    if (proportion !== 0 && wantedWidth !== 0) {
      setWantedHeight(Math.round(wantedWidth / proportion));
    }

    setToast({
      message: "Dimensions calculated successfully!",
      type: "success",
    });
  };

  const handleClear = () => {
    setWantedHeight(0);
    setWantedWidth(0);
    setToast({ message: "Results cleared", type: "info" });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="glass-effect rounded-2xl p-8 shadow-2xl">
            {/* Current Dimensions Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                Current Dimensions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Width (pixels)
                  </label>
                  <input
                    className="input-modern w-full"
                    type="number"
                    placeholder="Enter current width"
                    value={currentWidth === 0 ? "" : currentWidth}
                    onChange={e => setCurrentWidth(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Height (pixels)
                  </label>
                  <input
                    className="input-modern w-full"
                    type="number"
                    placeholder="Enter current height"
                    value={currentHeight === 0 ? "" : currentHeight}
                    onChange={e => setCurrentHeight(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Resize Settings Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                Resize Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Resize by
                  </label>
                  <select
                    className="select-modern w-full"
                    onChange={e =>
                      setSelected(e.target.value as "width" | "height")
                    }
                    value={selected}
                  >
                    <option value="width">Width</option>
                    <option value="height">Height</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {selected === "height" ? "Desired Height" : "Desired Width"}
                  </label>
                  <input
                    type="number"
                    className={`input-modern w-full ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder={
                      selected === "height"
                        ? "Enter desired height"
                        : "Enter desired width"
                    }
                    disabled={disabled}
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
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="btn-primary flex-1 disabled:opacity-50"
                disabled={disabled}
                onClick={handleCalculate}
              >
                Calculate Proportions
              </button>
              <button
                className="btn-secondary flex-1 disabled:opacity-50"
                disabled={disabled}
                onClick={handleClear}
              >
                Clear Results
              </button>
            </div>

            {/* Results Section */}
            <div className="glass-effect rounded-xl p-6 bg-white bg-opacity-5">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">
                Calculated Dimensions
              </h3>
              <div className="min-h-[60px] flex items-center justify-center">
                {wantedHeight !== 0 && wantedWidth !== 0 ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-primary-400 bg-clip-text">
                      {wantedWidth} × {wantedHeight}
                    </div>
                    <div className="text-sm text-gray-300 mt-2">
                      Width × Height (pixels)
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-lg mb-2">🔢</div>
                    <div>Enter dimensions and click calculate</div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {proportion > 0 && (
              <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                <div className="text-sm text-gray-300 text-center">
                  <strong>Aspect Ratio:</strong> {proportion.toFixed(4)}
                  <span className="mx-2">•</span>
                  <strong>Ratio:</strong> {currentWidth}:{currentHeight}
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Maintain perfect proportions for your image resizing needs</p>
          </div>
        </div>
      </div>
    </>
  );
};
