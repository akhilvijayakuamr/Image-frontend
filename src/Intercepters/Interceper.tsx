import axios, { AxiosResponse } from "axios";
import store from "../Redux/store/store";
import { refreshTokenApi } from "../Api/api";
import { setAccessToken } from "../Redux/slice/UserSlice";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});


const headers = {
    'Content-Type': 'application/json',
}


apiClient.interceptors.request.use(function (config) {
    const token = store.getState().auth.access
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('No token found in Redux store.');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        console.log("error", error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const refresh = store.getState().auth.refresh;
            const data = { refresh };
            if (refresh) {
                try {
                    const response: AxiosResponse<any> = await refreshTokenApi(data, headers)
                    const newAccess = response.data.access            
                    const newRefresh = response.data.refresh
                    store.dispatch(setAccessToken({ access: newAccess, refresh: newRefresh }))
                    if (newAccess && error.config) {
                        error.config.headers['Authorization'] = `Bearer ${newAccess}`;
                        return apiClient.request(error.config);
                    }
                } catch (tokenError) {
                    console.error("Token refresh failed", tokenError);
                }
            }
        }

        console.log("Error occurred", error);

        return Promise.reject(error);
    }
);


export  {apiClient}