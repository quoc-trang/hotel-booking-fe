import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

const accountApi = {
    getAll: async () => {
        useLocalToken()
        return axiosInstance.get('/users')
    },
    disableAccount: async (id) => {
        useLocalToken()
        return axiosInstance.post(`users/disable/${id}`)
    },
    enableAccount: async (id) => {
        useLocalToken()
        return axiosInstance.post(`users/enable/${id}`)
    },

}

export default accountApi