import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import LoginPage from "../Pages/Login.jsx";
import RegisterPage from "../Pages/Register.jsx";
import {register, login, logout, updaterefreshtoken, getcurrentUser, updateuser, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword} from "../Requsets/User.requests.js"







export{
    Header,
    Footer,
    Sidebar,
    LoginPage,
    RegisterPage,
    register, login, logout, updaterefreshtoken, getcurrentUser, updateuser, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword
}