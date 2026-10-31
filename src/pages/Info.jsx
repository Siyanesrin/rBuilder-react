import React from 'react'
import ResumeInput from '../components/ResumeInput'
import Preview from '../components/Preview'

function Info() {
  const[resumeDetails,setResumedetails]=React.useState({name:"",location:"",job:"",phone:"",email:"",github:"",linkedin:"",degree:"",college:"",year:"",skill:[],summary:""})
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <ResumeInput resumeDetails={resumeDetails} setResumedetails={setResumedetails} />
          </div>
          <div className="col-lg-6">
            <Preview resumeDetails={resumeDetails} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
