import asynchandeler from "../utils/wraper";
import axios from "axios";

const addliketoVideo = asynchandeler(async (videoId) => {
  const result = await axios.post(`/api/v1/like/addlike`, {}, {
    params: { videoid:videoId },
    withCredentials: true,
  });
  return result;
});

const addliketocomment = asynchandeler(async (commentId) => {
  const result = await axios.post(`/api/v1/like/addlike`, {}, {
    params: {commentid:commentId },
    withCredentials: true,
  });
  return result;
});

const unlikevideo= asynchandeler(async (id) => {
  const result = await axios.delete(`/api/v1/like/unlikevideo/${id}`, {
 withCredentials: true,
  });
  return result;
});
const unlikecomment= asynchandeler(async (id) => {
  const result = await axios.delete(`/api/v1/like/unlikecomment/${id}`, {
 withCredentials: true,
  });
  return result;
});
export { addliketoVideo, addliketocomment, unlikevideo,unlikecomment };