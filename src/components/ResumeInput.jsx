import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import jobrole from '../assets/jobrole.json';
import jobskills from '../assets/jobskills.json';
import summary from '../assets/summary.json';
import { toast } from 'react-toastify';
import { saveResumeApi } from '../service/apiService';
import { useNavigate } from 'react-router-dom';


const steps = ['Baic Information', 'Contact Details', 'Educational Details','Review & Submit'];


function ResumeInput({resumeDetails,setResumedetails}) {
  const navigate=useNavigate()

  console.log(resumeDetails);
  
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // Manage focus when the active step changes.
const renderFormCount=(stepCount)=>{
    switch (stepCount) {
        case 0:return(
            <div>
                <h3>Personal Details</h3>
                <div className='row p-3'>
                  <TextField value={resumeDetails.name} onChange={e=>setResumedetails({...resumeDetails,name:e.target.value})} id="standard-basic-name" label="Full name" variant="standard" />
                    
                  <TextField value={resumeDetails.location} onChange={e=>setResumedetails({...resumeDetails,location:e.target.value})} id="standard-basic-loc" label="Location" variant="standard" />
                  <FormControl variant='standard'>
        <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
        <Select onChange={e=>setResumedetails({...resumeDetails,job:e.target.value})}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Job"
        >
          {jobrole.jobRoles.map(job=>(
              <MenuItem key={job} value={job}>{job}</MenuItem>
          ))}
          
        </Select>
      </FormControl>
                </div>
            </div>
        )
            
            break;
        case 1:return(
            <div>
                <h3>Contact Details</h3>
                <div className='p-3 row'>
                  <TextField value={resumeDetails.email} onChange={e=>setResumedetails({...resumeDetails,email:e.target.value})} id="standard-basic-email" label="Email" variant="standard" />
                  <TextField value={resumeDetails.phone} onChange={e=>setResumedetails({...resumeDetails,phone:e.target.value})} id="standard-basic-contact" label="Contact Number" variant="standard" />
                  <TextField value={resumeDetails.linkedin} onChange={e=>setResumedetails({...resumeDetails,linkedin:e.target.value})} id="standard-basic-linkedin" label="LinkedIn Link" variant="standard" />
                  <TextField value={resumeDetails.github} onChange={e=>setResumedetails({...resumeDetails,github:e.target.value})} id="standard-basic-github" label="Github Link" variant="standard" />
                </div>
            </div>
        )
            
            break;
        case 2:return(
            <div>
                <h3>Educational Details</h3>
                <div className='p-3 row'>
                  <TextField value={resumeDetails.degree} onChange={e=>setResumedetails({...resumeDetails,degree:e.target.value})} id="standard-basic-email" label="Bachelor's Degree" variant="standard" />
                  <TextField value={resumeDetails.college} onChange={e=>setResumedetails({...resumeDetails,college:e.target.value})} id="standard-basic-contact" label="University College Name" variant="standard" />
                  <TextField value={resumeDetails.year} onChange={e=>setResumedetails({...resumeDetails,year:e.target.value})} id="standard-basic-linkedin" label="Year of Graduation" variant="standard" />
                  
                </div>
            </div>
        )
            
            break;
        case 3:return(
            <div>
                <p>Our AI will create skills &summary according to your job role. click the <b>Genarate AI Skills & Summary</b> button to proceed</p>
            </div>
        )
            
            break;
        default:
            break;
    }
}

const generateSkillSummary=()=>{
  setResumedetails({...resumeDetails,skill:jobskills[resumeDetails.job],summary:summary[resumeDetails.job]})
  handleNext()
}

const handleSaveResume=async()=>{
  const {name,location,job,phone,email,github,linkedin,degree,college,year,skill,summary} =resumeDetails

  if(name && location && job && phone && email && github && linkedin && degree && college && year && skill.length>0 && summary){
    const response=await saveResumeApi(resumeDetails)
    console.log(response);
    const resumeid=response.data.id
    navigate(`/resume/${resumeid}`)
    toast.success('resume saved successfully')
    
  }
  else{
    toast.warning('please fill the form completely!!')
  }
}


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed -
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSaveResume} >
                FINISH
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box>
            {
            renderFormCount(activeStep)
            }
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            
              {activeStep === steps.length - 1 ?
               <Button onClick={generateSkillSummary}> GENERATE AI SKILLS & SUMMARY</Button>
               :
               <Button onClick={handleNext}> NEXT</Button>
            }
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default ResumeInput
