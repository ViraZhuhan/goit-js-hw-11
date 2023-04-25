import axios from 'axios';
const API_KEY = `35492666-a0d5fecb0778e5a5f1e0518fb`;
const URL = `https://pixabay.com/api/`;

export default class SeachApiService {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.searchQuery = '';
    this.totalHits = 0;
  }

  async fetchHits(searchQuery) {
    const response = await axios.get(
      `${URL}/?key=${API_KEY}&q=${searchQuery}
      &image_type=${this.imageType}
      &orientation=${this.orientation}
      &safesearch=${this.safesearch}
      &per_page=${this.perPage}&page=${this.page}`
    );

    this.incrementPage();

    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.seachQuery;
  }

  set query(newQuery) {
    this.seachQuery = newQuery;
  }
}
