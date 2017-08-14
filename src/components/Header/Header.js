import React from 'react';
import s from './Header.scss';
import _ from 'lodash';

function Header() {
  return (
      <tr>
          <td />
          { _.times(10, i => <th>{String.fromCharCode(i + 'A'.charCodeAt(0))}</th>) }
      </tr>
  );
}

export default Header;