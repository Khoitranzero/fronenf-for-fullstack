import {
    BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
  import './App.scss';
  import NavHeader from './comphonents/Navigation/NavHeader';
  import Login from "./comphonents/Login/Login";
  import Register from "./comphonents/Register/Register";
  import { Logger } from "sass";
  import { ToastContainer } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';
import Users from "./comphonents/ManageUsers/Users";
import _ from 'lodash';
import { Bars } from  'react-loader-spinner'
import { useEffect, useState ,useContext} from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContex";
  function App() {
    const {user}=useContext(UserContext);
    // const [account,setAccount]=useState({});
    // useEffect(()=>{
    //   let secsion =sessionStorage.getItem('account');
    //   if(secsion){
    //     setAccount(JSON.parse(secsion));
    //   }
    // },[]);
    return (
      <>
      <Router>
        {user && user.isLoading?
        <div className="loading-container">  
      <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />  
    <div>Loading data ...</div>
    </div>
    :
    <>
     <div className="app-header">
          <NavHeader/>
        </div>
      <div className='app-container'>
        <AppRoutes/>
      </div>
    </>
      }
       
      </Router>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
</>
    );
  }
  
  export default App;
  