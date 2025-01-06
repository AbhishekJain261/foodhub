import React, { useEffect, useState } from "react";
import Input from "../input";
import api from "@/utils/api";
import { log } from "console";
import { useParams } from "next/navigation";
import Image from "next/image";

interface CommentData {
  id: string;
  _id: string;
  text: string;
  date: string;
  replies: [{ _id: string; text: string; date: string }];
}

const Comment = ({ dataID }: { dataID: string }) => {
  const params = useParams();

  const [getAllComment, setAllComment] = useState<CommentData[]>([]);
  console.log(getAllComment);

  const [pushComment, setPushComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputReply, setInputReply] = useState(false);
  const [commentUserID, setCommentUserID] = useState("");
  const getComment = async () => {
    if (!params) {
      return;
    }

    try {
      const response = await api.getProductByComments(params.id);
      setAllComment(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to fetch comments.");
    }
  };

  const handlePutComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Reset any previous error

    if (!pushComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await api.postComment(params?.id, {
        comment: pushComment,
      });
      getComment();
      setPushComment("");
    } catch (err: any) {
      console.error("Error posting comment:", err);
      setError(err.response?.data?.error || "Failed to post comment.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  const deleteComment = async (commentId: string) => {
    try {
      const response = await api.deleteComment(params?.id, commentId);
      getComment();
    } catch (err) {}
  };

  useEffect(() => {
    if (params) {
      getComment();
    }
  }, [params]);

  const formatDate = (isoDate: any) => {
    const givenDate = new Date(isoDate);
    const now = new Date();
    const diffInMs = now.getTime() - givenDate.getTime(); // Time difference in milliseconds
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 365) {
      return `${diffInDays}d`;
    } else {
      return givenDate.getFullYear().toString();
    }
  };

  const handleOpenInput = (commentId: string) => {
    setInputReply(true);
    setCommentUserID(commentId);
  };

  const handleReplyButton = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!replyComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    console.log(params?.id, commentUserID, replyComment, "hello");
    setLoading(true);
    try {
      const response = await api.replyComment(params?.id, commentUserID, {
        text: replyComment,
      });
      getComment();
      // setReplyComment("");
    } catch (err) {
      console.error("Error replying to comment:", err);
      setError("An error occurred while replying to the comment.");
    } finally {
      setLoading(false);
    }
  };

  const deletereply = async (replyId: string) => {
    console.log(params?.id, commentUserID, replyId)
    try {
      const response = await api.deletereply(params?.id, commentUserID, replyId);
      console.log(response);
      
      getComment();
    } catch (err) {}
  };

  return (
    <div className="mt-9">
      <h2 className="text-xl font-semibold">
        Comments ({getAllComment.length})
      </h2>

      {/* Error Feedback */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Comments List */}
      <div className="comments-list mb-4">
        {getAllComment.length > 0 ? (
          getAllComment.map((comment) => (
            <>
              <div className="flex w-full">
                <div className="flex w-full gap-2 mt-5">
                  <div className="w-[50px] h-[50px] rounded-full">
                    <Image
                      src="/img/dummy-image.jpg"
                      className="rounded-full"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <h2 className="font-medium text-lg">Abhishek</h2>
                      <h3>{comment?.text}</h3>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>{formatDate(comment?.date)}</p>
                      <p
                        className="cursor-pointer"
                        onClick={() => handleOpenInput(comment._id)}
                      >
                        Reply
                      </p>
                      <p>{comment._id}</p>
                    </div>
                  </div>
                </div>
                <div key={comment?.text} className="relative mb-2 p-2 rounded">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 right-5 text-red-400 cursor-pointer"
                    onClick={() => deleteComment(comment._id)}
                  >
                    x
                  </div>
                </div>
              </div>
              {comment?.replies?.map((index) => (
                <div className="flex w-full px-10">
                  <div className="flex w-full gap-2 mt-5">
                    <div className="w-[50px] h-[50px] rounded-full">
                      <Image
                        src="/img/dummy-image.jpg"
                        className="rounded-full"
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <div className="flex gap-2 items-center">
                        <h2 className="font-medium text-lg">Lokesh</h2>
                        <h3>{index?.text}</h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p>{formatDate(index?.date)}</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => handleOpenInput(index._id)}
                        >
                          Reply
                        </p>
                        <p>{index._id}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    key={index?.text}
                    className="relative mb-2 p-2 rounded"
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-5 text-red-400 cursor-pointer"
                      onClick={() => deletereply(index._id)}
                    >
                      x
                    </div>
                  </div>
                </div>
              ))}
            </>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {inputReply && (
        <div className="text-right">
          <form
            className="w-full"
            onSubmit={(event) => {
              handleReplyButton(event);
            }}
          >
            <div className="flex items-start">
              <Input
                type="text"
                className="w-full rounded-br-none rounded-tr-none"
                placeholder="Write a comment..."
                value={pushComment}
                onChange={(e) => setReplyComment(e.target.value)}
              />
              <button
                type="submit"
                className="border btn rounded-bl-none rounded-tl-none ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comment Form */}
      <form className="w-full" onSubmit={handlePutComment}>
        <div className="flex items-start">
          <Input
            type="text"
            className="w-full rounded-br-none rounded-tr-none"
            placeholder="Write a comment..."
            value={pushComment}
            onChange={(e) => setPushComment(e.target.value)}
          />
          <button
            type="submit"
            className="border btn rounded-bl-none rounded-tl-none ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
