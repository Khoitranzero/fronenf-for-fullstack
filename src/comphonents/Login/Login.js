import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.scss';
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContex';
const Login = (props) => {
    const {loginContext}= useContext(UserContext);
    let history = useHistory();
    const [valueLogin, setValueLogin]=useState("");
    const [password, setPassword]=useState("");

const defaultObjValidInput = {
    isValidValueLogin : true,
    isValidPassword : true
}

const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
    const handleCreateNewAccount =()=>{
      history.push("/register");
    }
    const handleLogin = async ()=> {
        setObjValidInput(defaultObjValidInput);
        if(!valueLogin){
            setObjValidInput({...defaultObjValidInput,isValidValueLogin : false})
            toast.error("please enter Email adress or your phone number");
            return;
        }
        if(!password){
            setObjValidInput({...defaultObjValidInput,isValidPassword : false})
            toast.error("please enter your password");
            return;
        }
     let response =   await loginUser(valueLogin,password);
     if(response  && +response.EC ===0) {
        let groupWithRoles = response.DT.groupWithRoles;
        let email=response.DT.email;
        let username =response.DT.username;
        let token =response.DT.access_token;
        let data ={
            isAuthenticated : true,
            token ,
            account: {groupWithRoles,email,username}
        }
        localStorage.setItem('jwt',token)
        //sessionStorage.setItem('account',JSON.stringify(data));
        loginContext(data);
        //success

        history.push("/users");
        //window.location.reload();
     }
     if(response && +response.EC !==0) {
        //error
        toast.error(response.EM)
     }
    }
    const handlePressEnter =(event)=> {
        if(event.code ==="Enter" && event.charCode===13) {
            handleLogin();
        }
    }
    // useEffect(()=>{
    //     let session=sessionStorage.getItem('account');
    //     if(session){
    //         history.push("/");
    //         window.location.reload();
    //     }
    // },[]);
    return (
        <div className="login-container">
        <div className="container">
            <div className="row px-3 px-sm-0">
                <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                    <div className='brand'>
                        TĐK Zero
                    </div>
                    <div className='detail'>
                        lgsdflkgsdfbfkpiefao
                    </div>
                </div>
                <div className="content-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <input type='text' 
                                className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                                placeholder='Email adress or your phone number'
                                value={valueLogin}
                                onChange={(event)=>{setValueLogin(event.target.value)}}
                        />
                        <input type='text' 
                          className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder='PassWord'
                            value={password}
                                onChange={(event)=>{setPassword(event.target.value)}}
                                onKeyPress={(event)=>handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={()=> handleLogin()}>Login</button>
                        <span className='text-center'><a className='fogot-password' href='#'>Fogot your password ?</a></span>
                        <hr/>
                        <div className='text-center'>
                        <button className='btn btn-success' onClick={()=> handleCreateNewAccount()}>
                             Create new acccount
                           </button>
                        </div>
                        
                
                </div>
            </div>


        </div>
        </div>
    )
   
    }
     export default Login; 