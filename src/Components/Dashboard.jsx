import React from 'react'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {


  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
  const [selAll, setSelAll] = useState([false])

  const navigate = useNavigate();

  // GET DATA
  const getData = () => {
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      .then((res) => res.json())
      .then((data) => { setUsers(data) })
      .catch((err) => { console.log("Error:", err) });
  };
  useEffect(() => {
    getData();
  }, []);


  // DELETE DATA 
  const handleDelete = (id) => {
    let updatedMembers = users.filter((item) => {
      return item.id !== id;
    })
    setUsers(updatedMembers)
  }
  const [update, setUpdate] = useState([])

  const handleEdit = (id) => {
    setUpdate(id)
    navigate(`/edit/${id}`, { state: { update } });
  }


  //PAGINATION
  const pagination = (selPage) => {
    if (
      selPage >= 1 &&
      selPage <= Math.ceil(users.length / 10) &&
      selPage !== page
    )
      setPage(selPage)
  }

  //First Page
  const firstPage = () => {
    setPage(1)
  }

  //Last Page
  const lastPage = () => {
    setPage(Math.ceil(users.length / 10))
  }

  //Delete Selected Checkbox
  const selDelete = (e) => {
    e.preventDefault();
    // Filter out the selected users and update the state
    const updatedUsers = users.filter((user) => !selectedCheckboxes.includes(user.id));
    setUsers(updatedUsers);

    // Clear the selected checkboxes
    setSelectedCheckboxes([]);
  };

  return (
    <div>

      {/*Navbar Section */}

      <div className='container'>
      

        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <h5 className='text-center'>Admin Dashboard</h5>
          <form className="d-flex " role="search">
            <input className="form-control m-1"
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search" />
            <button className='btn btn-outline-danger col-3 m-1' onClick={(e) => selDelete(e)} >
              <FontAwesomeIcon icon={faTrash} /> Delete Selected
            </button>
          </form>

        </div>

       {/* Body Section */}

        <div>
          <table className="table"
            style={{ borderCollapse: "collapse", border: "2px solid #ddd", borderRadius: "5%" }}>
            <thead>
              <tr>
                <th><input type="checkbox"
                  onChange={() => {
                    setSelAll(!selAll);
                    setSelectedCheckboxes(selAll ? users.map((item) => item.id) : "[]");
                  }}
                  name=""
                  id="" />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>

            </thead>
            
            {users && users
            // Search data by ID //
              .filter((users) => {
                if ("setSearch" === "") return users;
                else if (
                  users.id.includes(search)
                ) {
                  return users;
                }
                return false;
              })
              .slice(page * 10 - 10, page * 10).map((item, index) => (
                <tbody key={item.id}>
                  <tr className={selectedCheckboxes.includes(item.id) ? "table-secondary" : ""}
                    style={{ cursor: "pointer" }}>
                    <td>
                      <input type="checkbox"
                        name=""
                        id=""

                        checked={selectedCheckboxes.includes(item.id)}
                        onChange={() => {
                          if (selectedCheckboxes.includes(item.id)) {
                            setSelectedCheckboxes((prevSelected) =>
                              prevSelected.filter((selectedId) => selectedId !== item.id)
                            );
                          } else {
                            setSelectedCheckboxes((prevSelected) => [...prevSelected, item.id]);
                          }
                        }}
                      /></td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button type="submit" className="btn btn-outline-success" onClick={() => handleEdit(item.id) } >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button> &nbsp;

                      <button type="submit" className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}> <FontAwesomeIcon icon={faTrash} />
                      </button>

                    </td>
                  </tr>
                </tbody>
              ))}
          </table>


          {/* Pagination */}
          <div className='d-flex justify-content-end'>
            {users.length > 0 &&
              <div className='pagination  mt-4 mb-5 '>
                <h6 style={{ marginRight: "15px", marginTop: "8px" }}>Page {page} of {Math.ceil(users.length / 10)} </h6>

                <button className="pagination-button " onClick={() => firstPage(page)} ><MdKeyboardDoubleArrowLeft /></button>
                <button className="pagination-button" onClick={() => pagination(page - 1)}><MdOutlineKeyboardArrowLeft /></button>

                {[...Array(Math.ceil(users.length / 10))].map((_, i) => (
                  <button
                    className={`pagination-button ${page === i + 1 ? "current_Page" : ""}`} key={i} onClick={() => pagination(i + 1)}>
                    {i + 1}
                  </button>
                ))}

                <button className="pagination-button" onClick={() => pagination(page + 1)}><MdOutlineKeyboardArrowRight /></button>
                <button className="pagination-button" onClick={() => lastPage(page)} ><MdKeyboardDoubleArrowRight /></button>
              </div>}
          </div>

        </div>

      </div>
    </div >
  )
}

export default Dashboard;



