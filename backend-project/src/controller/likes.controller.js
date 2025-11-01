import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/likes.model.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "video not found")
    }

    const likedAlready = await Like.findOne({
        video : videoId,
        likedBy : req.user._id
    })

    if(likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id);
        return res.status(200).json(new ApiResponse(200, {isliked : false}, "like deleted successfully"))
    }

    await Like.create({
        video : videoId,
        likedBy : req.user._id,
    }
    )
            return res.status(200).json(new ApiResponse(200, {isliked : true}, "liked successfully"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
const {commentId} = req.params;
    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "comment not found")
    }

    const commentalready = await Like.findOne({
        comment : commentId,
        likedBy : req.user._id
    })

    if(commentalready) {
        await Like.findByIdAndDelete(commentalready._id)
        return res.status(200).json(new ApiResponse(200, {isliked : false}, "like deleted successfully"))
    }

        await Like.create({
                comment: commentId,
                likedBy: req.user?._id,
            });
    
            return res
                .status(200)
                .json(new ApiResponse(
                    200, {
                        isLiked: true 
                    }, 
                    "comment liked sucessfully"
    
                ));

})

const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideosAggegate = await Like.aggregate([{
            $match : {
                likedBy : new mongoose.Types.ObjectId(req.user?._id)
            }
    },
    {
        $lookup : {
            from : "videos",
            localField : "video",
            foreignField : "_id",
            as : "videos",
            pipeline : [
                {
                    $lookup : {
                            from : "users",
                            localField : "owner",
                            foreignField : "_id",
                            as : "owner",
                            pipeline : [
                                {
                                    $project : {
                                        _id : 1,
                                        username : 1,
                                        fullname : 1,
                                        "avatar.url" : 1,
                                }
                                }
                            ]
                    }
                },
                {
        $unwind : "$owner"
    },
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
                            owner: "$owner"
                        }
    }
            ]
        }
    },
    {
            $unwind : "$videos"
        },
        {
            $project : {
                _id: 0,
                videos: "$videos"
            }
        }
])
return res.status(200)
.json(
    new ApiResponse(
        200,
        likedVideosAggegate,
        "liked video fetched successfully"
    )
)
})

export {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos
}
