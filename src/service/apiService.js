import axiosService from "../api/axioService";

export const saveResumeApi=async (resumeDetails)=>{
    return await axiosService ('POST','/resumes',resumeDetails)
}

export const viewResumeApi=async (resumeid)=>{
    return await axiosService ('GET',`/resumes/${resumeid}`,{})

}

export const getAllResumeApi = async ()=>{
    return await axiosService('GET',`/resumes/`,{})
}

export const deleteResumeApi = async (resumeid)=>{
    return await axiosService('DELETE',`/resumes/${resumeid}`,{})
}

export const editAllResumeApi= async(resumeId,resumeDetails)=>{
    return await axiosService('PUT',`/resumes/${resumeId}`,resumeDetails)
}

export const downloadResumeApi= async(resumeDetails)=>{
    return await axiosService('POST',`/downloads`,resumeDetails)
}

export const getdownloadResumeApi= async()=>{
    return await axiosService('GET',`/downloads`,{})
}