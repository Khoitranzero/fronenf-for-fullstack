import { useState } from "react";
import {fetchAllRole,deleteRoles} from '../../services/roleService';
import { useEffect , forwardRef, useRef, useImperativeHandle} from "react";
import { toast } from "react-toastify";
const TableRole=forwardRef((props,ref)=>{
    const [listRole, setListRole]=useState([]);
    useEffect(()=>{
        getAllRoles();
    },[])
    useImperativeHandle(ref, () => ({

        fetchListRolesAgain(){
            getAllRoles();
        }
    
      }));
    const getAllRoles=async()=>{
        let data=await fetchAllRole();
        if(data && +data.EC===0){
            setListRole(data.DT);
        }    
    }
    const handleDeleteRole=async(role)=>{
        let data=await deleteRoles(role);
        if(data && +data.EC===0){
            toast.success(data.EM);
        }
    }
return(
    <>
         <table className="table table-hover table-bordered">
                    <thead>
    <tr>
  
      <th scope="col">id</th>
      <th scope="col">URL</th>
      <th scope="col">Description</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
   {listRole && listRole.length > 0 ?
   <>
   {listRole.map((item, index)=>{
            return (
                <tr key={`row-${index}`}>
                    
                    <td>{item.id}</td>
                    <td>{item.URL}</td>
                    <td>{item.Description}</td>
                   
                    <td>
                       {/* <button className="btn btn-warning mx-3" onClick={()=>handleEditUser(item)}>edit</button> */}
                        <button className="btn btn-danger" onClick={()=>handleDeleteRole(item)}>delete</button>
                    </td>

                </tr>
            )
   })}
   </>
   :
   <><tr><td>Not found role</td></tr></>
}
  </tbody>
                    </table>
    </>
)
})
export default TableRole;