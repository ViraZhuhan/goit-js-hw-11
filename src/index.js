import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SeachApiService from './js/seach-service';
import hitsTpl from './templates/hits.hbs';
import LoadMoreBtn from './js/load-more-btn';
import TopBtn from './js/top-btn'
import {
  noSeachError,
  onFetchError,
  totalImagesFound,
  reachedEndImages,
} from './js/messages';

const refs = {
  seachForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const seachApiService = new SeachApiService();

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 100,
});
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const topBtn = new TopBtn({
  selector: '[data-action="top"]',
  hidden: true,
});

let searchQuery = '';

refs.seachForm.addEventListener('submit', onSeach);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
topBtn.refs.button.addEventListener('click', slowScroll);

async function onSeach(e) {
  e.preventDefault();

  seachApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  searchQuery = seachApiService.query;

  try {
    const { totalHits, hits, perPage } = await seachApiService.fetchHits(
      searchQuery
    );

    if (seachApiService.query === '') {
      loadMoreBtn.hide();
      topBtn.hide();
      onFetchError();
      return;
    }

    if (totalHits === 0) {
      loadMoreBtn.hide();
      topBtn.hide();
      noSeachError();
      return;
    }

    seachApiService.resetPage();
    createGallery(hits);
    totalImagesFound(totalHits);
    loadMoreBtn.show();
    topBtn.show();
    loadMoreBtn.enable();
    simpleLightbox.refresh();
  } catch (error) {
    onFetchError();
    clearGallery();
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    const { page, perPage, totalHits, hits } = await seachApiService.fetchHits(
      searchQuery
    );

    if (page * perPage > totalHits) {
      reachedEndImages();
      loadMoreBtn.hide();
      return;
    }

    createGallery(hits);
    simpleLightbox.refresh();
    loadMoreBtn.enable();
  } catch (error) {
    reachedEndImages();
    loadMoreBtn.hide();
  }
}

function createGallery(hits) {
  clearGallery();
  refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function slowScroll() {
const galleryElement = document.querySelector('.gallery').firstElementChild;
  if (galleryElement) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
    });
  }
}
