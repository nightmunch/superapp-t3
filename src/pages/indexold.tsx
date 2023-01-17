import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { applicationList } from "../data/applicationlist";
import type { ApplicationProps } from "../data/applicationlist";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import LoopingBar from "../components/LoopingBar";
import Clock from "../components/Clock";

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
  const [parent] = useAutoAnimate<HTMLDivElement>();
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
          <div ref={parent} className={"flex sm:items-center"}>
            <Clock />
          </div>
        </div>
      </div>
    </div>
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
