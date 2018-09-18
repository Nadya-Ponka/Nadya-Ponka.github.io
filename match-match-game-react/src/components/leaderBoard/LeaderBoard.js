import React, {	Fragment } from 'react';
import { connect } from 'react-redux';

import StrokeLeaderBoard from './strokeLeaderBoard';

class LeaderBoard extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="leaderBoard">
                    <h1>Топ-10:</h1>
                    <div className="leaderBoard-tabs"></div>
                    <div className="leaderBoard-results">
                        <table className="leaderBoard-results-table">
                            <tbody >
                                <tr>
                                    <th className="table-name">name</th>
                                    <th>email</th>
                                    <th>score</th>
                                </tr>
                                {
                                    this.props.leaderBoard.map((elem, index) => (<StrokeLeaderBoard key={index} name={elem.username} email={elem.email} score={elem.score}/>))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default connect(
    state => ({
        leaderBoard: state.leaderBoard,
    }),
)(LeaderBoard);
