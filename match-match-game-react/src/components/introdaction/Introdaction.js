import React from 'react';
import { connect } from 'react-redux';

import Button from './../Button.js';
import './introdaction.css';
import Input from './../input/Input';
import RadioButtons from './../input/radioButtons';
import { period, leaderBoard, saveInLocalStorage } from './../../utils';
import { chooseBackCard, makeCardArray, startTimer } from './../../actions/actionTypes';
import cardsArr from './../card/cardsArray';
import { shuffle } from './../../utils';

class Introduction extends React.Component {
    constructor(props) {
        super(props);
        this.openCardField = this.openCardField.bind(this);
        this.chooseBackCardHandler = this.chooseBackCardHandler.bind(this);
    }

    openCardField(event) {
        event.preventDefault();

        // initialisation cards array
        const temp = JSON.parse(JSON.stringify(cardsArr.slice(0, this.props.level)));
        let cardsArray = cardsArr.slice(0, this.props.level);
        cardsArray = cardsArray.concat(temp);
        shuffle(cardsArray);

        this.props.makeCardArray(cardsArray);

        // timer
        this.props.startTimer();
        const gridContainer = document.querySelector('.grid');

        document.querySelector('.greeting').style.display = 'none';
        document.querySelector('.playingField').style.display = 'block';
        let mainField = document.querySelector('.wrapper');
        let mainNew = document.querySelector('.cardsField');

        mainField.style.display = 'block';
        // startTimer();
    }

    chooseBackCardHandler(evt) {
        this.props.chooseBackCard(evt.target.id);

        const newClassName = 'choose active';
        const all = document.querySelectorAll('.choose');
        all.forEach((elem) => {elem.className = 'choose'});
        evt.target.className += ' active';
    }

    render() {
        const forUserName = {
            type: 'text',
            id: 'firstName',
            placeholder: 'Имя *',
            labelText: 'Твое имя: ',
            for: 'firstName',
            maxLength: '30',
        };
        const forLastName = {
            type: 'text',
            id: 'lastName',
            placeholder: 'Фамилия',
            labelText: 'Твоя фамилия: ',
            for: 'lastName',
            maxLength: '30',
        };
        const forEmail = {
            type: 'email',
            id: 'email',
            placeholder: 'Твой email *',
            labelText: 'Email: ',
            for: 'email',
        };

        return (
            <div className="introduction">
                <h1>Давай познакомимся:</h1>
                <form method="" action ="" name="formMain"
                    className = "flex-container form-fields" >
                    <Input { ...forUserName} />
                    <Input { ...forLastName} />
                    <Input { ...forEmail} />
                </form>

                <h1>Выбери карты:</h1>
                <ul id="back-card">
                    <li>
                        <img id="back-1.png" className='choose active' onClick={this.chooseBackCardHandler} src="../Images/back-1.png" alt="cover-1" />
                    </li>
                    <li>
                        <img id="back-2.png" className='choose' onClick={this.chooseBackCardHandler} src="../Images/back-2.png" alt = "cover-2" />
                    </li>
                    <li>
                        <img id="back-3.png" className='choose' onClick={this.chooseBackCardHandler} src="../Images/back-3.png" alt = "cover-3" />
                    </li>
                </ul>

                <h1>Выбери сложность:</h1>
                <div id="difficulty" className="difficulties">
                    <RadioButtons />
                </div>

                <Button name="go" id="start" type="submit" className="buttonStart" onClick = {this.openCardField}/>
            </div>
        );
    }
}

export default connect(
    state => (
        {
            backCard: state.backCard,
            cards: state.cards,
            level: state.level,
            timer: state.timer,
        }),
    {
        chooseBackCard,
        makeCardArray,
        startTimer,
    },
)(Introduction);
