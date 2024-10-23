import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDom.querySelectorAll('*');
    const currElements = this._parentElement.querySelectorAll('*');
    // const newElements = Array.from(newDom.querySelectorAll('*'));
    // const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      if (
        !newEl.isEqualNode(currElements[i]) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currElements[i].textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(currElements[i]))
        Array.from(newEl.attributes).forEach(attr =>
          currElements[i].setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const spinner = `
            <div class="spinner">
              <svg>
                <use href="${icons}.svg#icon-loader"></use>
              </svg>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
              <div>
                <svg>
                  <use href="${icons}.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
              <div>
                <svg>
                  <use href="${icons}.svg#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
