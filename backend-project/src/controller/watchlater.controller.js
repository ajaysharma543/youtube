import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Watchlater } from "../models/watchlater.model.js";

// ✅ Add to Watch Later using findOneAndUpdate
const addToWatchLater = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const updatedList = await Watchlater.findOneAndUpdate(
    { user: userId },
    { $addToSet: { videos: videoId } },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedList, "Video added to Watch Later"));
});

const removeFromWatchLater = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const updatedList = await Watchlater.findOneAndUpdate(
    { user: userId },
    { $pull: { videos: videoId } },
    { new: true }
  );

  if (!updatedList) {
    throw new ApiError(404, "Watch Later list not found for user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedList, "Video removed from Watch Later"));
});

export { addToWatchLater, removeFromWatchLater };
