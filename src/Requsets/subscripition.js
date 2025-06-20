import asynchandeler from "../utils/wraper";
import axios from "axios";

const subscribe = asynchandeler(async (channelname) => {
  const result = await axios.post(`/api/v1/subscription/channel/${channelname}/subscribe`, {}, {
    withCredentials: true,
  });
  return result;
});
const unsubscribe = asynchandeler(async (channelname) => {
  const result = await axios.post(`/api/v1/subscription/channel/${channelname}/unsubscribe`, {}, {
    withCredentials: true,
  });
  return result;
});

export { subscribe, unsubscribe };