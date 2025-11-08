import axiosclient from "./api";

const likeApi = {
  toggleVideoLike: (videoId) => axiosclient.post(`/like/toggle-video/${videoId}`),
};

export default likeApi;