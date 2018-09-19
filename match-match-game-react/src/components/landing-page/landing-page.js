import React from 'react';
import Button from '../Button';
import './landing-page.css';

class LandingPage extends React.Component {
    openFieldIntrodaction = (event) => {
        event.preventDefault();
        const screen = document.querySelector('.rules');
        console.log(screen);
        screen.style.animation = 'animate 1s linear forwards';

        setTimeout(() => {
            screen.style.display = 'none';
            document.querySelector('.introduction').style.display = 'block';
        }, 1000);
    }

    render() {
        return (
            <div className="rules">
                <img className="title" src="../../../Images/title.svg" alt="" /> 
                <p>Давай найдем каждому Смешарику пару! Переворачивай любые две карточки. Если они одинаковые — пара найдена. Найди пары
                    для всех. И поспеши!
                </p>
                <Button className="buttonStart" text="Начинай" onClick={this.openFieldIntrodaction}/>
		    </div>
        );
    }
}

export default LandingPage;