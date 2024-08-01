import axios from 'axios';


export const getMethod = async (url: string, params = {}) => {
    const axiosInstance = axios.create();
    try {
        const res = await axiosInstance.get(url, {
            params
        });
        if (res?.status === 200) {
            return {
                response: res?.data
            }
        } else {
            return {
                error: "Something went wrong!"
            }
        }
    } catch (err) {
        return ({ error: "Something went wrong!" })
    }
}



export const postMethod = async (url: string, reqBody = {}) => {
    const axiosInstance = axios.create();

    try {
        const res = await axiosInstance.post(url, reqBody);
        if (res?.status === 200) {
            return { response: res?.data }
        } else {
            return {
                error: "Something went wrong!"
            }
        }
    } catch (err) {
        return {
            error: "Something went wrong!"
        }
    }
}