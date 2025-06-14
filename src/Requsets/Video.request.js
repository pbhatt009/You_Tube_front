import asynchandeler from "../utils/wraper";
import axios from "axios";
const uploadVideo = asynchandeler(async (data) => {
   const result = await axios.post("/api/v1/video/uploadVideo", data, {
   
      withCredentials: true,
    });
    return result.data;
  })

  const getAllVideos = asynchandeler(async (data) => {
    // const result = await axios.get(`/api/v1/video/getallVideos?page=${data.page}&limit=${data.limit}&query=${data.query}&sortBy=${data.sortBy}&sortType=${data.sortType}&mine=${data.mine}`, {
    //   withCredentials: true,
    // });
            ////2nd method
    const result = await axios.get(`/api/v1/video/getallVideos`, {
      params: {
        page: data.page,
        limit: data.limit,
        query: data.query,
        sortBy: data.sortBy,
        sortType: data.sortType,
        mine: data.mine
      },
      withCredentials: true,
    });
    return result.data;
  })

const getVideoById = asynchandeler(async (id) => {
      const result = await axios.get(`/api/v1/video/getVideo/${id}`, {
        withCredentials: true,
      });
      return result.data;
    });

    const updateVideo = asynchandeler(async (id,data) => {
      const result = await axios.patch(`/api/v1/video/${id}/update`, data, {
        withCredentials: true,
      });
      return result.data;
    });
 const deleteVideo = asynchandeler(async (id) => {
      const result = await axios.delete(`/api/v1/video/${id}/delete`, {
        withCredentials: true,
      });
      return result.data;
    })
    
    const increseVideoViews = asynchandeler(async (id) => {
      const result = await axios.patch(`/api/v1/video/${id}/increseview`, {}, {
        withCredentials: true,
      });
      return result.data;
    });

    const changestatus = asynchandeler(async (id) => {
      const result = await axios.patch(`/api/v1/video/${id}/changestatus`,{}, {
        withCredentials: true,
      });
      return result.data;
    });

    export {
      uploadVideo,
      getAllVideos,
      getVideoById,
      updateVideo,
      deleteVideo,
      increseVideoViews,
      changestatus
    };