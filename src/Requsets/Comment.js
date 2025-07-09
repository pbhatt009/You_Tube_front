import asynchandeler from "../utils/wraper";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const addComment = asynchandeler(async (id, data) => {
  const result = await axios.post(`${apiUrl}/v1/comment/${id}/addcomment`, data, {
    withCredentials: true,
  });
  return result;
});

const updateComment = asynchandeler(async (videoid, commentId, data) => {
  const result = await axios.patch(`${apiUrl}/v1/comment/${videoid}/${commentId}/update`, data, {
    withCredentials: true,
  });
  return result;
});

const deleteComment = asynchandeler(async (videoid, commentId) => {
  const result = await axios.delete(`${apiUrl}/v1/comment/${videoid}/${commentId}/delete`, {
    withCredentials: true,
  });
  return result;
});

const getAllComments = asynchandeler(async (videoid, data) => {
  const result = await axios.get(`${apiUrl}/v1/comment/${videoid}/getcomments`, {
    params: {
      page: data.page || 1,
      limit: data.limit || 30,
    },
    withCredentials: true,
  });
  return result;
});

export { addComment, updateComment, deleteComment, getAllComments };
