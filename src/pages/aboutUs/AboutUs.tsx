import axios from "axios";
import { useEffect, useState } from "react";

interface Volunteer {
  _id: string; // Assuming _id is a string, you can adjust the type accordingly
  name: string;
  email: string;
}

const AboutUs = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(
        "https://l2-b2-assignment-6-backend-mehrabhossain1-3kr1dkaln.vercel.app/api/v1/volunteers"
      );
      setVolunteers(response.data.volunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Our Volunteers</h2>
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer._id} className="mb-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">{volunteer.name}</p>
                <p className="text-gray-600">{volunteer.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
