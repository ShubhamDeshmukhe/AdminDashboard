import React from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Edit = () => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };

  const { id } = useParams;
  const [member, setMember] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/edit/${id}');
        const members = response.data;

        const foundMember = members.find(m => m.id === id);
        if (foundMember) {
          setMember(foundMember);
          alert("data Found")
        }
        else {
          console.warn('Member not found');
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [id]);

 


          
  


  return (

    <div className='d-flex justify-content-center align-items-center px-20 m-auto' style={{ minHeight: '91.5vh', backgroundColor: '#ffe5b4' }}>
      <div className='container p-4'>
        <form action="">
          <button className='btn btn-success' onClick={handleButtonClick} ><MdOutlineKeyboardArrowLeft /></button>
          <h5 className='text-center mb-3' style={{ fontSize: "26px" }}>Edit</h5>

          <div div className="mb-4 btn-md col-md-9 m-auto">
            <label for="exampleFormControlInput1" className="form-label text-black">Name</label>
            <input name="name" value={member.name} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Name" />
          </div>

          <div className="mb-4 btn-md col-md-9 m-auto">
            <label for="exampleFormControlInput1" className="form-label text-black">Email</label>
            <input name="email" value={member.email} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter the Email" />
          </div>

          <div className="mb-4 btn-md col-md-9 m-auto">
            <label for="exampleFormControlInput1" className="form-label text-black">Role</label>
            <input name="role" value={member.role} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter role" />
          </div>

          <div className="mb-4 btn-md col-md-9 m-auto">
            <button className="btn btn-success btn-sm col-sm-2"> Save </button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default Edit