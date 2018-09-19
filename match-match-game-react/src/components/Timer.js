import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { startTimer, stopTimer } from '../actions/actionTypes';

import { secondsInTimeFormat } from '../utils';

function getElapsedTime(startedAt, stoppedAt) {
    if (!startedAt) {
        return 0;
    }
    return (Math.floor((stoppedAt - startedAt) / 1000));
}

class Timer extends React.Component {
    componentDidMount() {
        this.interval = setInterval(this.forceUpdate.bind(this), this.props.updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { startedAt } = this.props;
        const elapsed = getElapsedTime(startedAt, new Date().getTime());

        return (
            <Fragment>
                <p className="timer">
                    <span id="myTimer">{secondsInTimeFormat(elapsed)}</span>
                </p>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { startedAt, stoppedAt } = state;
    return { startedAt, stoppedAt };
}

export default connect(mapStateToProps, { startTimer, stopTimer })(Timer);
