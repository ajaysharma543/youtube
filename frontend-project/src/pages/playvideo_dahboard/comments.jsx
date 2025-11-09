import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import commentApi from "../../api/comments";

function Comments({ video, commentVideoId }) {
  const { data: user } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!commentVideoId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await commentApi.getvideocomments(commentVideoId);
        const allComments = res.data.data.docs || [];
        setComments(allComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [commentVideoId, user?._id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("content", data.comment);

       const res = await commentApi.addcomment(commentVideoId,formData);
    console.log("Comment added:", res);

    setComments((prev) => [res.data.data, ...prev]);

      reset();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) return <p className="text-gray-400">Loading comments...</p>;

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-3 w-full">
        <img
          src={video.owner?.avatar?.url || "/default-avatar.png"}
          alt="User Avatar"
          className="w-10 h-10 object-cover rounded-full mt-3"
        />

        <div className="flex-1 flex flex-col">
          <textarea
            {...register("comment", { required: true })}
            placeholder="Write a comment..."
            className="w-full bg-transparent border-b border-gray-400 focus:border-gray-200 focus:outline-none resize-none p-2 text-white placeholder-gray-400"
            rows={1}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-3 py-1 text-gray-400 hover:bg-[#222222] rounded-2xl hover:text-white"
              onClick={() => reset()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-[#222222] text-white rounded-2xl"
            >
              Comment
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 space-y-3">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-[#222222] p-3 rounded-xl text-white">
            <p className="whitespace-pre-line">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
