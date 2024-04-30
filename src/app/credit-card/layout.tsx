import * as React from "react";
import Link from "next/link";
import SideBarLinks from "./SideBarLinks";
import { WhiteLogo } from "@/app/assets/svg/HBLogo";

import { Home, HomeIcon, LucideIcon } from "lucide-react";

// interface MenuItemProps {
//   icon: React.FC;
//   label: string;
//   href: string;
// }

// const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, href }) => {
//   return (
//     <Link href={href}>
//       <div className="flex items-center space-x-4 rounded-lg px-4 py-3 text-gray-600 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-primary">
//         <Icon className="h-6 w-6"/>
//         <span className="text-lg font-medium">{label}</span>
//       </div>
//     </Link>
//   );
// };

// const menuItems: MenuItemProps[] = [
//   {
//     icon: HomeIcon,
//     label: "Home",
//     href: "/",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4c33e7b1620c228f9ab5a40c5ba2e13dcb41eaf909eb3b6ede48577dd876b29?apiKey=f082dacefa12488dbded5c7e028d9a48&",
//     label: "Instant Book",
//     href: "/instant-book",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d88e392ad1bfe04a30323a6d53e2c26c50a9d457264db407d0cbfc0ca2aed118?apiKey=f082dacefa12488dbded5c7e028d9a48&",
//     label: "View Requests",
//     href: "/requests",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e48cb883b4ac9c44a80cf7c7abdd5056c0ab16d51657e5263655cfb09f2345b?apiKey=f082dacefa12488dbded5c7e028d9a48&",
//     label: "Scheduled Services",
//     href: "/scheduled-services",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/98c318629ecbc78e498403adfff5b04abd96dc6527209b37aefac7249770fe79?apiKey=f082dacefa12488dbded5c7e028d9a48&",
//     label: "Service History",
//     href: "/service-history",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/98c318629ecbc78e498403adfff5b04abd96dc6527209b37aefac7249770fe79?apiKey=f082dacefa12488dbded5c7e028d9a48&",
//     label: "Payment Accounts",
//     href: "/payment-accounts",
//   },
// ];

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomeBase",
  description: "Credit Card Innovation to PayOff Mortgage Debt",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {/* <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-gray-900/80"></div>

              <div className="fixed inset-0 flex">
                <div className="relative mr-16 flex w-full max-w-xs flex-1">
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5">
                      <span className="sr-only">Close sidebar</span>
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <li>
                              <a href="#" className="bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <svg className="h-6 w-6 shrink-0 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                Home
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <svg className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                                Transactions
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <svg className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>
                                Points / Rewards
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <svg className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>
                                Make a Payment
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-indigo-200">Solutions</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            <li>
                              
                              <a href="#" className="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">H</span>
                                <span className="truncate">Apply</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">T</span>
                                <span className="truncate">Limit Increase</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">W</span>
                                <span className="truncate">Connect Your Bank</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                            <svg className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div> */}

      {/* <!-- Static sidebar for desktop --> */}
      <div className="top-25 absolute hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
          <Link className="flex h-16 shrink-0 items-center text-white" href="/">
            <WhiteLogo />
          </Link>
          <SideBarLinks />
        </div>
      </div>

      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
