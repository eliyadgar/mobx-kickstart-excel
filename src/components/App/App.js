import React from 'react';
import s from './App.scss';
import _ from 'lodash';
import Row from '../Row';
import Header from '../Header';
import FormulaEditor from '../FormulaEditor';

function App() {
    return (
        <div>
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