import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

const accountApi = {
    getAll: async () => {
        useLocalToken()
        return axiosInstance.get('/users')
    },
    disableAccount: async (id) => {
        useLocalToken()
        return axiosInstance.lock(`/users/${id}`)
    },
    enableAccount: async (id) => {
        useLocalToken()
        return axiosInstance.unlock(`/users/${id}`)
    },

}

export default accountApi