import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {observer} from 'mobx-react';
import {computed} from 'mobx';
import excelStore from '../../stores/excelStore';
import classnames from 'classnames';

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.isSelected = computed(() => {
            return excelStore.isCellSelected(this.props.rowIndex, this.props.cellIndex);
        });

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        excelStore.selectCell(this.props.rowIndex, this.props.cellIndex)
    }

    render() {
        const value = excelStore.getCellValue(this.props.rowIndex, this.props.cellIndex);
        return (
            <td
                className={classnames(s.cell, {[s.selectedCell]: this.isSelected.get()})}
                onClick={this.onClick}
            >
                {value}
            </td>
        );
    }
}

Cell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);