import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from "react-icons/fa";
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaXmark } from "react-icons/fa6";
import jobrole from '../assets/jobrole.json'
import { toast } from 'react-toastify';
import { editAllResumeApi } from '../service/apiService';




function Edit({resumeDetails,setresumedetails}) {
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


const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const skillRef=React.useRef()

const removeskill=(skill)=>{
  setresumedetails({...resumeDetails,skill:resumeDetails.skill.filter(item=>item!=skill)})
}

const addSkill=(skill)=>{
  if(skill){
    if(resumeDetails?.skill?.map(item=>item.toLowerCase().includes(skill.toLowerCase()))){
      toast.info("Given skill is already added,Please add another")
    }else{
      setresumedetails({...resumeDetails,skill:[...resumeDetails?.skill,skill]})
    }
    skillRef.current.value=""

  }else{
    toast.warning("Please enter valid input!!")
  }
}

const handleEditResume=async()=>{
  const {name,location,job,phone,email,github,linkedin,degree,college,year,skill,summary} =resumeDetails

  if(name && location && job && phone && email && github && linkedin && degree && college && year && skill.length>0 && summary){
    const response=await editAllResumeApi(resumeDetails)
    //console.log(response);
    if(response.status==200){
      toast.success('resume saved successfully')
      setTimeout(()=>{
        handleClose()
      },2500);
    }
    
  }
  else{
    toast.warning('please fill the form completely!!')
  }
}





  return (
    <div>
      <Button color='black' onClick={handleOpen}><FaEdit />Edit CV</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume Details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <h3>Personal Details</h3>
              <div className='row p-3'>
                
                            <TextField value={resumeDetails?.name} onChange={e=>setresumedetails({...resumeDetails,name:e.target.value})} id="standard-basic-name" label="Full Name" variant="standard" />
                            <TextField value={resumeDetails?.location} onChange={e=>setresumedetails({...resumeDetails,location:e.target.value})} id="standard-basic-loc" label="Location" variant="standard" />
                            <FormControl variant="standard" >
                        <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
                        <Select defaultValue={resumeDetails?.job} onChange={e=>setresumedetails({...resumeDetails,job:e.target.value})}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-job"
                          label="Job"
                        >
                
                          {jobrole.jobRoles.map(job=>(
                            <MenuItem key={job} value={job}>{job}</MenuItem>
                          ))
                          }
                        </Select>
                      </FormControl>
                          </div>
                
              </div>

            
             <div>
                      <h3>Contact Details</h3>
                      <div className="row p-3">
                         
                                    <TextField  value={resumeDetails?.email} onChange={e=>setresumedetails({...resumeDetails,email:e.target.value})}id="standard-basic-email" label="Email" variant="standard" />
                                    <TextField value={resumeDetails?.phone} onChange={e=>setresumedetails({...resumeDetails,phone:e.target.value})} id="standard-basic-contact" label="Contact Number" variant="standard" />
                                    <TextField value={resumeDetails?.linkedin} onChange={e=>setresumedetails({...resumeDetails,linkedin:e.target.value})} id="standard-basic-linkedin" label="LinkedIn Link" variant="standard" />
                                    <TextField value={resumeDetails?.github} onChange={e=>setresumedetails({...resumeDetails,github:e.target.value})} id="standard-basic-github" label="GitHub Link" variant="standard" />
                                  </div>
                        </div>
                    
                    <div>
                              <h3>Educational Details</h3>
                              <div className="row p-3">
                                 
                                            <TextField value={resumeDetails?.degree} onChange={e=>setresumedetails({...resumeDetails,degree:e.target.value})} id="standard-basic-degree" label="Bachelor's Degree" variant="standard" />
                                            <TextField value={resumeDetails?.college} onChange={e=>setresumedetails({...resumeDetails,college:e.target.value})} id="standard-basic-unicollege" label="University/College Name" variant="standard" />
                                            <TextField value={resumeDetails?.year} onChange={e=>setresumedetails({...resumeDetails,year:e.target.value})} id="standard-basic-gradyear" label="Year of Graduation" variant="standard" />
                                          </div>
                               </div>
                            
                            {/* skills */}
                            <div className='mt-3'>
                              <h3>Skills</h3>
                              <div className='d-flex p-3'>
                                <input ref={skillRef} type="text" placeholder='Add Skill' className='form-control' />
                                <button onClick={()=>{addSkill(skillRef.current.value)}} className='btn'>Add</button>
                              </div>
                            </div>

                            <h5>Added Skills : </h5>
                            <div className="d-flex flex-wrap justify-content-between">
                              {
                                resumeDetails?.skill?.map(skill=>(
                                  <Button onClick={()=>(removeskill(skill))} key={skill} variant='contained' className='my-2'>{skill} <FaXmark className='ms-3'/> </Button>
                                ))
                              }
                            </div>
                            {/* summary */}
                            <div className='mt-3'>
                              <h3>Summary</h3>
                              <div className='row p-3'>
                                <TextField id='summary' label='Summary' variant='standard'></TextField>
                              </div>
                            </div>
                            {/* update button */}
                            <button onClick={handleEditResume} className='btn btn-primary mt-3 '>Update CV</button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}


export default Edit