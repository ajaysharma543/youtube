import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetSubscriptionState,
  setSubscriptionState,
  toggleSubscriptionFailure,
  toggleSubscriptions,
} from "../../redux/features/subscription";

function Subscriber({ video }) {
  const { data: user } = useSelector((state) => state.user);
  const { isSubscribed, loading, error } = useSelector(
    (state) => state.subscriber
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (video?.owner?.issubscribed) {
      dispatch(setSubscriptionState(true));
    }
  }, [video, dispatch]);

  const handleSubscriber = async () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    dispatch(resetSubscriptionState());
    try {
      const res = await dispatch(toggleSubscriptions(video.owner._id));
      const subscribed = res.subscribe;
      console.log("Subscription response:", subscribed);
      dispatch(setSubscriptionState(subscribed));
    } catch (error) {
      console.log(
        "Subscription failed:",
        error.response?.data || error.message
      );
      dispatch(toggleSubscriptionFailure());
    } finally {
      dispatch(toggleSubscriptionFailure());
    }
  };

  if (error) return <p>please try again</p>;

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-white font-semibold">
          {video.owner?.fullname || "Unknown"}
        </h2>
        <p className="text-gray-400 text-sm">
          {video.owner?.subscriberscount || 0} subscribers
        </p>
      </div>

      <button
        onClick={handleSubscriber}
        disabled={loading}
        className={`px-4 py-2 rounded-4xl ml-4 cursor-pointer transition-all duration-300 ${
          isSubscribed ? "bg-[#222222] text-white" : "bg-white text-black"
        } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isSubscribed ? "subscribed" : "Subscribe"}
      </button>
    </>
  );
}

export default Subscriber;
