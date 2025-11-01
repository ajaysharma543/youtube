import { Router } from "express";
import { veryfyJWT } from "../middlewares/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleVideoLike } from "../controller/likes.controller.js";

const router = Router();

router.route("/toggle-video/:videoId").post(veryfyJWT, toggleVideoLike )
router.route("/videos").get(veryfyJWT, getLikedVideos )
router.route("/toggle-comment/:commentId").post(veryfyJWT, toggleCommentLike )

export default router;