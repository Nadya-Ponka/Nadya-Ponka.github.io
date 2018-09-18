import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Input from './Input';
import { chooseGameDifficulty } from './../../actions/actionTypes';

class RadioButtons extends React.Component {
    constructor(props) {
        super(props);
        this.chooseLevelHandler = this.chooseLevelHandler.bind(this);
    }

    chooseLevelHandler(evt) {
        this.props.chooseGameDifficulty(evt.target.value);

        let mainNew = document.querySelector('.cardsField');
        let wrapper = document.querySelector('.wrapper');
        if (evt.target.value === '5') {
            mainNew.style.gridTemplateColumns = 'repeat(5, 20%)';
            wrapper.style.width = '900px';
            // gridSize = 0;
        }
        if (evt.target.value === '9') {
            mainNew.style.gridTemplateColumns = 'repeat(6, 16.6%)';
            wrapper.style.width = '1100px';
            // gridSize = 1;
        }
        if (evt.target.value === '12') {
            mainNew.style.gridTemplateColumns = 'repeat(8, 12.5%)';
            wrapper.style.width = '1300px';
            // gridSize = 2;
        }
    }

    render() {
        const commonProps = {
            type: 'radio',
            onChange: this.chooseLevelHandler,
        };

        return (
            <Fragment>
                <Input {...commonProps} id="easy" value = "5" checked={this.props.level === '5'} labelText={'Easy (5 * 2)'} />
                <Input {...commonProps} id="medium" value = "9" checked={this.props.level === '9'} labelText={'Meduim (6 * 3)'} />
                <Input {...commonProps} id="hard" value = "12" checked={this.props.level === '12'} labelText={'Hard (8 * 3)'} />
            </Fragment>
        );
    }
}

export default connect(
    state => ({ level: state.level }),
    {
        chooseGameDifficulty,
    },
)(RadioButtons);
