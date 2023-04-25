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
      `${URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );

    // this.totalHits = data.totalHits;
    this.incrementPage();

    return response.data.hits;
  }


  //  fetchHeats() {
  //   return fetch(
  //       `${URL}?key=${API_KEY}&q=${this.seachQuery}&page=${this.page}&per_page=${this.perPage}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}`
  //     )
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.incrementPage();
  //       this.totalHits = data.totalHits;
  //       return data.hits;
  //     });

  // }

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