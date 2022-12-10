import Link from "next/link";
import { useRouter } from "next/router";

type tabProps = {
  name: string;
  href: string;
};

const tabList: tabProps[] = [
  {
    name: "Main",
    href: "moneytrack",
  },
  {
    name: "Transactions",
    href: "moneytrack/transactions",
  },
  {
    name: "Claim",
    href: "moneytrack/claim",
  },
  {
    name: "Net Worth",
    href: "moneytrack/networth",
  },
];

export const SubNavbar = () => {
  const { pathname } = useRouter();
  const currentTab = pathname.split("/")[
    pathname.split("/").length - 1
  ] as string;
  return (
    <div className="hide-scroll tabs tabs-boxed gap-2 overflow-x-auto whitespace-nowrap bg-neutral p-3">
      {tabList.map((tab, index) => (
        <Tab key={index} tab={tab} currentTab={currentTab} />
      ))}
    </div>
  );
};

const Tab = ({ tab, currentTab }: { tab: tabProps; currentTab: string }) => {
  return (
    <Link
      href={`/${tab.href}`}
      className={`tab ${
        currentTab == tab.href.split("/")[tab.href.split("/").length - 1]
          ? "tab-active"
          : ""
      }`}
    >
      {tab.name}
    </Link>
  );
};
