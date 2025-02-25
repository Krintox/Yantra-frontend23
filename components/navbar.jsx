"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ session }) {
  const [regArray, setRegArray] = useState([0, 0, 0]);

  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        cache: "no-store",
      })
        .then((resp) => resp.json())
        .then((data) => {
          //console.log(data?.user?.registeredEvents);
          if (data?.user?.registeredEvents?.length >= 0) {
            setRegArray(data?.user?.registeredEvents);
          }
        });
    }
  }, [session]);

  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  const loginHandler = () => {
    signIn("google", {
      callbackUrl: "/getdetails",
    });
  };

  const pathname = usePathname();

  const manageRef = useRef(null);
  const eventsRef = useRef(null);
  const manageRefSpan = useRef(null);
  const eventsRefSpan = useRef(null);

  const [respHidden, setRespHidden] = useState(true);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (ev) => {
      if (
        !(
          manageRef.current?.contains(ev.target) ||
          manageRefSpan.current?.contains(ev.target) ||
          eventsRef.current?.contains(ev.target) ||
          eventsRefSpan.current?.contains(ev.target)
        )
      ) {
        setDropdown1(false);
        setDropdown2(false);
      }
    });
  }, []);

  return (
    <>
      <div className="dark-mode:text-slate-200 dark-mode:bg-slate-800 w-full bg-[#1C1D20] text-slate-100">
        <div
          x-data="{ open: false }"
          className="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8"
        >
          <div className="flex flex-row items-center justify-between p-4">
            <Link
              className="dark-mode:text-white focus:shadow-outline rounded-lg text-lg font-semibold tracking-widest  focus:outline-none"
              onClick={() => {
                setRespHidden(true);
              }}
              href={"/"}
            >
              IGNITIA’23
            </Link>
            <button
              onClick={() => {
                setRespHidden((prev) => !prev);
              }}
              className="focus:shadow-outline rounded-lg focus:outline-none md:hidden"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                {respHidden && (
                  <path
                    x-show="!open"
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                )}
                {!respHidden && (
                  <path
                    x-show="open"
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                )}
              </svg>
            </button>
          </div>
          <nav
            className={`${
              respHidden && "hidden"
            } flex-grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0`}
          >
            <Link
              className={`bg-[#1C1D20] focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-transparent px-4 py-2 text-left text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0 md:ml-4 md:inline md:w-auto`}
              style={{ backgroundColor: pathname === "/" && "#374151" }}
              onClick={() => {
                setRespHidden(true);
              }}
              href="/"
            >
              Home
            </Link>
            {!(regArray[0] === 0 && regArray[1] === 0 && regArray[2] === 0 && regArray[3]===0 && regArray[4]===0) &&
              session && (
                <Link
                  className={`focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-transparent px-4 py-2 text-left text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0 md:ml-4 md:inline md:w-auto`}
                  style={{
                    backgroundColor: pathname === "/schedule" && "#374151",
                  }}
                  onClick={() => {
                    setRespHidden(true);
                  }}
                  href="/schedule"
                >
                  Schedule
                </Link>
              )}
            <div className="relative">
              <button
                ref={eventsRef}
                onClick={() => {
                  setDropdown1(!dropdown1);
                  setDropdown2(false);
                }}
                className={`focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-transparent px-4 py-2 text-left text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0 md:ml-4 md:inline md:w-auto`}
                style={{
                  backgroundColor:
                    pathname.split("/")[1] == "events" && "#374151",
                }}
              >
                <span ref={eventsRefSpan}>Events</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="mt-1 ml-1 inline h-4 w-4 transform transition-transform duration-200 md:-mt-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {dropdown1 && (
                <div className="z-10 absolute right-0 mt-2 w-full origin-top-right rounded-md shadow-lg md:w-32">
                  <div className="dark-mode:bg-slate-800 rounded-md bg-[#1C1D20] px-2 py-2 shadow">
                    <Link
                      className="bg-[#1C1D20] focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0"
                      onClick={() => {
                        setRespHidden(true);
                      }}
                      href="/events/hack"
                      style={{
                        backgroundColor:
                          pathname == "/events/hack" && "#374151",
                      }}
                    >
                      Ignitia Hack
                    </Link>
                    <Link
                      className="bg-[#1C1D20] focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0"
                      onClick={() => {
                        setRespHidden(true);
                      }}
                      href="/events/devops"
                      style={{
                        backgroundColor:
                          pathname == "/events/devops" && "#374151",
                      }}
                    >
                      DevOps
                    </Link>
                    <Link
                      className="bg-[#1C1D20] focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0"
                      onClick={() => {
                        setRespHidden(true);
                      }}
                      href="/events/product"
                      style={{
                        backgroundColor:
                          pathname == "/events/product" && "#374151",
                      }}
                    >
                      Product Management
                    </Link>
                    <Link
                      className="bg-[#1C1D20] focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0"
                      onClick={() => {
                        setRespHidden(true);
                      }}
                      href="/events/rocket"
                      style={{
                        backgroundColor:
                          pathname == "/events/rocket" && "#374151",
                      }}
                    >
                      OpenRocket
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {!(regArray[0] === 0 && regArray[1] === 0 && regArray[2] === 0) &&
              session && (
                <div className="relative" id="manage">
                  <button
                    ref={manageRef}
                    onClick={() => {
                      setDropdown2(!dropdown2);
                      setDropdown1(false);
                    }}
                    className={`${
                      pathname.split("/")[1] == "manage"
                    } focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-transparent px-4 py-2 text-left text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0 md:ml-4 md:inline md:w-auto`}
                    style={{
                      backgroundColor:
                        pathname.split("/")[1] == "manage" && "#374151",
                    }}
                  >
                    <span ref={manageRefSpan}>Manage</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="mt-1 ml-1 inline h-4 w-4 transform transition-transform duration-200 md:-mt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {dropdown2 && (
                    <div className="z-10 absolute right-0 mt-2 w-full origin-top-right rounded-md shadow-lg md:w-32">
                      <div className="dark-mode:bg-slate-800 rounded-md bg-[#1C1D20] px-2 py-2 shadow">
                        {regArray[0] ? (
                          <Link
                            className="bg-[#1C1D20] focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0"
                            onClick={() => {
                              setRespHidden(true);
                            }}
                            href="/manage/hack"
                            style={{
                              backgroundColor:
                                pathname == "/manage/hack" && "#374151",
                            }}
                          >
                            Ignitia Hack
                          </Link>
                        ) : "Not registered"}
                      </div>
                    </div>
                  )}
                </div>
              )}
            <button
              onClick={() => {
                session ? logoutHandler() : loginHandler();
                setRespHidden(true);
              }}
              className="focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-slate-700 hover:text-slate-100 focus:bg-slate-700 focus:text-slate-100 focus:outline-none md:mt-0 md:ml-4"
              href="#"
            >
              {session ? "Sign Out" : "Sign In"}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
