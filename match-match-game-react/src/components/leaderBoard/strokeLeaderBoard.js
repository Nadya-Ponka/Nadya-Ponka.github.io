import React, { Fragment } from 'react';

import { secondsInTimeFormat } from './../../utils';

class StrokeLeaderBoard extends React.Component {

    render() {
        const seconds = secondsInTimeFormat(this.props.score);
        return (
            <Fragment>
                <tr>
                    <td className="table-name">{this.props.name}</td>
                    <td>{this.props.email}</td>
                    <td>{seconds}</td>
                </tr>
            </Fragment>

        );
    }
}

export default StrokeLeaderBoard;
