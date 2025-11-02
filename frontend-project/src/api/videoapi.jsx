import axiosclient from "./api";

const VideoApi = {
getallvideos: (params) => axiosclient.get("/video/all-videos", { params }),
uploadvideo: (data) => axiosclient.post("/video/upload", data),
};

export default VideoApi;