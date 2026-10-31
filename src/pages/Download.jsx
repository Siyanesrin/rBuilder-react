import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { getdownloadResumeApi } from '../service/apiService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight:'90vh',
  overflow:'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Download() {

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const [downloadlist,setdownloadlist]=useState([])
//console.log(downloadlist);
const [label,setLabel]=useState([])
const [value,setValue]=useState([])
const colorpallete=['#0d72a6','#f26f3f','#98dde5','#3a260e','#04336b','#0d0d0a']
const backgroundColor=label.map((value,index)=>colorpallete[index%colorpallete.length])

const data={
  labels:label,
  datasets:[
    {
      label:"Download Count",
  data:value,
  backgroundColor
    }
  ]
};

useEffect(()=>{
  getdownloadResume()
},[])

const getdownloadResume=async()=>{
  const result= await getdownloadResumeApi()
  setdownloadlist(result.data)
  const output={}
  result.data.forEach(item => {
    const currentjob=item.jobRole
    if(currentjob in output){
      output[currentjob]+=1
    }
      else{
        output[currentjob]=1
      }
    
    
  });

  setLabel(Object.keys(output))
  setValue(Object.values(output))
}


  return (
    <div className='container my-5'>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Downloaded Resume History</h3>
        <button onClick={handleOpen} className='btn btn-light' style={{backgroundColor:"dark"}}>View in Chart</button>
      </div>
      <p className='mt-3 fs-3 fw-semibold text-primary '>Total downloaded resumes from our site is <span className='fw-bolder text-danger'>
      {downloadlist.length}
      </span></p>
      <div className="row my-5">
        {/* duplicate the row according to the resume count */}
        {
          downloadlist?.length>0?

          downloadlist?.map(resume=>(
            <div key={resume?.id} className="col-lg-4">
          <div className="rounded shadow p-3" style={{height:'350px'}}>
            <h6>Review at : {resume?.timestamp}</h6>
            <div className='text-center mt-4'>
              <Link to={`/resume/${resume?.resumeId}`}><img className='w-100' style={{height:'300px'}} src={resume?.resumeImg} alt="no img" /></Link>
              </div>
          </div>
        </div>
          ))

          :
          <div>No resumes downloaded</div>

        }
      </div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mt:2}}>
      CV count by Job role
    </Typography>
    <div className='text-center'>
      <Pie data={data}/>
    </div>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      This chat provides an overview of the number of CV downloads assosiated with different jobs on the webite. it helps visualize the demand and engagement for CV's accross various career categories ,making it easier to identify which job role attract the highest number of downloads. By comparing downloads count across roles,the chart can provide useful insights in to user preferences and the popularity of different career oppurtunity 
    </Typography>
  </Box>
</Modal>
    </div>
  )
}

export default Download