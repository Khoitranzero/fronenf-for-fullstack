import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Users from "../comphonents/ManageUsers/Users";
  import Login from "../comphonents/Login/Login";
  import Register from "../comphonents/Register/Register";
  import { Logger } from "sass";
  import Role from "../comphonents/Role/Role";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes =(props)=> {
    const Project =()=>{
        return(
            <span>project</span>
        )
    }
return (
    <Switch>
        <PrivateRoutes path="/users" component={Users}/>
        <PrivateRoutes path="/projects" component={Project}/>
        <PrivateRoutes path="/role" component={Role}/>
            <Route path="/project">
            project
            </Route>
            <Route path="/login">
            <Login/>
            </Route>
            <Route path="/register">
            <Register/>
            </Route>
            <Route path="/users">
            <Users/>
            </Route>
            <Route path="/role">
            <Role/>
            </Route>
            <Route path="/" exact>
              Home
            </Route>
            <Route path="*">
  404 not found
            </Route>
          </Switch>
)
}
export default AppRoutes;