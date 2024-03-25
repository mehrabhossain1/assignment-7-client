import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  text: string;
}
const Community = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios
      .get("http://localhost:5000/api/v1/comments")
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/comments", { text: newComment })
      .then((response) => {
        console.log("Response:", response.data);
        fetchComments(); // Fetch comments again to update the list
        setNewComment(""); // Clear the input field after submission
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Community Gratitude Wall: <br /> Total Comments:{" "}
        <span className="text-green-500">({comments.length})</span>
      </h1>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded">
            <p className="text-gray-800">{comment.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Express your gratitude..."
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        ></textarea>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Community;
