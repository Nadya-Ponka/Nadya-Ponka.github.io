import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';

import './playingField.css';
import Button from '../Button';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import CardsField from '../card/CardsField';
import Something from '../Something';
//import { takeDataFromAPI } from '../../middleWare/takeDataFromAPI';

// export class is using to provide connectedComponent to jest
export class PlayingField extends React.Component {
    reset = () => {
        window.location.reload();
    }

    render() {
        return (
            <Fragment>
                <section className="playingField">
                    <CardsField />
                    <div className="win">
                        <p className="winner">Ура! Все пары найдены!
                            <br />Твое время:
                            <span id="score" className="timer"></span>
                        </p>
                        <div className="router">
                            <NavLink to="leader-board" className="buttonRouter" id="resultsTable" >Топ-10</NavLink>
                            <NavLink to="smth-else" className="buttonRouter">Info</NavLink>
                            <Route path='/leader-board' component={LeaderBoard} />
                            <Route path='/smth-else' component={Something} />
                        </div>
                        <Button className="buttonStart" text="Играть еще" onClick={this.reset}/>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        level: state.level,
        cards: state.cards,
        leaderBoard: state.leaderBoard,
    }),
/*     dispatch => ({
        showLeaderBoard: () => {
            dispatch(takeDataFromAPI());
        },
    }),
 */)(PlayingField);
