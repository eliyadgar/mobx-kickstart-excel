import {observable, computed, action} from 'mobx';

const A_CHAR_CODE = 'A'.charCodeAt(0);

const toCellId = (rowIndex, cellIndex) => `${rowIndex},${cellIndex}`;

const cellNameToCellId = (cellName) => {
    const rowIndex = Number(cellName[1]) - 1;
    const cellIndex = cellName.charCodeAt(0) - A_CHAR_CODE;

    return toCellId(rowIndex, cellIndex);
};

const resolvedValues = observable.shallowMap({}, 'resolvedValuesMap');

const getResolvedCellValue = cellId => resolvedValues.has(cellId) ? resolvedValues.get(cellId).get() : '';

const excelStore = observable.object({
    selectedCell: null,
    data: observable.map({}, 'cellsDataMap'),
    isCellSelected: function (rowIndex, cellIndex) {
        return toCellId(rowIndex, cellIndex) === this.selectedCell;
    },
    getCellValue: function (rowIndex, cellIndex) {
        const cellId = toCellId(rowIndex, cellIndex);
        return getResolvedCellValue(cellId);
    },
    selectCell: action('selectCell', function (rowIndex, cellIndex) {
        this.selectedCell = toCellId(rowIndex, cellIndex);
    }),
    get selectedCellData() {
        return this.data.get(this.selectedCell) || '';
    },
    setSelectedCellData: action('setSelectedCellData', function (value) {
       this.data.set(this.selectedCell, value);
    })
}, 'excelStore');

excelStore.data.observe(change => {
    if (change.type === 'add') {
        resolvedValues.set(change.name, createComputedCellValue(change.name));
    }
});

const createComputedCellValue = cellTag => {
    return computed(() => {
        const cellData = excelStore.data.get(cellTag);
        if (cellData.indexOf('=') === -1) {
            return cellData;
        }

        const formula = cellData.replace(/[A-Z]\d/ig, cellName => {
            const cellId = cellNameToCellId(cellName);
            return Number(getResolvedCellValue(cellId) || 0);
        });

        return eval(formula.replace('=', ''));
    }, {name: `resolvedValue(${cellTag})`});
};


window.excelStore = excelStore;

export default excelStore;
