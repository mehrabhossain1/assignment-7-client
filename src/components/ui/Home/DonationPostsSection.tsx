/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useDonationsQuery } from "../../../redux/features/donations/donationsApi";
import DonationCard from "../DonationCard";
import ViewAllButton from "../ViewAllButton";
import { useAppSelector } from "../../../redux/hooks";

const DonationPostsSection = () => {
  const { data } = useDonationsQuery("");
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={`my-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl text-center font-extrabold sm:text-4xl">
        Our Donations
      </h2>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {
            transition: { staggerChildren: 0.1, staggerDirection: -1 },
          },
        }}
      >
        {data?.donations?.slice(0, 6).map((donation: any, i: number) => (
          <motion.div
            key={donation._id}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: (i + 1) * 0.5, ease: "easeInOut" }}
          >
            <DonationCard donations={donation} />
          </motion.div>
        ))}
      </motion.div>
      <ViewAllButton />
    </div>
  );
};

export default DonationPostsSection;
