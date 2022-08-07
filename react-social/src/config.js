import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://socialbooksumit.herokuapp.com/connect/"
})