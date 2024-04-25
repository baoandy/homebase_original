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
          <li>
            <Link
              href="/dashboard"
              className={
                pathname === "/dashboard" ? onActiveClass : onHoverClass
              }
            >
              <svg
                className={pathname === "/dashboard" ? svgActive : svgHover}
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
          <li>
            <Link
              href="/dashboard/transactions"
              className={
                pathname === "/dashboard/transactions"
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
                  pathname === "/dashboard/transactions" ? svgActive : svgHover
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
          <li>
            <Link
              href="/dashboard/rewards"
              className={
                pathname === "/dashboard/rewards" ? onActiveClass : onHoverClass
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={
                  pathname === "/dashboard/rewards" ? svgActive : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              Points / Rewards
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/mortgage-details"
              className={
                pathname === "/dashboard/mortgage-details"
                  ? onActiveClass
                  : onHoverClass
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  pathname === "/dashboard/mortgage-details"
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
              Mortgage Details
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/pay-with-homebase"
              className={
                pathname === "/dashboard/pay-with-homebase"
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
                  pathname === "/dashboard/make-payment" ? svgActive : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
              Account
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/make-payment"
              className={
                pathname === "/dashboard/make-payment"
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
                  pathname === "/dashboard/make-payment" ? svgActive : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
              Make a Payment
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/manage-accounts"
              className={
                pathname === "/dashboard/manage-accounts"
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
                  pathname === "/dashboard/make-payment" ? svgActive : svgHover
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
              Manage Accounts
            </Link>
          </li>
        </ul>
      </li>
      <li>
        {/* <div className="text-xs font-semibold leading-6 text-indigo-200">Dwelling Card</div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                        <li>
                            <Link href="#" className={pathname === "/dashboard/apply" ? onActiveClass : onHoverClass}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={pathname === "/dashboard/transactions" ? svgActive : svgHover}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                Apply
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={pathname === "/dashboard/limit-increase" ? onActiveClass : onHoverClass}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={pathname === "/dashboard/make-payment" ? svgActive : svgHover}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                                </svg>
                                Limit Increase
                            </Link>
                        </li>
                    </ul> */}
      </li>
    </ul>
  );
}
