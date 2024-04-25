"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoTransparent from "@/app/assets/LandingPage/LogoTransparent.png";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mx-auto flex w-full flex-col items-center rounded-[32px] bg-zinc-800 px-4 pb-6 pt-12 lg:px-20">
      <div className="ml-6 mr-6 mt-3 self-stretch  max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-[22%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex grow flex-col items-center whitespace-nowrap text-base leading-6 text-sky-100 max-md:mt-10">
              <Image
                alt="HomeBase Logo"
                loading="lazy"
                src={LogoTransparent}
                className=""
              />
              <div className="mt-4">Rewarding your world!</div>

              <div className="icon-container my-5 flex flex-row items-center justify-start gap-3 ">
                {/* LinkedIn */}
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/home-base-0501aa2a3/"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-[#366871] ">
                    <svg viewBox="0 0 448 512" height={15} fill="white">
                      <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                    </svg>
                  </div>
                </a>
                {/* Facebook */}
                <a
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61556982881913"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-[#366871] ">
                    <svg viewBox="0 0 320 512" height={15} fill="white">
                      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                    </svg>
                  </div>
                </a>
                {/* X */}
                <a target="_blank" href="https://twitter.com/yourhomebaseco">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-[#366871] ">
                    <svg viewBox="0 0 512 512" width={15} fill="white">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </div>
                </a>
                {/* Instagram */}
                <a
                  target="_blank"
                  href="https://www.instagram.com/findyourhomebase/"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-[#366871] ">
                    <svg viewBox="0 0 448 512" width={15} fill="white">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </div>
                </a>
                {/* <FontAwesomeIcon icon={faTimes} />
                <FontAwesomeIcon icon={faInstagram} />{" "} */}
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-[78%] flex-col items-end max-md:ml-0 max-md:w-full">
            <div className="mt-2.5 flex grow items-center justify-end gap-12 pr-9 text-sm leading-5 text-stone-50 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
              <div className="flex flex-1 flex-col whitespace-nowrap text-left">
                <div className="text-base font-medium leading-6">Company</div>
                <div className="mt-3">About</div>
                <div className="mt-2">Careers</div>
                <div className="mt-2">Newsroom</div>
              </div>
              <div className="flex flex-1 flex-col whitespace-nowrap text-left">
                <div className="text-base font-medium leading-6">Legal</div>
                <a
                  href="/files/HomeBaseTermsofUse.html"
                  target="_blank"
                  className="mt-3"
                >
                  Terms
                </a>
                <a
                  href="/files/HomeBaseOnlinePrivacyPolicy.html"
                  target="_blank"
                  className="mt-3"
                >
                  Privacy
                </a>
                <div className="mt-2">Disclosures</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center text-sm leading-5 text-white">
        HomeBase © 2024 | All Rights Reserved
      </div>
    </div>
  );
}
