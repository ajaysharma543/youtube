import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setdislikeState, toggledislikeFailure, toggledislikes } from "../../redux/features/disliked";
import { setlikeState } from "../../redux/features/likes";

function Dislikes({ video }) {
  const { data: user } = useSelector((state) => state.user);
  const { isDisliked, dislikeCount, loading, error } = useSelector((state) => state.dislike);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setdislikeState({
        isDisliked: video?.isDisliked || false,
        dislikeCount: video?.dislikeCount || 0,
      })
    );
  }, [video, dispatch]);

  const handleDisLikes = async () => {
    if (!user?._id) return navigate("/login");

    try {
      const { isDisliked, dislikeCount, likeCount } = await dispatch(toggledislikes(video._id))
      dispatch(setdislikeState({ isDisliked, dislikeCount }));
      dispatch(setlikeState({ isLiked: false, likeCount })); // reset like
    } catch (err) {
      console.log("Dislike failed:", err);
      dispatch(toggledislikeFailure(err.message));
    }
  };

  if (error) return <p>Something went wrong. Please try again.</p>;

  return (
    <button
      onClick={handleDisLikes}
      disabled={loading}
      className={`flex cursor-pointer items-center rounded-3xl justify-center text-white px-2 py-2`}
    >
      {isDisliked ? "👎" : "👎"} {dislikeCount}
    </button>
  );
}

export default Dislikes;
