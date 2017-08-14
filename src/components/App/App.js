import React from 'react';
import s from './App.scss';
import _ from 'lodash';
import Row from '../Row';
import Header from '../Header';

function App() {
    return (
        <div>
            <input type="text" className={s.formulaInput} />
            <table className={s.table}>
                <Header/>
                <tbody>
                    {_.times(10, rowIndex => <Row key={rowIndex} rowIndex={rowIndex}/>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;