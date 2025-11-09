import mongoose, { isValidObjectId } from "mongoose";
import { Dislike } from "../models/dislike.model.js";
import { Like } from "../models/likes.model.js";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const toggleVideodisLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  // Remove like if exists
  await Like.findOneAndDelete({ video: videoId, likedBy: userId });

  // Check if already disliked
  const existingDislike = await Dislike.findOne({ video: videoId, dislikedBy: userId });

  if (existingDislike) {
    await Dislike.findByIdAndDelete(existingDislike._id);
  } else {
    await Dislike.create({ video: videoId, dislikedBy: userId });
  }

  const likeCount = await Like.countDocuments({ video: videoId });
  const dislikeCount = await Dislike.countDocuments({ video: videoId });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        isDisliked: !existingDislike,
        dislikeCount,
        likeCount,
      },
      existingDislike ? "Dislike removed" : "Video disliked successfully"
    )
  );
});



// ✅ Get All Disliked Videos
const getdisLikedVideos = asyncHandler(async (req, res) => {
  const dislikedaggregate = await Dislike.aggregate([
    {
      $match: {
        dislikedBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videos",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullname: 1,
                    "avatar.url": 1,
                  },
                },
              ],
            },
          },
          { $unwind: "$owner" },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              "videoFile.url": 1,
              "thumbnail.url": 1,
              views: 1,
              duration: 1,
              createdAt: 1,
              isPublished: 1,
              owner: "$owner",
            },
          },
        ],
      },
    },
    { $unwind: "$videos" },
    {
      $project: {
        _id: 0,
        videos: "$videos",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, dislikedaggregate, "Disliked videos fetched successfully"));
});

export { getdisLikedVideos, toggleVideodisLike };
