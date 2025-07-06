import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import LoginPage from "../Pages/Login.jsx";
import RegisterPage from "../Pages/Register.jsx";
import UploadVideopage from "../Pages/Upload_video.jsx"
import HomePage from "../Pages/Home.jsx";
import timeAgo from "./Time_ago.jsx";
import Myvideos from "../Pages/MyVideos.jsx";
import Subscripition from "../Pages/Subscripition.jsx";
import WatchHistory from "../Pages/Watch_history.jsx";
import ChannelDashboard from "../Pages/Channel_Dashboard.jsx";
import EditChannelPage from "../Pages/Edit_channel.jsx";
import ChangePasswordPage from "../Pages/ChangePassword.jsx";
import UpdateVideoPage from "../Pages/update _Video.jsx";
import {register, loginreq, logoutreq, updaterefreshtoken, getcurrentUser, updateuser,getsubscripition, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword} from "../Requsets/User.requests.js"

import {  uploadVideo,
      getAllVideos,
      getVideoById,
      updateVideo,
      deleteVideo,
      increseVideoViews,
      changestatus} from "../Requsets/Video.request.js"


  import{subscribe, unsubscribe } from "../Requsets/subscripition.js"


export{
    Header,
    Footer,
    Sidebar,
    LoginPage,
    RegisterPage,
    UploadVideopage,HomePage,
    WatchHistory,
    ChannelDashboard,
    register, loginreq, logoutreq, updaterefreshtoken, getcurrentUser, updateuser, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword,
     uploadVideo,
      getAllVideos,
      getVideoById,
      updateVideo,
      deleteVideo,
      increseVideoViews,
      changestatus,
      getsubscripition,
    timeAgo,
    subscribe,unsubscribe,
    Myvideos,Subscripition,
    EditChannelPage,
    ChangePasswordPage,
    UpdateVideoPage,
}