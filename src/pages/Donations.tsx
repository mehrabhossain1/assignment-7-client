/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { useDonationsQuery } from "../redux/features/donations/donationsApi";
import ScrollTop from "../components/shared/ScrollTop";
import { useAppSelector } from "../redux/hooks";

const Donations = () => {
  const { data } = useDonationsQuery("");
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div>
      <ScrollTop />
      <div
        className={`min-h-screen grid px-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-20 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {data?.donations?.map((donation: any) => (
          <Card
            className={`${
              isDarkMode
                ? "bg-gray-900 text-white hover:!border-2 border-green-500"
                : "bg-white text-black"
            }`}
            key={donation._id}
            hoverable
            cover={
              <div
                style={{
                  overflow: "hidden",
                  height: "200px",
                  objectFit: "cover",
                }}
              >
                <img
                  className="hover:scale-105 transition-all"
                  alt="example"
                  src={donation.image}
                />
              </div>
            }
          >
            <div>
              <p className="font-bold my-2 text-xl">{donation.title}</p>
              <p className="line-clamp-2 my-2">{donation.description}</p>
              <p className="font-semibold">Category: {donation.category}</p>
              <p className="font-semibold">Amount: {donation.amount}$</p>
            </div>
            <div className="card-button mt-4">
              <Link to={`/donations/${donation._id}`}>
                <Button className="btn text-white w-full bg-green-500 hover:!bg-transparent hover:!text-green-500 hover:transition-all !border-green-500 ">
                  View Detail
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Donations;
