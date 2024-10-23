import previewView from './previewView';
import View from './View';
class ResultsView extends View {
  _errorMessage =
    "Sorry mam/sir we couldn't find this recipe query. pls try again.";
  _message = '';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
