import axios from 'axios';

class Api {
    cache = {};

    getCached(key, fallback){
        if(this.cache[key] !== undefined) return this.cache[key];
        this.cache[key] = fallback();
        return this.cache[key];
    }

    getDataAtUrl(url, cacheResults = false){
        if(!cacheResults) return axios.get(url);

        return this.getCached(url, () => {
            return axios.get(url)
        });
    }

    getProducts(params){
        let url = '/api/product?set=' + params.set + '&limit=15';

        return this.getCached(url, () => {
            return axios.get(url);
        });
    }

    deleteTodo(id){
        console.log(id);
        return axios.delete('/api/todo/' + id);
    }

    register(params){
        const url = '/api/user/register';
        return axios.post(url, params);
    }

    login(params){
        const url = '/api/user/login';
        return axios.post(url, params);
    }

    verifyAndGetUser(params){
        const url = '/api/user/verify-token';
        return axios.post(url, params, {
            headers: {
                Authorization: 'Bearer ' + params.token
            }
        });
    }

    articleSearch(params){
        const url = '/api/product/search';
        return axios.post(url, params);
    }

    contactEnquiry(params){
        const url = '/api/enquiry/contact-us';
        return axios.post(url, params);
    }
}

export default new Api();
