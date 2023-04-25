import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SeachApiService from './js/seach-service';
import hitsTpl from './templates/hits.hbs';
import LoadMoreBtn from './js/load-more-btn';
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
});
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.seachForm.addEventListener('submit', onSeach);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSeach(e) {
  e.preventDefault();

  seachApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  seachApiService.resetPage();
  loadMoreBtn.show();
  loadMoreBtn.disable();

  
  onFetchHits();
}

async function onFetchHits() {
  try {
    const hits = await seachApiService.fetchHits(seachApiService.query)
    console.log(seachApiService.query)
    createGallery(hits);
    simpleLightbox.refresh();
    loadMoreBtn.enable();
  } catch (error) {
     onFetchError();
        clearGallery();
  }
  }


// function onFetchHits() {
//   seachApiService
//     .fetchHeats()
//     .then(hits => {
//       createGallery(hits);
//       simpleLightbox.refresh();
//       loadMoreBtn.enable();
//     })
//     .catch(error => {
//       onFetchError();
//       clearGallery();
//     });
// }

function onLoadMore() {
  loadMoreBtn.disable();
  if (
    seachApiService.page * seachApiService.perPage >
    seachApiService.totalHits
  ) {
    reachedEndImages();
    loadMoreBtn.hide();
  }
  onFetchHits();
}

function createGallery(hits) {
  if (seachApiService.query === '') {
    loadMoreBtn.hide();
    onFetchError();
    return;
  }

  if (seachApiService.totalHits === 0) {
    loadMoreBtn.hide();
    noSeachError();
    return;
  } 
  
  else {
    // clearGallery();
    loadMoreBtn.enable();
    totalImagesFound(seachApiService.totalHits);
    return refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
