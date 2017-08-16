import _ from 'lodash';
import React from 'react';
import s from './App.scss';
import Row from '../Row';
import Header from '../Header';
import FormulaEditor from '../FormulaEditor';

import mobx from 'mobx';
import mobxReact from'mobx-react';
import DevTools from 'mobx-react-devtools';

function App() {
    return (
        <div className={s.root}>
          <DevTools/>
            <FormulaEditor />
            <table className={s.table}>
                <tbody>
                    <Header/>
                    {_.times(10, rowIndex => <Row key={rowIndex} rowIndex={rowIndex}/>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;