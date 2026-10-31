import React, { useEffect, useMemo, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { deleteResumeApi, getAllResumeApi } from '../service/apiService'
import { alertClasses } from '@mui/material'
import { FaBackward } from 'react-icons/fa'
import { FaForward } from 'react-icons/fa'


function Saved() {

  const [allResumes,setAllResumes]=useState([])
  const [searchkey,setsearchkey]=useState('')
  const [dummyresumes,setdummyresumes]=useState([])

  const[currentPage,setCurrentPage]=useState(1)
  const rowPerPage = 4
  const lastIndexOfCurrentPage=currentPage*rowPerPage
  const firstIndexOfCurrentPage=lastIndexOfCurrentPage-rowPerPage
  const currentresumes=allResumes.slice(firstIndexOfCurrentPage,lastIndexOfCurrentPage)
  const totalpage=Math.ceil(allResumes.length/rowPerPage)

  useEffect(()=>{
    searchkey==''? getAllResumes() : searchcandidate()
  },[searchkey])

  const getAllResumes=async ()=>{
    const response=await getAllResumeApi()
    if(response.status===200){
      setAllResumes(response.data)
      setdummyresumes(response.data)
    }
  }

  const removeResume=async(id)=>{
    if(confirm('Are you sure, do you want to delete this resume')){
      const response=await deleteResumeApi(id)
      if(response.status===200){
        getAllResumeApi()
      }
    }
  }

  const searchcandidate=useMemo(()=>{
    setAllResumes(dummyresumes.filter(item=>item.job.toLowerCase().includes(searchkey.toLowerCase())))
  },[searchkey])
  return (
    <div className='container d-flex justify-content-center align-items-center my-5 flex-column'>
      <h1>All Saved Resumes</h1>
      <input onChange={(e)=>setsearchkey(e.target.value)} type="text" className='form-control' placeholder='Search candidate by their job roles' />
      <table className="table table-hover table-stripped my-5">
        <thead>
          <tr className='table-dark '>
            <th>#</th>
            <th>Resume</th>
            <th>Job role</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            currentresumes?.length>0?
            currentresumes?.map((resume,index)=>(
              <tr key={resume?.id}>
            <td>{index+1}</td>
            <td><Link to={`/resume/${resume?.id}`}>{resume?.name}</Link></td>
            <td>{resume?.job}</td>
            <td><button onClick={()=>removeResume(resume?.id)} className='btn btn-danger'><FaTrash /></button></td>
          </tr>
            ))
            :
            <p>NO RESUMES ADDED YET</p>
          }
        </tbody>
      </table>
      <div className='d-flex align-items-center'>
        <button className='btn ' onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage==1}>
          <FaBackward/>
        </button>
        {currentPage} of {totalpage}
        <button className='btn'  onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage==totalpage || totalpage==0}>
          <FaForward />
        </button>
      </div>
    </div>
  )
}

export default Saved
