import View from './View.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //1)) first page and others
    if (currPage === 1 && numPages > 1) {
      return `
        
            <button data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
                <span>Page ${currPage + 1}</span>
            </button>
      `;
    }
    //2)) last page
    if (currPage === numPages && numPages > 1) {
      return `
            <button data-goto="${
              currPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
            `;
    }
    //3)) other page
    if (currPage < numPages) {
      return `
            <button data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
                <span>Page ${currPage + 1}</span>
            </button>
            <button data-goto="${
              currPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
      `;
    }
    //4)) only one page
    return '';
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      const gotoPage = +button.dataset.goto;
      handler(gotoPage);
    });
  }
}
export default new PaginationView();
