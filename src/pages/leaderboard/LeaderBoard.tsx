import data from "../../json/topDonors.json";

const LeaderBoard = () => {
  console.log(data);
  return (
    <div>
      <h1>Top Donors</h1>
      <ul>
        {data.map((donor, index) => (
          <li key={index}>
            <div>Name: {donor.name}</div>
            <div>Total Amount Donated: {donor.totalAmount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
