import { useState, useEffect } from "react";

const LoopingBar = () => {
  let timer: NodeJS.Timeout;
  const [counterState, setCounter] = useState(0);
  useEffect(() => {
    clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setInterval(() => {
      if (counterState >= 100.0) {
        clearInterval(timer);
        setCounter(0);
        return;
      }
      setCounter((prev) => prev + 0.1);
    }, 5);

    return () => clearInterval(timer);
  }, [counterState]);
  return (
    <>
      <span className="text-center text-xs text-gray-600">
        Why there is a loading bar here.?
      </span>
      <progress
        className="progress progress-primary w-full"
        value={counterState}
        max="100"
      ></progress>
    </>
  );
};

export default LoopingBar;
