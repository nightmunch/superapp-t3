import type { NextPage } from "next";

const New: NextPage = () => {
  return (
    <div className="mx-auto mt-5 flex max-w-3xl justify-center">
      <div className="flex flex-col gap-5 p-5 sm:flex-row-reverse">
        <h1 className="text-center text-6xl font-bold">
          <span className="text-primary">Simplify</span> and{" "}
          <span className="text-secondary">Organize</span>
          <span> your life with our </span>
          <span className="whitespace-pre">All-in-One app</span>
        </h1>
      </div>
    </div>
  );
};

export default New;
