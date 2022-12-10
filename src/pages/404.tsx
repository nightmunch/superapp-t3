import type { NextPage } from "next/types";
import Image from "next/image";

const Custom404: NextPage = () => {
  return (
    <div className="card bg-base-300">
      <div className="card-body items-center gap-5">
        <Image
          className="!relative max-w-sm"
          src="/undraw_404.svg"
          alt="illustration superapp"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <h1 className="text-3xl">Page Not Found</h1>
      </div>
    </div>
  );
};

export default Custom404;
