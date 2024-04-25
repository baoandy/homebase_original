import { GreenCircleIcon, YelloCircleIcon } from "./helper/Icon";
import Faqquestion from "./helper/Faqquestion";

interface Props {
  children?: React.ReactNode;
}
const Faq: React.FC<Props> = ({ children }) => {
  return (
    <section
      id="faq"
      className="relative mx-auto my-12 w-full max-w-[1336px] rounded-[32px] bg-[#F1F1F1] pb-[98px] pt-[90px] sm:pt-9"
    >
      <div className="mx-auto flex w-full max-w-[782px] flex-col gap-[52px] px-3 xl:px-0 ">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="font-instrument text-center text-[35px] font-bold leading-[40px] text-[#163930] sm:text-[48px] sm:leading-[52px]">
              FAQ<span className="text-[#000F0B]">s</span>
            </h2>
          </div>
          <div>
            <p className="tetx-[#111] font-instrument text-center text-[16px] font-normal leading-6 opacity-80">
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
        <div className="absolute left-[110px] top-[241px] z-[-1]">
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
