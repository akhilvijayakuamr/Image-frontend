import { AxiosError, AxiosResponse } from "axios"
import { commonResponse, ErrorResponse, Image, SpecificUpdate } from "../Interface/AuthInterface"
import { createImageApi, updateSingleApi } from "../Api/api"
import store from "../Redux/store/store";
const token = store.getState().auth.access



const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
}



// Signup Request


export const createBlogAsync = (createBlogRequest: Image[]) =>

    async () => {
        console.log(createBlogRequest)
        try {
            const response: AxiosResponse<commonResponse> = await createImageApi(createBlogRequest, headers)
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


// Update specific image


export const specificUpdateAsync = (updateRequest: SpecificUpdate) =>
    async () => {
        console.log("the data==", updateRequest)
        try {
            const response: AxiosResponse<commonResponse> = await updateSingleApi(updateRequest, headers)
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
