import axios, { AxiosResponse } from "axios";
import { commonResponse, emailRequest, Image, ImageUpdate, loginRequest, loginResponse, resetRequest, signUpRequest, SpecificUpdate, verificationRequest } from "../Interface/AuthInterface";
export const BASE_URL= import.meta.env.VITE_BASE_URL
import { apiClient } from "../Intercepters/Interceper";


// Signup api

export const signUpApi = (signUpRequest:signUpRequest, headers: {[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    axios.post(`${BASE_URL}/register/`, signUpRequest, {headers})


// Verification api


export const verificationApi = (verificationRequest:verificationRequest, headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    axios.post(`${BASE_URL}/verify/`, verificationRequest, {headers})



// Login Api


export const loginApi = (loginRequest:loginRequest, headers:{[key:string]:string}): Promise<AxiosResponse<loginResponse>> =>
    axios.post(`${BASE_URL}/login/`, loginRequest, {headers})


// Email Api


export const emailApi = (emailRequest:emailRequest, headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.post(`${BASE_URL}/email/`, emailRequest, {headers})


// Reset Password 


export const resetApi = (resetRequest:resetRequest, headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.post(`${BASE_URL}/reset/`, resetRequest, {headers})



// Create Image


export const createImageApi = (createImageRequest:Image[], headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.post(`${BASE_URL}/create/`, createImageRequest, {headers})



// View Image


export const viewImage = (headers:{[key:string]:string}): Promise<AxiosResponse<Image[]>> =>
    apiClient.get(`${BASE_URL}/all_post/`, {headers})



// Refresh token


export const refreshTokenApi = (refresh:any,headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    axios.post(`${BASE_URL}/refresh/`, refresh, {headers})




// Updata request


export const updateImageApi = (updateRequest:ImageUpdate, headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.post(`${BASE_URL}/update_image/`, updateRequest, {headers})



// Delete Request


export const deleteImageApi = (ImageDelete:string, headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.delete(`${BASE_URL}/delete_image/`, {headers, data:{ImageDelete}})


// Unique update request


export const updateSingleApi = (specificImageRequest:SpecificUpdate, headers:{[key:string]:string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.put(`${BASE_URL}/update_unique/`, specificImageRequest, {headers})
