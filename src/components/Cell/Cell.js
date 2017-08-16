import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {store} from '../../store';
import {observer} from 'mobx-react'
import * as mobx from 'mobx';

const {computed} = mobx;

class Cell extends React.Component {
  componentWillMount() {
    const {rowIndex, cellIndex} = this.props;
    this.cellColor = computed(() => {
        return (store.getCellId(rowIndex, cellIndex) === store.selectedCell) ? 'lightblue' : 'white'
    })

  }

  render() {
    return (
      <td className={s.cell} style={{backgroundColor: this.cellColor.get()}}
       onClick={()=>store.setSelectedCell(this.props.rowIndex, this.props.cellIndex)}>{store.getCellData(this.props.rowIndex, this.props.cellIndex)}</td>
  )};
}

Cell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);