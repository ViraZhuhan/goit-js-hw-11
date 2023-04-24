import Notiflix from 'notiflix';

export { noSeachError, onFetchError, totalImagesFound, reachedEndImages}

function noSeachError() {
    Notiflix.Notify.warning(
      `Sorry, there are no images matching your search query. Please try again`
    );
  }
  
  function onFetchError() {
    Notiflix.Notify.failure(`Please write something and try again`);
  }
  
  function totalImagesFound(total) {
    Notiflix.Notify.success(
      `'Hooray! We found ${total} images.'`
    );
  }
  
  function reachedEndImages() {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  