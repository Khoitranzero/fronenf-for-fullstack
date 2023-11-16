import { useHistory , Redirect} from "react-router-dom";
import { useEffect, useState ,useContext} from 'react';
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContex";
const PrivateRoutes =(props)=>
{
    //let history = useHistory();
    const {user}=useContext(UserContext);
    if(user && user.isAuthenticated === true){
      return(
        <>
        <Route path={props.path} component={props.component}/>
        </>
      )
    }else{
      return <Redirect to='/login'></Redirect>
    }
      // useEffect(()=>{
      //   console.log("check context user", user);
      //    let secsion =sessionStorage.getItem('account');
      //    if(!secsion){
      //        history.push("/login");
      //        window.location.reload();
      //    }
      //    if(secsion){

      //    }
      //  },[]);
      //  return (
      //   <>
      //   <Route path={props.path} component={props.component}/>
      //   </>
      //  )
    }
export default PrivateRoutes;