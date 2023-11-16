import { useHistory } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchAllUser,deleteUser} from "../../services/userService";
import ReactPaginate from 'react-paginate';
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import { toast } from "react-toastify";
const Users =(props)=>{
    const [listUsers, setListUsers]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [currentLimit, setCurrentLimit]=useState(3);
    const [totalPages, settotalPages]=useState(0);

    const [isShowModalDelete, setIsShowModalDelete]= useState(false);
    const [dataModal, setDataModal]=useState({});


    const [isShowModalUser, setIsShowModalUser]= useState(false);
    const [actionModalUser, setActionModalUser]=useState("CREATE");
    const [dataModalUser, setDataModalUser]=useState("");

    useEffect(()=>{
        fetchUser();
    },[currentPage])
    const fetchUser =async()=>{
        let response= await fetchAllUser(currentPage,currentLimit);
       // console.log("respon", response)
        if(response && response.EC === 0){
            settotalPages(response.DT.totalPages);
            //console.log("totalPages",response.data.DT.totalPages);
            setListUsers(response.DT.users);
        }
    }
    const handlePageClick = async (event)=>{
        setCurrentPage(+event.selected +1);
    }
    // let history = useHistory();
    // useEffect(()=>{
    //     let secsion =sessionStorage.getItem('account');
    //     if(!secsion){
    //         history.push("/login");
    //     }
    //   },[])
    const handleDeleteUser =async(user)=>{
       setDataModal(user);
       setIsShowModalDelete(true);
    }
    const handleEditUser = (user)=>{
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);
    }
    const handleClose=()=>{
        setIsShowModalDelete(false);
        setDataModal({});
    }
    const confirmDeleteUser = async ()=>{
        let response = await deleteUser(dataModal);
        if(response && response.EC === 0){
            toast.success(response.EM);
            await fetchUser();
            setIsShowModalDelete(false);
        }
        else{toast.error(response.EM)}
    }
    const onHideModalUser= async()=>{
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUser();
    }
    const handleRefresh =async()=>{
        await fetchUser();
    }
    return (
        <>
        <div className="container">
        <div className="manage-users-container">
            <div className="user-header">
                <div className="tittle">
                    <h3>tittle</h3>
                    <div className="actions">
                        <button className="btn btn-success"
                        onClick={()=>handleRefresh()}
                        >Refresh</button>
                        <button className="btn btn-primary" 
                        onClick={()=>{
                            setIsShowModalUser(true);
                            setActionModalUser("CREATE");
                            }}
                            >Add new user</button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-hover table-bordered">
                    <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">id</th>
      <th scope="col">Email</th>
      <th scope="col">UserName</th>
      <th scope="col">Group</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
   {listUsers && listUsers.length > 0 ?
   <>
   {listUsers.map((item, index)=>{
            return (
                <tr key={`row-${index}`}>
                    <td>{(currentPage-1)*currentLimit+index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.Group ? item.Group.name : ''}</td>
                    <td>
                        <button className="btn btn-warning mx-3" onClick={()=>handleEditUser(item)}>edit</button>
                        <button className="btn btn-danger" onClick={()=>handleDeleteUser(item)}>delete</button>
                    </td>

                </tr>
            )
   })}
   </>
   :
   <><tr><td>Not found user</td></tr></>
}
  </tbody>
                    </table>

                </div>
                {totalPages > 0 &&
                <div className="user-footer">
                <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={4}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
                </div>
                }
            </div>
    
        </div>
        </div> 
        <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
        />
        <ModalUser
   
        onHide={onHideModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}

        />
        </>
    )
        
}
export default Users;