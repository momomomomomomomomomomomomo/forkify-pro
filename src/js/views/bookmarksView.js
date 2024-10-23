import previewView from './previewView';
import View from './View';
class ResultsView extends View {
  _errorMessage =
    'there is no bookmarks, search for som recipes and bookmark it.';
  _message = '';
  _parentElement = document.querySelector('.bookmarks');
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new ResultsView();
