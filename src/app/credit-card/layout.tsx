import * as React from "react";
import Link from "next/link";
import SideBarLinks from "./SideBarLinks";

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
    <div className="flex min-h-screen  w-screen flex-row bg-zinc-100">
      <nav className="z-10 flex w-[324px] max-w-full flex-col bg-white pb-20 pl-10 pr-5 pt-6 text-base font-medium leading-6 text-zinc-800 max-md:pl-5">
        {/* {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))} */}
        <SideBarLinks />
      </nav>
      {children}
    </div>
  );
}
