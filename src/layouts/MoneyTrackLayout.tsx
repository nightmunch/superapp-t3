import type { ReactNode } from "react";
import { ApplicationHeader } from "../components/ApplicationHeader";
import { SubNavbar } from "../components/moneytrack/SubNavbar";

const MoneyTrackLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ApplicationHeader
        application={{
          title: "Money Track",
          description: "Track your expenses and saving daily with this app.",
        }}
      />
      <SubNavbar />
      <div className="card bg-base-300 shadow-md">
        <div className="card-body">{children}</div>
      </div>
    </>
  );
};

export default MoneyTrackLayout;
