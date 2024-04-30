"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon, HomeIcon, Coins } from "lucide-react";

// interface SideBarLinkProps {
//   href: string;
//   active: boolean;
//   title: string;
//   icon: React.FC;
// }

// const SideBarLink = ({ href, active, title, icon: Icon }: SideBarLinkProps) => {
//   return (
//     <li>
//       <Link
//         className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-primary hover:text-white ${active ? "bg-primary text-white" : ""} `}
//         href={href}
//       >
//         <Icon />
//         {title}
//       </Link>
//     </li>
//   );
// };

export default function SideBarLinks() {
  const pathname = usePathname();
  const linkDefaultClasses =
    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold";
  const onActiveClass = "bg-green-700 text-white" + " " + linkDefaultClasses;
  const onHoverClass =
    "text-white hover:text-white hover:bg-green-700" + " " + linkDefaultClasses;

  const svgDefault = "h-6 w-6 shrink-0";
  const svgActive = "text-white" + " " + svgDefault;
  const svgHover = "text-white group-hover:text-white" + " " + svgDefault;
  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {/* Home Component */}
          <li>
            <Link
              href="/credit-card/home"
              className={
                pathname === "/credit-card/home" ? onActiveClass : onHoverClass
              }
            >
              <svg
                className={
                  pathname === "/credit-card/home" ? svgActive : svgHover
                }
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home
            </Link>
          </li>
          {/* Pay Mortgage Component */}
          <li>
            <Link
              href="/credit-card/pay-mortgage"
              className={
                pathname === "/credit-card/pay-mortgage"
                  ? onActiveClass
                  : onHoverClass
              }
            >
              <svg
                // House SVG
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  pathname === "/credit-card/pay-mortgage"
                    ? svgActive
                    : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                />
              </svg>
              Pay Mortgage
            </Link>
          </li>
          {/* Transactions */}
          <li>
            <Link
              href="/credit-card/transactions"
              className={
                pathname === "/credit-card/transactions"
                  ? onActiveClass
                  : onHoverClass
              }
            >
              <svg
                //  Dollar Sign SVG
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={
                  pathname === "/credit-card/transactions"
                    ? svgActive
                    : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Transactions
            </Link>
          </li>
          {/* Rewards */}
          <li>
            <Link
              href="/credit-card/rewards"
              className={
                pathname === "/credit-card/rewards"
                  ? onActiveClass
                  : onHoverClass
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={
                  pathname === "/credit-card/rewards" ? svgActive : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              Rewards
            </Link>
          </li>

          <li>
            <Link
              href="/credit-card/payment-accounts"
              className={
                pathname === "/credit-card/payment-accounts"
                  ? onActiveClass
                  : onHoverClass
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={
                  pathname === "/credit-card/payment-accounts"
                    ? svgActive
                    : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
              Payment Accounts
            </Link>
          </li>
          <li>
            <Link
              href="/credit-card/mortgage-details"
              className={
                pathname === "/credit-card/mortgage-details"
                  ? onActiveClass
                  : onHoverClass
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={
                  pathname === "/credit-card/mortgage-details"
                    ? svgActive
                    : svgHover
                }
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              Mortgage Details
            </Link>
          </li>
        </ul>
      </li>
      <li></li>
    </ul>
  );
}
