import axiosclient from "./api";

const VideoApi = {
getallvideos: (params) => axiosclient.get("/video/all-videos", { params }),
};

export default VideoApi;