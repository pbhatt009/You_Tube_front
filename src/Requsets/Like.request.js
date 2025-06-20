import asynchandeler from "../utils/wraper";
import axios from "axios";

const addliketoVideo = asynchandeler(async (videoId) => {
  const result = await axios.post(`/api/v1/like/addlike`, {}, {
    params: { videoId },
    withCredentials: true,
  });
  return result;
});

const addliketocomment = asynchandeler(async (commentId) => {
  const result = await axios.post(`/api/v1/like/addlike`, {}, {
    params: {commentId },
    withCredentials: true,
  });
  return result;
});

const unlike= asynchandeler(async (commentid) => {
  const result = await axios.delete(`/api/v1/like/unlike/${commentid}`, {
 withCredentials: true,
  });
  return result;
});

export { addliketoVideo, addliketocomment, unlike };