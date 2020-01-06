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

