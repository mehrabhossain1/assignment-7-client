/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";

const Volunteers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Send POST request to create volunteer
      await axios.post("http://localhost:5000/api/v1/volunteers", {
        name,
        email,
        phone,
        location,
      });
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      alert("You have successfully signed up as a volunteer!");
    } catch (error) {
      console.error("Error signing up as a volunteer:", error);
      alert("Failed to sign up as a volunteer. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Sign Up as a Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Volunteers;
