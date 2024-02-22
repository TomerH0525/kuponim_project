import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { authStore, logout } from './Components/Redux/AuthStore';
import axios from 'axios';
import clientInterceptor from './Components/Services/Interceptor';
import { useNavigate } from 'react-router-dom';

function tokenInterceptor(){
  axios.interceptors.request.use(request => {
      if(authStore.getState().token.length > 0)
          request.headers["Authorization"] = /*"Bearer " + */authStore.getState().token;
      return request;
  })
}



tokenInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout/>
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
