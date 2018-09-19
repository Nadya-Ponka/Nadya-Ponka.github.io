import React, { Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
//import { createSelector } from 'reselect';

import Card from './Card';
import { sendDataToAPI, secondsInTimeFormat } from '../../utils';
import Timer from '../Timer';
import { makeCardArray, stopTimer, flipCard, matchFound, setLastFlippedCard, showLeaderBoard } from '../../actions/actionTypes';
import { takeDataFromAPI } from '../../middleWare/takeDataFromAPI';

class CardsField extends React.Component {
    checkMatch = (value, id) => {
        if (this.props.flipped) {
            return;
        }

        const { cards } = this.props;
        cards[id].flipped = true;
        cards[id].rotate += ' rotate';
        let matches = this.props.matches;
        const len = this.props.cards.length;

        this.props.flipCard(true);
        if (this.props.lastCard) {
            if (value === this.props.lastCard.value) {
                cards[id].matched = true;
                cards[this.props.lastCard.id].matched = true;
                this.props.setLastFlippedCard(null);
                this.props.flipCard(false);
                this.props.matchFound(matches + 1);
                matches += 1;
            } else {
                setTimeout(() => {
                    cards[id].flipped = false;
                    cards[id].rotate = 'inside';
                    cards[this.props.lastCard.id].flipped = false;
                    cards[this.props.lastCard.id].rotate = 'inside';
                    this.props.setLastFlippedCard(null);
                    this.props.flipCard(false);
                }, 1000);
            }
        } else {
            this.props.setLastFlippedCard({ value, id });
            this.props.flipCard(false);
        }
        this.props.makeCardArray(cards);

        if (matches !== 0 && matches === len / 2) {
            this.gameFinish();
        }
    }

    renderCards = (cards) => {
        return cards.map((card, index) => {
            return (
                <Card
                    key={index}
                    value={card.value}
                    id={index}
                    matched={card.matched}
                    flipped={card.flipped}
                    checkMatch={this.checkMatch}
                    rotate={card.rotate}
                    src={card.img}
                    back={`../../../Images/${this.props.backCard}`} />
            );
        });
    }

    gameFinish = () => {
        this.props.stopTimer();

        const arrayOfTime = document.querySelector('#myTimer').innerHTML.split(':');
        const totalScore = Number(arrayOfTime[2]) + Number(arrayOfTime[1]) * 60 + Number(arrayOfTime[0]) * 3600;
        sendDataToAPI(totalScore);

        document.getElementById('score').innerHTML = secondsInTimeFormat(totalScore);
        document.querySelector('.timer').style.visibility = 'hidden';

        setTimeout(() => {
            document.querySelector('.wrapper').style.display = 'none';
            document.querySelector('.win').style.display = 'grid';
            this.props.showLeaderBoard(takeDataFromAPI);
        }, 2000);
    }

    render() {
        return (
            <Fragment>
                <Timer updateInterval={1000}/>
                <div className="wrapper">
                    <div className="flex-container cardsField">
                        {
                            this.renderCards(this.props.cards)
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    state => (
        {
            backCard: state.backCard,
            cards: state.cards,
            startedAt: state.startedAt,
            stoppedAt: state.stoppedAt,
            flipped: state.flipped,
            matches: state.matches,
            lastCard: state.lastCard,
        }),
    {
        makeCardArray,
        stopTimer,
        flipCard,
        matchFound,
        setLastFlippedCard,
        showLeaderBoard,
    },
)(CardsField);
