import { Router } from "express";
import { veryfyJWT } from "../middlewares/auth.middleware.js";
import {
  getdisLikedVideos,
  getVideoDislikeStatus,
  toggleVideodisLike,
} from "../controller/dislike.js";

const router = Router();

router.route("/toggle-video/:videoId").post(veryfyJWT, toggleVideodisLike);
router.route("/toggle-video/:videoId").get(veryfyJWT, getVideoDislikeStatus);
router.route("/videos").get(veryfyJWT, getdisLikedVideos);

export default router;
