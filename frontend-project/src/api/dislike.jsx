import axiosclient from "./api";

const dislikeapi = {
  toggleVideodisLike: (videoId) =>
    axiosclient.post(`/dislike/toggle-video/${videoId}`),
  getVideoDislikeStatus: (videoId) =>
    axiosclient.get(`/dislike/toggle-video/${videoId}`),
};

export default dislikeapi;
