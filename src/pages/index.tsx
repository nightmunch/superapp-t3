import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { applicationList } from "../data/applicationlist";
import type { ApplicationProps } from "../data/applicationlist";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <ApplicationGrid />
    </>
  );
};

export default Home;

const Hero = () => {
  return (
    <div className="flex justify-center rounded-xl bg-base-300 p-2 shadow-md">
      <div className="flex flex-col gap-5 p-5 sm:flex-row-reverse">
        <div className="card bg-base-100">
          <div className="card-body">
            <Image
              className="!relative"
              src={"/undraw_my_app.svg"}
              alt={"illustration superapp"}
              fill
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-center text-4xl font-semibold text-primary sm:text-left sm:text-5xl">
            Super<span className="text-base-content">App</span>
          </h2>
          <p className="py-6">
            Welcome to one for all web application. Consist of personal finance,
            storage management and many more to come!
          </p>
          <LoopingBar />
          <Clock />
        </div>
      </div>
    </div>
  );
};

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
      <span className="text-xs text-gray-600">
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

const Clock = () => {
  const [date, setDate] = useState(new Date());

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
  return (
    <>
      <div className="mx-auto flex gap-2 pt-2 text-center sm:mx-0">
        <div className={clockClassName}>
          <span className="countdown font-mono text-4xl">
            <span
              style={
                { "--value": date.getHours() % 12 || 12 } as React.CSSProperties
              }
            />
          </span>
          <span className={wordClassName}>hours</span>
        </div>
        <div className={clockClassName}>
          <span className="countdown font-mono text-4xl">
            <span
              style={{ "--value": date.getMinutes() } as React.CSSProperties}
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
};

const ApplicationGrid = () => {
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h1 className="text-lg font-semibold text-primary">Application List</h1>
        <div className="grid gap-2 pt-2 sm:grid-cols-3">
          {applicationList.map((application, index) => (
            <ApplicationCard key={index} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplicationCard = ({
  application,
}: {
  application: ApplicationProps;
}) => {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-xl hover:border-primary">
      <figure className="relative px-10 pt-10">
        <Image
          className="!relative max-w-sm"
          src={application.image_src}
          alt={"illustration superapp"}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </figure>
      <div className="card-body items-center self-end text-center">
        <h2 className="card-title">{application.title}</h2>
        <p>{application.description}</p>
      </div>
    </div>
  );
};
