import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector('.breed-select');
const errorTextEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

selectEl.addEventListener('change', onSelectBreed);

selectEl.classList.add('is-hidden');
errorTextEl.classList.add('is-hidden');

fetchBreeds();

let breedsArr = [];

fetchBreeds().then((resp) => {
    resp.data.map((element) => (breedsArr.push({ name: element.name, value: element.id })));

    const selectorMarkup = createSelectorMarkup(breedsArr);

    selectEl.insertAdjacentHTML('beforeend', selectorMarkup);

    new SlimSelect({
        select: selectEl
    })
}).catch(onFetchError);

function createSelectorMarkup(array) {
    return array.map(({ name, value }) => {
        return `<option value="${value}">${name}</option>`
    }).join('');
    }

function onFetchError(error) {
    Notify.failure(errorTextEl.textContent, {
        position: 'center-top',
    });
}

function onSelectBreed(evt) {
    const breedId = evt.target.value;

    fetchCatByBreed(breedId).then((resp) => {
        const catInfoObj = {
            url: resp.data[0].url,
            title: resp.data[0].breeds[0].name,
            description: resp.data[0].breeds[0].description,
            temperament: resp.data[0].breeds[0].temperament
        };

        const catByBreedMarkup = createCatByBreedMarkup(catInfoObj);
        catInfoEl.innerHTML = catByBreedMarkup;
    }).catch(onFetchError);
}

function createCatByBreedMarkup(obj) {
    return `<div class="image-box">
                <img src="${obj.url}" alt="${obj.title}" width="400">
            </div>
            <div class="description-box">
                <h2>${obj.title}</h2>
                <p>${obj.description}</p>
                <div class="temperament-box">
                    <h3>Temperament:</h3>
                    <p>${obj.temperament}</p>
                </div>
            </div>`
}
