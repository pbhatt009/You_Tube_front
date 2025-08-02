import asynchandeler from "../utils/wraper";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const uploadVideo = asynchandeler(async (data) => {
  const result = await axios.post(`${apiUrl}/v1/video/uploadVideo`, data, {
    withCredentials: true,
  });
  return result;
});

const getAllVideos = asynchandeler(async (data) => {
  const result = await axios.get(`${apiUrl}/v1/video/getallVideos`, {
    params: {
      page: data?.page || 1,
      limit: data?.limit || 10,
      query: data?.query || "",
      sortBy: data?.sortBy || "views",
      sortType: parseInt(data?.sortType) || -1,
      mine:-1
    },
    withCredentials: true,
  });
  return result;
});
const getAllmineVideos = asynchandeler(async (data) => {
  const result = await axios.get(`${apiUrl}/v1/video/getallmineVideos`, {
    params: {
      page: data?.page || 1,
      limit: data?.limit || 10,
      query: data?.query || "",
      sortBy: data?.sortBy || "views",
      sortType: parseInt(data?.sortType) || -1,
      mine:1
    },
    withCredentials: true,
  });
  return result;
});

const getVideoById = asynchandeler(async (id) => {
  const result = await axios.get(`${apiUrl}/v1/video/getVideo/${id}`, {
    withCredentials: true,
  });
  return result;
});

const updateVideo = asynchandeler(async (id, data) => {
  const result = await axios.patch(`${apiUrl}/v1/video/${id}/update`, data, {
    withCredentials: true,
  });
  return result;
});

const deleteVideo = asynchandeler(async (id) => {
  const result = await axios.delete(`${apiUrl}/v1/video/${id}/delete`, {
    withCredentials: true,
  });
  return result;
});

const increseVideoViews = asynchandeler(async (id) => {
  const result = await axios.patch(`${apiUrl}/v1/video/${id}/increseview`, {}, {
    withCredentials: true,
  });
  return result;
});

const changestatus = asynchandeler(async (id) => {
  const result = await axios.patch(`${apiUrl}/v1/video/${id}/changestatus`, {}, {
    withCredentials: true,
  });
  return result;
});

export {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  increseVideoViews,
  changestatus,
  getAllmineVideos
};
