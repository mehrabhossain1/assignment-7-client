import { useEffect, useState } from "react";

interface Donor {
  name: string;
  totalAmount: number;
}

const LeaderBoard = () => {
  const [data, setData] = useState<Donor[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data.leaderboard));
  }, []);

  return (
    <div className="min-h-screen mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">
        Our Top Donors ({data.length})
      </h1>
      <ul className="divide-y divide-gray-200">
        {data.map((donor, index) => (
          <li key={index} className="py-4">
            <div className="font-semibold text-2xl">Name: {donor.name}</div>
            <div className="underline">
              Total Amount Donated:{" "}
              <span className="text-green-500 font-bold">
                {donor.totalAmount}$
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
