import React from 'react';
import s from './App.scss';
import _ from 'lodash';
import Row from '../Row';

function App() {
  return (
      <div className={s.root}>
        <table>
            <tbody>
                { _.times(10, rowIndex => <Row key={rowIndex} rowIndex={rowIndex} />) }
            </tbody>
        </table>
      </div>
  );
}

export default App;