import axiosclient from "./api";

const playlistApi = {
  createplaylist: (data) =>
    axiosclient.post(`/playlist/create`, data),
   getUserPlaylists: (userId) =>
    axiosclient.get(`/playlist/users/${userId}`),
   addVideoToPlaylist: ({playlistId, videoId}) =>
    axiosclient.patch(`/playlist/${playlistId}/addvideo/${videoId}`),
};

export default playlistApi;