import { GreenCircleIcon, YelloCircleIcon } from "./helper/Icon";
import Faqquestion from "./helper/Faqquestion";

interface Props {
  children?: React.ReactNode;
}
const Faq: React.FC<Props> = ({ children }) => {
  return (
    <section
      id="faq"
      className="mt-12 pt-[90px] max-w-[1336px] w-full mx-auto sm:pt-9 pb-[98px] relative bg-[#F1F1F1] rounded-[32px]"
    >
      <div className="max-w-[782px] w-full mx-auto px-3 xl:px-0 flex flex-col gap-[52px] ">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-center text-[#163930] text-[35px] leading-[40px] sm:text-[48px] sm:leading-[52px] font-instrument font-bold">
              FAQ<span className="text-[#000F0B]">s</span>
            </h2>
          </div>
          <div>
            <p className="text-center opacity-80 tetx-[#111] font-instrument font-normal text-[16px] leading-6">
              Can’t find the answer you’re looking for? Reach out to our{" "}
              <a
                href="mailto:contact@yourhomebase.co"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                customer support
              </a>{" "}
              team.
            </p>
          </div>
        </div>
        <div>
          <Faqquestion />
        </div>
        <div className="absolute top-[241px] left-[110px] z-[-1]">
          <YelloCircleIcon />
        </div>
        <div className="absolute bottom-[146px] right-[65px] z-[-1]">
          <GreenCircleIcon />
        </div>
      </div>
    </section>
  );
};

export default Faq;
