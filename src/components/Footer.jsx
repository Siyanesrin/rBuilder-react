import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


function Footer() {
  return (
    <div className='container-fluid text-light p-3 ' style={{backgroundColor:'#b7870e'}}>
      <div className='row'>
        <div className="col-lg-4">
            <h4 className='mb-5'>AI rBuilder</h4>
            <p>An AI rBuilder suggest job-specific keywords, professional summaries, and skill recommendations to make the resume more effective and ATS (Applicant Tracking System) friendly. The main goal of the AI Powered Resume Builder is to simplify the resume creation process and help job seekers build professional, well-structured resumes in a few minutes. Users can select templates, edit content, preview their resume, and download it in formats such as PDF.</p>
        </div>
        <div className="col-lg-4">
            
        </div>
        <div className="col-lg-4">
            <h4>Contact Us</h4>
            <p> <MdEmail />resumebuilder@gmail.com</p>
            <p> <FaPhoneAlt />99999999999</p>
            <h4>Contact with us</h4>
            <div className='fs-5'>
            <FaInstagram />
            <FaFacebook className='mx-3' />
            <FaWhatsapp />

        </div>
        </div>
      </div>
        <h4 className='text-center'>Designed and build with using React</h4>
    </div>
  )
}

export default Footer
