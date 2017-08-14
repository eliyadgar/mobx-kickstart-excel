import React from 'react';
import PropTypes from 'prop-types';
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
                   className={s.formulaInput}
                   onChange={this.onChange}
                   onKeyPress={this.onKeyPress}
                   value={this.state.value}
            />
        )
    }

}

InputWithState.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

const FormulaEditor = () => (
    <InputWithState value={excelStore.selectedCellData}
                    onChange={(newData) => excelStore.setSelectedCellData(newData)}
    />
);

export default observer(FormulaEditor);