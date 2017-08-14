import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { computed, reaction } from 'mobx';
import { observer } from 'mobx-react';
import s from './FormulaEditor.scss';
import excelStore from '../../stores/excelStore';

class InputWithState extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onChange(this.state.value);
        }
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <input type="text"
                   disabled={this.props.disabled}
                   className={s.formulaInput}
                   onChange={this.onChange}
                   onKeyPress={this.onKeyPress}
                   value={this.state.value}
            />
        )
    }

}

InputWithState.propTypes = {
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

class FormulaEditor extends React.Component {

    constructor(props) {
        super(props);
        reaction(() => excelStore.selectedCell, () => ReactDOM.findDOMNode(this.refs.input).focus());
        this.isFormulaInputEnabled = computed(() => !!excelStore.selectedCell, {name: 'isFormulaInputEnabled'});
    }

    render() {
        return (
            <div className={s.formulaEditor}>
                Formula:
                <InputWithState ref="input"
                                value={excelStore.selectedCellData}
                                onChange={(newData) => excelStore.setSelectedCellData(newData)}
                                disabled={!this.isFormulaInputEnabled}
                />
            </div>
        );
    }
}

export default observer(FormulaEditor);