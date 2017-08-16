import * as mobx from 'mobx';

const {observable, action, computed} = mobx;

const cellRegex = new RegExp('[A-J][1-9][0-9]*', 'g');

export const store = observable({
  cells: observable.map({'A1': '5',
                          'B3': '6',
                          'E5': '=A1 * 4'}),
  selectedCell: '',
  getCellData(row, col) {
    const id = this.getCellId(row, col);
    const val =  this.cells.get(id);
    if (val) {
      return this.evaluateValue(val);
    }
  },
  getCellDataById(id) {
    return this.cells.get(id) ? this.cells.get(id) : '';
  },
  setCellData: action(function(row, col, data){
    const id = this.getCellId(row, col);
    this.cells.set(id, data);
  }),
  setCellDataById: action(function(id, data){
    this.cells.set(id, data);
  }),
  getCellId(row, col) {
    return String.fromCharCode(col + 'A'.charCodeAt(0))+(row+1);
  },
  setSelectedCell: action('selected', function(row, col) {
    this.selectedCell = this.getCellId(row, col);
    console.log('selectedCell: ', this.selectedCell);
  }),
  evaluateValue(formula) {
    formula = formula.replace('=', '');
    const cells = formula.match(cellRegex);
    if (cells) {
      cells.forEach(cellId => {
        formula = formula.replace(cellId, this.evaluateValue(this.getCellDataById(cellId)))
      });
    }
    return eval(formula);
  }
});


window.store = store;
