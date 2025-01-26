
import { AxiosError, AxiosResponse } from "axios";
import { commonResponse, emailRequest, ErrorResponse, Image, ImageUpdate, loginRequest, loginResponse, resetRequest, signUpRequest, verificationRequest } from "../Interface/AuthInterface";
import { deleteImageApi, emailApi, loginApi, resetApi, signUpApi, updateImageApi, verificationApi, viewImage } from "../Api/api";
import { Dispatch } from "@reduxjs/toolkit";
import { setUserLogin } from "../Redux/slice/UserSlice";


const headers = {
    'Content-Type': 'application/json',
}




// Signup Request


export const signUpAsync = (signUpRequest: signUpRequest) =>

    async () => {

        try {
            const response: AxiosResponse<commonResponse> = await signUpApi(signUpRequest, headers)
            console.log(response.data)
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }



// Verifiacation Request


export const verifyAsync = (verificationRequest: verificationRequest) =>
    async () => {
        try {
            const response: AxiosResponse<commonResponse> = await verificationApi(verificationRequest, headers)

            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }



// Login Request


export const loginAsync = (loginRequest: loginRequest) =>
    async (dispatch: Dispatch) => {
        try {
            const response: AxiosResponse<loginResponse> = await loginApi(loginRequest, headers)
            console.log(response.data)
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data)
                dispatch(setUserLogin(response.data))
            }
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }


// Email Request



export const emailAsync = (emailRequest: emailRequest) =>
    async () => {
        try {
            const response: AxiosResponse<commonResponse> = await emailApi(emailRequest, headers)
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }



// Reset Action


export const resetAsync = (resetRequest: resetRequest) =>
    async () => {
        try {
            const response: AxiosResponse<commonResponse> = await resetApi(resetRequest, headers)
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }


// Get all post

export const allPostAsync = () =>
    async () => {
        console.log(headers)
        try {
            const response: AxiosResponse<Image[]> = await viewImage(headers)
            return {
                "data": response.data,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }



// Update images 


export const imageUpdateAsync = (updateRequest: ImageUpdate) =>
    async () => {
        try {
            const response: AxiosResponse<commonResponse> = await updateImageApi(updateRequest, headers)
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }


// Delete Images


export const imageDeleteAsync = (deleteRequest:string) =>
    async ()=>{
        try{
            const response: AxiosResponse<commonResponse> = await deleteImageApi(deleteRequest, headers)
            return {
                "message": response.data.message,
                "status": response.status
            }
        }catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }




