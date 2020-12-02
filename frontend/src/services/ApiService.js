import apiConfig from './config'
let headers = localStorage.getItem('token');
export default class ApiService{
    constructor(endpoint){
        this.endpoint = endpoint;
    }
    getList(){
        return apiConfig.get(`/${this.endpoint}/`,headers); 
    }

    getOne(pk){
        return apiConfig.get(`/${this.endpoint}/${pk}`); 
    }

    async create(data){
        return await apiConfig.post(`/${this.endpoint}/`,data);
    }

    async update(data,pk){
        return await apiConfig.put(`/${this.endpoint}/${pk}/`,data);
    }

    async delete(pk){
        return await apiConfig.delete(`/${this.endpoint}/${pk}/`);
    }

}