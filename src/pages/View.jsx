import React, { useEffect, useRef, useState } from 'react'
import { FaFileDownload } from "react-icons/fa";
import Edit from '../components/Edit';
import {Button, Divider } from '@mui/material'
import { IoDocumentText } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { FaBackward } from "react-icons/fa";
import Preview from '../components/Preview';
import { Link, useParams } from 'react-router-dom';
import { downloadResumeApi, viewResumeApi } from '../service/apiService';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';




function View() {
  const[resume,setResume]=useState()
  const {id}=useParams()
  console.log(resume);

  useEffect(()=>{
    getResumeDetails()
  },[])
  const getResumeDetails=async()=>{
    const response=await viewResumeApi(id)
    if(response.status==200){
      setResume(response.data)
    }
  }

  const downloadCV =async ()=>{
    const previewTag=previewRef.current
    const canvas=await html2canvas(previewTag)
    canvas.toBlob( async(imgFile)=>{
      const formData=new FormData()
      formData.append('file',imgFile)
      formData.append("upload_preset",'resume-builder')
      const result=await fetch("https://api.cloudinary.com/v1_1/q9kvcnkr/image/upload",{
      method: 'POST' ,
      body : formData
      })
      const serverData=await result.json()
      const url = serverData.secure_url
      //console.log(url);
      generatePDF(url)
      

    })
  }

  const previewRef=useRef()
  


  const generatePDF =async (resumeImg)=>{
 
  const pdf= new jsPDF()
  
  const imagewidth=pdf.internal.pageSize.getWidth()
  const imageheight=pdf.internal.pageSize.getHeight()
  pdf.addImage(resumeImg,'PNG',0,0,imagewidth,imageheight)
  
  const today=new Date()
  const timestamp= `${today.toLocaleDateString()}, ${today.toLocaleTimeString()}`
  console.log(timestamp);

  const result=await downloadResumeApi({timestamp,resumeImg,resumeId:resume.id,jobRole:resume.job})
  if(result.status===201){
    pdf.save(`${resume.name} CV.pdf`)
  }
  
  
  }
  
  return (
    <div className='container my-5'>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          {/* navigation icons */}
        <div className="d-flex justify-content-center align-items-center">
        {/* download */}
        <Button onClick={downloadCV} style={{color:'#421c03'}} className='btn mx-2'><FaFileDownload />Download CV</Button>
        {/* Edit */}
        <Edit resumeDetails={resume}   setResumedetails={setResume}/>
        {/* all resume */}
        {/* <Link to={'/all-resumes'} style={{color:'#421c03'}}  className='btn mx-2' ><IoDocumentText /> All Resumes</Link> */}
        {/* download history */}
        {/* <Link to={'/downloads'} style={{color:'#421c03'}}  className='btn mx-2' ><IoMdRefresh /> Download History</Link> */}
         {/* back */}
         <Link to={'/resume-details'} style={{color:'#421c03'}}  className='btn mx-2' ><FaBackward /> Preview</Link>
    </div>
    <div ref={previewRef} className='p-5'>
      <Preview resumeDetails={resume} />
    </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  )
}

export default View
