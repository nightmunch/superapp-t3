import type { NextPage } from "next/types";
import { ApplicationHeader } from "../../components/ApplicationHeader";
import { SubNavbar } from "../../components/moneytrack/SubNavbar";

const Transactions: NextPage = () => {
  return (
    <>
      <ApplicationHeader
        application={{
          title: "Money Track",
          description: "Track your expenses and saving daily with this app.",
        }}
      />
      <SubNavbar />
    </>
  );
};

export default Transactions;
