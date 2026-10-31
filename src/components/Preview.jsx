import { Divider, Button } from '@mui/material'
import React from 'react'


function Preview({resumeDetails}) {
  return (
    
      <div className='w-100'>
        <h2>{resumeDetails?.name}</h2>
        <p className="fs-5 lh-1">phone : {resumeDetails?.phone}</p>
        <p className="fs-5 lh-1">email : {resumeDetails?.email}</p>
        <p className="fs-5 lh-1">linkedIn : {resumeDetails?.linkedin}</p>
        <p className="fs-5 lh-1">github : {resumeDetails?.github}</p>
        <p className="fs-5 lh-1">location : {resumeDetails?.location}</p>
      <Divider className='bg-dark my-5' />
      <h2>Professional Summary</h2>
      <p>{resumeDetails?.summary}</p>
      <Divider className='bg-dark my-5' />
      <h2>Technical Skills</h2>
      {
        resumeDetails?.skill?.map(skill=>(
          <span><Button key={skill} variant="text" className="bg-dark text-light rounded" >{skill}</Button></span>
        ))
      }
      
       <Divider className='bg-dark my-5' />
       <p className="fs-5 lh-1">Bachelor's Degree:{resumeDetails?.degree}</p>
        <p className="fs-5 lh-1">University/College Name:{resumeDetails?.college}</p>
        <p className="fs-5 lh-1">Year of Graduation:{resumeDetails?.year}</p>

    </div>
  )
}

export default Preview