import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Register.scss';
import { useHistory } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {registerNewUser} from '../../services/userService';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultVaildInput = {
        isValidEmail: true,
        isValidPhone : true,
        isValidPassword: true,
        isValidConfirmPassword : true
    }
    const [objCheckInput, setObjCheckInput]= useState(defaultVaildInput)
    
    let history = useHistory();
    const handleLogin =()=>{
      history.push("/login");
    }
    const isValidInput = ()=> {
        setConfirmPassword(defaultVaildInput);
        if(!email){
            toast.error("email is requyred");
            setObjCheckInput({...defaultVaildInput, isValidEmail : false}); //copy defaultVaildInput xong ghi đè vào value isValidEmail of defaultVaildInput
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if(!regx.test(email)){
            setObjCheckInput({...defaultVaildInput, isValidEmail : false});
            toast.error("please enter a valid email address");
            return false;
        }
        if(!phone){
            setObjCheckInput({...defaultVaildInput, isValidPhone : false});
            toast.error("phone is requyred");
            return false;
        }
        if(!password){
            setObjCheckInput({...defaultVaildInput, isValidPassword : false});
            toast.error("password is requyred");
            return false;
        }
        if(password != confirmPassword){
            setObjCheckInput({...defaultVaildInput, isValidConfirmPassword : false});
            toast.error("your password is not the same");
            return false;
        }
        

        return true;
    }
    const handleRegister = async()=> {
        let check = isValidInput();
        if(check === true) {
           let serverData = await registerNewUser( email,phone, username, password);
           //let serverData = response.data;
           if(+serverData.EC ===0) {
            toast.success(serverData.EM);
            history.push("/login");
           }
           else {
            toast.error(serverData.EM);
           }
        }
      
        // let userData = {email,phone,username,password,confirmPassword};
        // console.log(userData);
    }
    useEffect(()=>{
    //    axios.get("http://localhost:8080/api/v1/test-api").then(data => {
    //        console.log("chek data : ", data)
    //     })
        // axios.post('http://localhost:8080/api/v1/register',{
        //     email,phone, username, password
        // })
    },[]);
    return (
        <div className="Register-container">
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
                <div className='brand d-sm-none'>
                        TĐK Zero
                    </div>
                    <div className='form-group'>
                        <label>Email : </label>
                    <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} 
                    placeholder='Email adress' value={email} onChange={(event)=> setEmail(event.target.value)}
                    />
                    </div>
                    <div className='form-group'>
                        <label>Phone number : </label>
                    <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}  placeholder=' Phone number'
                     value={phone} onChange={(event)=> setPhone(event.target.value)}
                    />
                    </div>
                    <div className='form-group'>
                        <label>User name : </label>
                    <input type='text' className='form-control' placeholder=' User name'
                     value={username} onChange={(event)=> setUsername(event.target.value)}
                    />
                    </div>
                    <div className='form-group'>
                        <label>Password : </label>
                        <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}  placeholder='PassWord'
                         value={password} onChange={(event)=> setPassword(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Re-enter password : </label>
                        <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}  placeholder=' Re-enter passWord'
                         value={confirmPassword} onChange={(event)=> setConfirmPassword(event.target.value)}
                        />
                    </div>
                        <button className='btn btn-primary' onClick={()=> handleRegister()}>Register</button>
                        <hr/>
                        <div className='text-center'>
                        <button className='btn btn-success' onClick={()=> handleLogin()}>
                             Login
                           </button>
                        </div>
                        
                
                </div>
            </div>

        </div>
        </div>
    )
   
    }
     export default Register; 