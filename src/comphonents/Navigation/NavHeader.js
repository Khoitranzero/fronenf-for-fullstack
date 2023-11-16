import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { Link,NavLink ,useHistory} from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../context/UserContex';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {logoutUser} from '../../services/userService';
import { toast } from 'react-toastify';
function NavHeader(props) {
    const Logout=async()=>{
        let data =await logoutUser();//clear cookie
        localStorage.removeItem("jwt");//clear localStorege
        logoutContext();//reset 
        if(data && +data.EC===0){
            toast.success('logout success');
            history.push("/login");
        }else{
            toast.error(data.EM);
        }

    }
    // const [isShow,setIsShow]=useState(true);
    // let location= useLocation();
    // useEffect(()=>{
    //     if(location.pathname === '/login') {
    //         setIsShow(false);
    //     }
    // },[]);
    const {user,logoutContext}= useContext(UserContext);
    const location = useLocation();
    const history=useHistory();
    if(user && user.isAuthenticated===true || location.pathname==='/') {
    return (
<div className='nav-header'>
<Navbar expand="lg" bg='header' >
<Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <NavLink  to="/" exact className="nav-link">Home</NavLink>
    <NavLink to="/users" className="nav-link">users</NavLink>
   <NavLink to="/project" className="nav-link">project</NavLink>
   <NavLink to="/role" className="nav-link">Role</NavLink>
   <NavLink to="/about" className="nav-link">About</NavLink>
    </Nav>
    <Nav>
    {user && user.isAuthenticated==true ?
       <>  <Nav.Item className='nav-link'>
                welcome {user.account.username} !
         </Nav.Item> 
             <NavDropdown title="Setting" id="basic-nav-dropdown">
             <NavDropdown.Item >Change Password</NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item > <span onClick={()=>Logout()}>Logout</span></NavDropdown.Item>
           </NavDropdown>
           </>
           :
           <div>
            <Link className='nav-link' to='/login'>
              Login
         </Link> 
           </div>
    }
          
          
          </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
</div>
    )}
    else{
        return <></>
    }
}

export default NavHeader;