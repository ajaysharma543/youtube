import { Router } from "express";
import { veryfyJWT } from "../middlewares/auth.middleware.js";
import { addToWatchLater, removeFromWatchLater } from "../controller/watchlater.controller.js";


const router = Router();

router.post("/add/:videoId", veryfyJWT, addToWatchLater);
router.delete("/remove/:videoId", veryfyJWT, removeFromWatchLater);

export default router;
