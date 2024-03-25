import { useAppSelector } from "../../../redux/hooks";

const DonationPolicySection = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={` py-16 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              100% DONATION POLICY
            </h2>
            <p className="">
              Here you can describe the 100% donation policy in detail.
            </p>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <p className="">
              One Nation is a UK-based relief and development charity which has
              continued to support local and international relief projects to
              help improve lives. One Nation operates on a{" "}
              <span className="font-bold">100% donation policy</span>.
            </p>
            <p className="mt-4">
              We work under the guidance of the Charity Commission and scholars
              in order to ensure that funds are distributed according to both
              Islamic and UK charity laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPolicySection;
