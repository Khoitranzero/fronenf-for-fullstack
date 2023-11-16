import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser , updateCurrentUser} from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser =(props)=>{
  // const [email, setEmail]=useState("");
  // const [phone, setPhone]=useState("");
  // const [username, setUsername]=useState("");
  // const [password, setPassword]=useState("");
  // const [address, setAddress]=useState("");
  // const [sex, setSex]=useState("");
  // const [group, setGroup]=useState("");
  const {action,dataModalUser}= props;
  const defaultUserData ={
    email   :'',
    phone   :'',
    username:'',
    password:'',
    address :'',
    sex     :'',
    group   :''
  }
  const validInputDefault={
    email:true,
    phone:true,
    username:true,
    password: true,
    address:true,
    sex:true,
    group:true
  }
  const [userData, setUserData]=useState(defaultUserData);
  const [validInputs, setValidInputs]=useState(validInputDefault);

  const [userGroup, setUserGroup]=useState([]);

  useEffect(()=>{
    getGroup();
  },[]);
  useEffect(()=>{
    if(action === 'UPDATE'){
      setUserData({...dataModalUser, group:dataModalUser.Group ? dataModalUser.Group.id: ''});
    }
  },[dataModalUser]);


  useEffect(()=>{
    if(action === 'CREATE'){
      if(userGroup && userGroup.length >0 ){
        setUserData({...userData, group: userGroup[0].id});
      }
   
    }
  },[action]);

 
  const getGroup =async()=>{
    let res=await fetchGroup();
    if(res && res.EC === 0){
      setUserGroup(res.DT);
      if(res.DT && res.DT.length > 0){
        let groups = res.DT;
        setUserData({...userData,group:groups[0].id}) // fix bug validData
      }
    }
    else{toast.error(res.EM)};
  }
  const handleOnchangeInput =(value, name)=>{
      let _userData = _.cloneDeep(userData);
      _userData[name]=value;
      setUserData(_userData);
  }
  const checkValidInputs =()=>{
    if( action ==='UPDATE') return true;
    setValidInputs(validInputDefault);
      let arr =['email','phone','password','group'];
      let check = true;
      for(let i=0; i< arr.length ; i++){
        if(!userData[arr[i]]){
          let _validInputs=_.cloneDeep(validInputDefault);
          _validInputs[arr[i]]=false;
          setValidInputs(_validInputs);
          toast.error(`empty input ${arr[i]}`);
            check= false;
            break;
        }
      }
      return check;
  }
  const handleConfirmUser = async()=>{
    let check=checkValidInputs();
    if(check===true){
      let res = action === 'CREATE'?
      await createNewUser({...userData, groupId:userData['group']})
      :await updateCurrentUser({...userData, groupId: userData['group']});

      if(res && res.EC === 0){
        props.onHide();
        setUserData({...defaultUserData, 
          group: userGroup && userGroup.length > 0 ? userGroup[0].id :''})
      }
      if(res && res.EC !== 0 ){
        toast.error(res.EM);
        let _validInputs=_.cloneDeep(validInputDefault);
        _validInputs[res.DT]=false;
        setValidInputs(_validInputs);
      }
    }
  }
  const handleCloseModalUser=()=>{
    props.onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputDefault);
  }
    return (
        <Modal
         
          size="lg"
          show={props.show}
          className='modal-user'
          onHide={()=>handleCloseModalUser()}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span>{props.action==='CREATE'? "Modal Create user": "Modal Edit User"}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='content-body row'>
              <div className='col-12 col-sm-6 form-group'>
              <label>Email</label>
              <input 
              disabled={action === 'CREATE' ? false : true}
              className={validInputs.email ? 'form-control': 'form-control is-invalid'} type='email' value={userData.email}
              onChange={(event)=>handleOnchangeInput(event.target.value, "email")}
              />
              </div>
              <div className='col-12 col-sm-6 form-group'>
              <label>Phone</label>
              <input 
                   disabled={action === 'CREATE' ? false : true}
              className={validInputs.phone ? 'form-control': 'form-control is-invalid'} type='text' value={userData.phone}
                      onChange={(event)=>handleOnchangeInput(event.target.value, "phone")}
              />
              </div>
              <div className='col-12 col-sm-6 form-group'>
              <label>UserName</label>
              <input className='form-control' type='text' value={userData.username}
                      onChange={(event)=>handleOnchangeInput(event.target.value, "username")}
              />
              </div>
              <div className='col-12 col-sm-6 form-group'>
                {action==='CREATE'  &&
               <>
              <label>password</label>
              <input className={validInputs.password ? 'form-control': 'form-control is-invalid'} type='password' value={userData.password}
                      onChange={(event)=>handleOnchangeInput(event.target.value, "password")}
                      
              />
              </>
            } 
              </div>
              <div className='col-12 col-sm-12 form-group'>
              <label>Address</label>
              <input className='form-control' type='text' value={userData.address}
                      onChange={(event)=>handleOnchangeInput(event.target.value, "address")}
              />
              </div>
              <div className='col-12 col-sm-6 form-group'>
              <label>Gender</label>
              <select className='form-select'
                      onChange={(event)=>handleOnchangeInput(event.target.value, "sex")}
                      value={userData.sex}
              >
              <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
              </div>
              <div className='col-12 col-sm-6 form-group'>
              <label>Group</label>
              <select className={validInputs.group ? 'form-control': 'form-control is-invalid'}
                      onChange={(event)=>handleOnchangeInput(event.target.value, "group")}
                      value={userData.group}
              >
                {userGroup.length > 0 && userGroup.map((item, index)=>{
                  return(
                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                  )
                })}
              </select>
              </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={()=>handleCloseModalUser()}>Close</Button>
            <Button variant='primary' onClick={()=>handleConfirmUser()}>{action==='CREATE'?'Save':'Update'}</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    
    
 export default ModalUser;