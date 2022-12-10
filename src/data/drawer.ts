import type { IconType } from "react-icons";
import { FaGrinSquint, FaHome, FaPiggyBank } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";

export type linkProps = {
  title: string;
  icon: IconType;
  href: string;
};

export const mainList: linkProps[] = [
  {
    title: "Home",
    icon: FaHome,
    href: "/",
  },
  {
    title: "About Me",
    icon: FaGrinSquint,
    href: "/aboutme",
  },
];

export const projectList: linkProps[] = [
  {
    title: "Money Track",
    icon: FaPiggyBank,
    href: "/moneytrack",
  },
  {
    title: "Chef Burp",
    icon: TbToolsKitchen2,
    href: "/chefburp",
  },
];
