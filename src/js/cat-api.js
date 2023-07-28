import axios from 'axios';

const selectEl = document.querySelector('.breed-select');
const loaderBoxEl = document.querySelector('.loader-box');

export function fetchBreeds() {
    const BASE_URL = "https://api.thecatapi.com/v1";
    const API_KEY = "live_OUvRblJ2djhUvFUkCPFSZQEvQaHsmQkn1OJ2RrON2bKN3br4o1DiSrxDHnyk3Jow";
    
    axios.defaults.headers.common["x-api-key"] = API_KEY;

    return axios.get(`${BASE_URL}/breeds`).then((resp) => {
        loaderBoxEl.classList.add('is-hidden');
        selectEl.classList.remove('is-hidden');

        return resp;
    }).catch((error) => {
        loaderBoxEl.classList.add('is-hidden');
        
        console.error(error.message);
    })
}

export function fetchCatByBreed(breedId) {
    const BASE_URL = "https://api.thecatapi.com/v1";
    const API_KEY = "live_OUvRblJ2djhUvFUkCPFSZQEvQaHsmQkn1OJ2RrON2bKN3br4o1DiSrxDHnyk3Jow";
    
    axios.defaults.headers.common["x-api-key"] = API_KEY;

    loaderBoxEl.classList.remove('is-hidden');
    
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`).then((resp) => {
        loaderBoxEl.classList.add('is-hidden');

        return resp;
    }).catch((error) => {
        loaderBoxEl.classList.add('is-hidden');

        console.error(error.message);
    })
}