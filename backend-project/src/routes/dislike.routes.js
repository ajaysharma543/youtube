import { Router } from "express";
import { veryfyJWT } from "../middlewares/auth.middleware.js";
import { getdisLikedVideos, toggleVideodisLike } from "../controller/dislike.js";

const router = Router();

router.route("/toggle-video/:videoId").post(veryfyJWT, toggleVideodisLike )
router.route("/videos").get(veryfyJWT, getdisLikedVideos )

export default router;