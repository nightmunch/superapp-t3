import type { NextPage } from "next";
import Clock from "../components/Clock";
import LoopingBar from "../components/LoopingBar";

const Home: NextPage = () => {
  return (
    <div className="mx-auto mt-5 flex max-w-3xl flex-col justify-center">
      <div className="mt-[-5rem] flex h-screen flex-col justify-center gap-5 p-5">
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
      <div className="flex h-screen flex-col justify-center gap-5 p-5">
        <div className="flex basis-1/2 flex-col justify-center gap-2">
          <h2 className="font-bold uppercase">Money Track</h2>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Track Your Finance
          </h1>
          <p className="text-md sm:text-xl">
            The app also features a user-friendly interface for tracking and
            managing your finances. With clear and concise categories for income
            and expenses, it&apos;s easy to stay on top of your spending and
            budgeting. Plus, the ability to generate detailed reports and
            analytics on your financial activity, makes it a great tool for
            anyone looking to take control of their money and make informed
            decisions.
          </p>
        </div>
        <div className="flex basis-1/2 flex-col justify-center gap-2">
          <h2 className="font-bold uppercase">Chef Burp</h2>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Community-Based Recipe Platform
          </h1>
          <p className="text-md sm:text-xl">
            Our recipe app is built on a strong community foundation. Users can
            share and edit their own recipes, as well as rate the recipes
            submitted by other users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
