"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HBLogo from "@/app/assets/svg/HBLogo";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SignOut from "@/actions/signOut";
import { sign } from "crypto";

interface HeaderProps {
  loggedInUser: boolean;
  firstName: string;
  lastName: string;
  signOut: () => Promise<void>;
}

interface ProfileButtonProps {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  signOut: () => Promise<void>;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ProfileButton({ firstName, lastName, signOut }: ProfileButtonProps) {
  const router = useRouter();
  async function handleSignOut() {
    await signOut();
  }
  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <div className="z-50">
        <Menu.Button className="z-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">
          {firstName} {lastName}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/service/dashboard/profile"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>

            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "z-50 block w-full px-4 py-2 text-left text-sm",
                    )}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function Header({
  loggedInUser,
  firstName,
  lastName,
  signOut,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white px-14 py-5 text-base leading-6 max-md:px-5">
      <div className="flex items-center gap-5">
        <Link href="/">
          <HBLogo />
        </Link>
      </div>

      {loggedInUser && (
        <div className="hidden gap-4 whitespace-nowrap font-semibold md:flex">
          <div className="relative flex items-center justify-center">
            <ProfileButton
              firstName={firstName}
              lastName={lastName}
              signOut={signOut}
            />
          </div>
        </div>
      )}

      {!loggedInUser && (
        <div className="hidden gap-4 whitespace-nowrap font-semibold md:flex">
          <Link href="/application">
            <button className="btn-outline grow justify-center rounded-lg border border-solid border-[color:var(--Primary-color,#366871)] bg-white px-8 py-3.5 text-center text-[#366871] hover:bg-[#366871]">
              Apply
            </button>
          </Link>

          <Link href="/login">
            <button className="grow justify-center rounded-lg border border-transparent bg-[#366871] px-8 py-3.5 text-center text-stone-50 hover:border hover:border-solid hover:border-[color:var(--Primary-color,#366871)] hover:bg-white hover:text-[#366871]">
              Login
            </button>
          </Link>
        </div>
      )}

      {/* <div className="md:hidden">
        <button
          className="text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
        </button>
      </div> */}

      {isOpen && (
        <div className="absolute left-0 right-0 top-full bg-white p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/service" onClick={toggleMenu}>
              Marketplace
            </Link>
            <Link href="/card" onClick={toggleMenu}>
              Card
            </Link>

            {/* {currentPath !== "/card" && (
              <>
                <Link href="/register/professional" onClick={toggleMenu}>
                  <button className="flex flex-col flex-1 justify-center px-8 py-3.5 bg-gray-200 rounded-lg text-zinc-800 hover:bg-[#366871] hover:text-white">
                    Join as a Pro
                  </button>
                </Link>
                <Link href="/register/service-user" onClick={toggleMenu}>
                  <button className="grow justify-center px-8 py-3.5 text-center rounded-lg border border-solid border-[color:var(--Primary-color,#366871)] text-[#366871] bg-white btn-outline hover:bg-[#366871]">
                    SignUp
                  </button>
                </Link>
                <Link href="/login" onClick={toggleMenu}>
                  <button className="border border-transparent grow justify-center px-8 py-3.5 text-center rounded-lg bg-[#366871] text-stone-50 hover:bg-white hover:text-[#366871] hover:border hover:border-solid hover:border-[color:var(--Primary-color,#366871)]">
                    Login
                  </button>
                </Link>
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
