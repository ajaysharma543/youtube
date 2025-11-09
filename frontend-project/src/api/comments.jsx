import axiosclient from "./api";

const commentApi = {
  getvideocomments: (videoId) => axiosclient.get(`/comments/${videoId}`),
  addcomment: (videoId, data) => axiosclient.post(`/comments/${videoId}`, data),
};

export default commentApi;