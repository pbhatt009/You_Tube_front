import {configureStore} from '@reduxjs/toolkit';
import authreducer from "./Auth_reducer.jsx"
import videomanager from './video_manager.jsx';
import  querySlice from './query.jsx'
const store=configureStore({
      reducer:{
          auth:authreducer,
          video:videomanager,
          query:querySlice
      }

})
export default store