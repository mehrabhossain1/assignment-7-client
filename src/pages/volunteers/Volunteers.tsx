/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Volunteers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Send POST request to create volunteer
      await axios.post(
        "https://l2-b2-assignment-6-backend-mehrabhossain1.vercel.app/api/v1/volunteers",
        {
          name,
          email,
          phone,
          location,
        }
      );

      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      toast.success("You have successfully signed up as a volunteer!");

      navigate("/about-us");
    } catch (error) {
      console.error("Error signing up as a volunteer:", error);
      toast.success(
        "Failed to sign up as a volunteer. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up as a Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 font-semibold">
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 font-semibold">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          {submitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Volunteers;
