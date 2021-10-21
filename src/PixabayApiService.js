const API_KEY = '23951184-b06d9454dd7ae17cb77deccea';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo'; 
const ORIENTATION = 'horizontal';
const SAFE_SEARCH = 'true';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safe_search=${SAFE_SEARCH}&page=${this.page}&per_page=40`;

    const response = await fetch(url);
    this.incrementPage();
    return await response.json();
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}