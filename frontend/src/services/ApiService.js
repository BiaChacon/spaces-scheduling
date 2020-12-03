import apiConfig from './config'
import { getToken } from "../services/auth";

const headers = () => { return { headers: { Authorization: `${getToken()}` } } };

export default class ApiService {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async create(data) {
        return await apiConfig.post(`/${this.endpoint}/`, data, headers());
    }

    async update(data, pk) {
        return await apiConfig.put(`/${this.endpoint}/${pk}/`, data, headers());
    }

    getList() {
        return apiConfig.get(`/${this.endpoint}/`, headers());
    }

    getOne(pk) {
        return apiConfig.get(`/${this.endpoint}/${pk}`, headers());
    }

    getListWithParams(params) {
        return apiConfig.get(`/${this.endpoint}/`, params, headers());
    }

    async cancel(data,pk) {
        return await apiConfig.put(`/${this.endpoint}/${pk}/`,data, headers());
    }
}