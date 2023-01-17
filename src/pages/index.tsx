import type { NextPage } from "next";
import Clock from "../components/Clock";
import LoopingBar from "../components/LoopingBar";

const Home: NextPage = () => {
  return (
    <div className="mx-auto mt-5 flex max-w-3xl flex-col justify-center">
      <div className="flex h-[calc(100vh-8rem)] flex-col justify-center gap-5 p-5">
        <h1 className="text-center text-4xl font-bold sm:text-6xl">
          <span className="text-primary">Simplify</span> and{" "}
          <span className="text-secondary">Organize</span>
          <span> your life with our </span>
          <span className="whitespace-pre">All-in-One app</span>
        </h1>
        <LoopingBar />
        <div className="flex justify-center">
          <Clock />
        </div>
      </div>
      {/* <div className="flex h-[calc(100vh-8rem)] flex-col justify-center gap-5 p-5">
        Test
      </div> */}
    </div>
  );
};

export default Home;
