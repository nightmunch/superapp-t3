import { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState<Date>();

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const clockClassName =
    "rounded-box flex flex-col bg-base-100 p-2 text-neutral-content shadow-md";

  const wordClassName = "text-xs";

  if (date) {
    return (
      <>
        <div className="mx-auto flex gap-2 pt-2 text-center sm:mx-0">
          <div className={clockClassName}>
            <span className="countdown font-mono text-4xl">
              <span
                style={
                  {
                    "--value": date.getHours() % 12 || 12,
                  } as React.CSSProperties
                }
              />
            </span>
            <span className={wordClassName}>hours</span>
          </div>
          <div className={clockClassName}>
            <span className="countdown font-mono text-4xl">
              <span
                style={
                  {
                    "--value": date.getMinutes(),
                  } as React.CSSProperties
                }
              />
            </span>
            <span className={wordClassName}>minutes</span>
          </div>
          <div className={clockClassName}>
            <span className="countdown font-mono text-4xl">
              <span
                style={
                  {
                    "--value": date.getSeconds(),
                  } as React.CSSProperties
                }
              />
            </span>
            <span className={wordClassName}>seconds</span>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Clock;
