import {observable, action} from 'mobx';

const cellTag = (rowIndex, cellIndex) => `${rowIndex},${cellIndex}`;

const excelStore = observable({
    selectedCell: null,
    data: observable.map({}),
    isCellSelected: function (rowIndex, cellIndex) {
        return cellTag(rowIndex, cellIndex) === this.selectedCell;
    },
    getCellValue: function (rowIndex, cellIndex) {
        return this.data.get(cellTag(rowIndex, cellIndex));
    },
    selectCell: action(function (rowIndex, cellIndex) {
        this.selectedCell = cellTag(rowIndex, cellIndex);
    }),
    get selectedCellData() {
        return this.data.get(this.selectedCell) || '';
    },
    setSelectedCellData: action(function (value) {
       this.data.set(this.selectedCell, value);
    })
});


window.excelStore = excelStore;

export default excelStore;
