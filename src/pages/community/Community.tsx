/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  text: string;
}
const Community = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        "https://l2-b2-frontend-path-assignment-6-server-starter-pack-topaz.vercel.app/api/v1/comments"
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://l2-b2-frontend-path-assignment-6-server-starter-pack-topaz.vercel.app/api/v1/comments",
        {
          text: newComment,
        }
      );
      fetchComments(); // Refresh comments after adding a new one
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      <h1>Community Gratitude Wall</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Express your gratitude..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      <div>
        {comments?.map((comment) => (
          <div key={comment?._id}>
            <p>{comment?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
