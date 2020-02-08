import axios from 'axios';

const cache = {};

function getCached(key, fallback){
    if(cache[key] !== undefined) return cache[key];
    cache[key] = fallback();
    return cache[key];
}

export function getDataAtUrl(url, cacheResults = false){
    if(!cacheResults) return axios.get(url);

    return getCached(url, () => {
        return axios.get(url)
    });
}

export function getProducts(params){
    let url = '/api/product?set=' + params.set + '&limit=15';

    return getCached(url, () => {
        return axios.get(url);
    });
}

export function deleteTodo(id){
    console.log(id);
    return axios.delete('/api/todo/' + id);
}

export function register(params){
    const url = '/api/user/register';
    return axios.post(url, params);
}

export function login(params){
    const url = '/api/user/login';
    return axios.post(url, params);
}

export function verifyAndGetUser(params){
    const url = '/api/user/verify-token';
    return axios.post(url, params);
}

