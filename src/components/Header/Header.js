import React from 'react';
import s from './Header.scss';

function Header() {
  return (
      <tr className={s.tableHeader}>
          <td />
          { _.times(10, i => <th key={i}>{String.fromCharCode(i + 'A'.charCodeAt(0))}</th>) }
      </tr>
  );
}

export default Header;