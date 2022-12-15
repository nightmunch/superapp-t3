import { atom, useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { createElement, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";
import {
  FaBars,
  FaGithub,
  FaHashtag,
  FaLinkedin,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";
import { mainList, projectList } from "../data/drawer";
import type { LinkProps } from "../data/drawer";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { themeAtom } from "../hooks/useTheme";

const isOpenAtom = atom(false);

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <div>
      <Head>
        <title>SuperApp by nightmunch</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
        toastOptions={{
          className: "!bg-neutral !text-base-content",
          success: {
            className: "!bg-success",
          },
          error: {
            className: "!bg-error",
          },
        }}
      />
      <Drawer>
        <Navbar currentTheme={theme} setCurrentTheme={setTheme} />
        <div className="mx-auto flex min-h-screen w-11/12 flex-col gap-5 pt-5">
          {children}
          <Footer />
        </div>
      </Drawer>
    </div>
  );
};

export default MainLayout;

const Navbar = ({
  currentTheme,
  setCurrentTheme,
}: {
  currentTheme: string;
  setCurrentTheme: Dispatch<SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const { data: sessionData } = useSession();
  return (
    <div className="navbar sticky top-0 z-10 gap-2 bg-base-300 shadow-sm">
      <div className="flex-none">
        <button
          className="btn-ghost btn-square btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold normal-case text-primary">
          Super<span className="text-base-content">App</span>
        </h1>
      </div>
      <div className="flex flex-none gap-2">
        {currentTheme == "shahrin" ? (
          <button
            className="btn-ghost btn"
            data-set-theme="aimi"
            data-act-class="ACTIVECLASS"
            onClick={() => setCurrentTheme("aimi")}
          >
            <FaSun />
          </button>
        ) : (
          <button
            className="btn-ghost btn"
            data-set-theme="shahrin"
            data-act-class="ACTIVECLASS"
            onClick={() => setCurrentTheme("shahrin")}
          >
            <FaMoon />
          </button>
        )}
        {sessionData ? (
          <button
            className={`btn-error btn ${
              currentTheme == "shahrin" ? "btn-outline" : ""
            }`}
            onClick={() => signOut({ redirect: false })}
          >
            <FaSignOutAlt />
          </button>
        ) : (
          <button
            className={`btn-success btn ${
              currentTheme == "shahrin" ? "btn-outline" : ""
            }`}
            onClick={() => signIn("auth0")}
          >
            <FaSignInAlt />
          </button>
        )}
      </div>
    </div>
  );
};

const Drawer = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  return (
    <div className="drawer">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        ></label>
        <ul className="menu w-60 rounded-xl bg-base-100 p-4 text-base-content shadow-md">
          <h1 className="ml-3 text-3xl font-semibold text-primary">
            Super<span className="text-base-content">App</span>
          </h1>
          <div className="divider" />
          {mainList.map((link, index) => (
            <SidebarLink key={index} link={link} />
          ))}
          <div className="divider" />
          {projectList.map((link, index) => (
            <SidebarLink key={index} link={link} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const SidebarLink = ({ link }: { link: LinkProps }) => {
  const { pathname } = useRouter();
  const [, setIsOpen] = useAtom(isOpenAtom);
  const handleSelected = ({ className }: { className: string }) => {
    if (pathname == link.href) {
      return className;
    } else if (link.href != "/" && pathname.includes(link.href)) {
      return className;
    } else {
      return "";
    }
  };
  return (
    <li>
      <Link
        href={link.href}
        className={`${handleSelected({
          className: "bg-neutral",
        })}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-5">
          <span className={` ${handleSelected({ className: "text-primary" })}`}>
            {createElement(link.icon)}
          </span>
          <span className="font-semibold">{link.title}</span>
        </div>
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="footer mt-auto items-center bg-neutral p-4 text-neutral-content">
      <div className="grid-flow-col items-center">
        <FaHashtag size={36} />
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://www.linkedin.com/in/shahrinamin-2703/">
          <FaLinkedin size={24} className="hover:text-primary" />
        </Link>
        <Link href="https://github.com/nightmunch">
          <FaGithub size={24} className="hover:text-primary" />
        </Link>
      </div>
    </footer>
  );
};
