import { fetchPictures } from './fetchPictures';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
}

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const query = e.currentTarget.elements.searchQuery;
  fetchPictures(query).then(data => renderPictures(data));
})

function renderPictures({ hits }) {
  const markup = hits.map(el => {
    return `<div class="photo-card">
      <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${el.likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${el.views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${el.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${el.downloads}</b>
        </p>
    </div>
  </div>`
  }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
