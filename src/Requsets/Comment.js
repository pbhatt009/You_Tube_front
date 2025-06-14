import asynchandeler from "../utils/wraper";
import axios from "axios"

const addComment = asynchandeler(async (id,data) => {
  const result = await axios.post(`/api/v1/comment/${id}/addcomment`, data, {
    withCredentials: true,
  });
  return result.data;
});

const updateComment = asynchandeler(async (videoid,commentId,data) => {
  const result = await axios.patch(`/api/v1/comment/${videoid}/${commentId}/update`, data, {
    withCredentials: true,
  });
  return result.data;
});
const deleteComment = asynchandeler(async (videoid,commentId) => {
  const result = await axios.delete(`/api/v1/comment/${videoid}/${commentId}/delete`, {
    withCredentials: true,
  });
  return result.data;
});
const getAllComments = asynchandeler(async (videoid) => {
  const result = await axios.get(`/api/v1/comment/${videoid}/getcomments`, {
    withCredentials: true,
  });
  return result.data;
});

export { addComment, updateComment, deleteComment, getAllComments };