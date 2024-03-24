/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";

const CreateTestimonial = () => {
  const [postId, setPostId] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Send POST request to create testimonial
      await axios.post(
        "https://l2-b2-frontend-path-assignment-6-server-starter-pack-topaz.vercel.app/api/v1/testimonials",
        {
          postId,
          author,
          message,
        }
      );
      // Reset form fields
      setPostId("");
      setAuthor("");
      setMessage("");
      alert("Testimonial posted successfully!");
    } catch (error) {
      console.error("Error posting testimonial:", error);
      alert("Failed to post testimonial. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Post Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postId">Donation Post ID:</label>
          <input
            type="text"
            id="postId"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Your Name:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Testimonial:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
};

export default CreateTestimonial;
