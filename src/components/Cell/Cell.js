import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';

function Cell({rowIndex, cellIndex}) {
  return (
      <td className={s.cell}></td>
  );
}

Cell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    cellIndex: PropTypes.number.isRequired
};

export default Cell;