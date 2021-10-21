import PixabayApiService from './PixabayApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './styles/styles.css'

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
}
const lightbox = new SimpleLightbox('.gallery a');
const pixabayApi = new PixabayApiService;
let displayedHits = 0;

refs.form.addEventListener('submit', onSubmit)

refs.loadMoreBtn.addEventListener('click', () => {
  pixabayApi.fetchPictures().then(({ totalHits, hits }) => {
    renderPictures(hits);
    lightbox.refresh();
    displayedHits += hits.length;
    
    if (displayedHits === totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.warning('We are sorry, but you have reached the end of search results.');
    }
  })
})

function renderPictures(arr) {
  const markup = arr.map(el => {
    return `<div class="photo-card">
      <a href=${el.largeImageURL}><img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes </b> <span>${el.likes}</span>
        </p>
        <p class="info-item">
          <b>Views </b> <span>${el.views}</span>
        </p>
        <p class="info-item">
          <b>Comments </b> <span>${el.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads </b> <span>${el.downloads}</span>
        </p>
    </div>
  </div>`
  }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onSubmit(e) {
  e.preventDefault();

  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
  
  if (pixabayApi.searchQuery === '') return Notify.warning('Common, type something (=')

  pixabayApi.resetPage();
  resetGalleryContainer();
  refs.loadMoreBtn.classList.add('is-hidden');

  pixabayApi.fetchPictures().then(({ totalHits, hits }) => {
    displayedHits = 0;
    displayedHits += hits.length;
    

    if (totalHits === 0) return Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    renderPictures(hits);
    lightbox.refresh();
    Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.loadMoreBtn.classList.remove('is-hidden');

    if (displayedHits === totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.warning('We are sorry, but you have reached the end of search results.');
    }
  });
}

function resetGalleryContainer() {
  refs.gallery.innerHTML = '';
}