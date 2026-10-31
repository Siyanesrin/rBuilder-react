import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Resume() {
  return (
    <div>
      <div style={{height:'100vh'}}>
        <h1 className='text-center my-5'>Create an ATS friendly Resume in minutes with AI</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-4 p-5 rounded shadow text-center">
              <IoDocumentText  className='mb-3 fs-1 text-primary'/>
              <h4>Add Your Details</h4>
              <p>Our AI will create skills & summary</p>
              <h5>Step 1</h5>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4 p-5 rounded shadow text-center">
              <FaFileDownload className='mb-3 fs-1 text-danger' />
              <h4>Download Your Resume</h4>
              <p>Download PDF and start applying</p>
              <h5>Step 2</h5>
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className='text-center mt-5'><Link to={'/resume-details'} style={{backgroundColor:'#a27709'}} className='btn text-light mb-5 rounded'>LET'S START</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Resume
