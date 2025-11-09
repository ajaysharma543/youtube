import axiosclient from "./api";

const dislikeapi = {
  toggleVideodisLike: (videoId) => axiosclient.post(`/dislike/toggle-video/${videoId}`),
};

export default dislikeapi;