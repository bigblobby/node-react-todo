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

