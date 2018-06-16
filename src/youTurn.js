import {
    level,
    Game,
} from './game';
import createWaterfall from './waterfall';
import canvasLightning from './lightning';
import explosion from './explosion';
import health from './health-animation';
import fire from './fire-animation';
import fireballs from './fireballs';


import {
    saveInLocalStorage,
    leaderBoard,
} from './leaderBoard';

export function makeMagic(n, div1, div2, div3, div4) {
    switch (n) {
    case 1:
        createWaterfall(div1, div2);
        break;
    case 2:
        canvasLightning(div1, div2);
        break;
    case 3:
        health(div3, div4);
        break;
    case 4:
        explosion(div1, div2);
        break;
    case 5:
        fire(div1, div2);
        break;
    case 6:
        fireballs(div1, div2);
        break;
    case 7:
        health(div3, div4);
        break;
    case 8:
        createWaterfall(div1, div2);
        break;
    case 9:
        createWaterfall(div1, div2);
        break;
    case 10:
        canvasLightning(div1, div2);
        break;
    case 11:
        health(div3, div4);
        break;
    case 12:
        fire(div1, div2);
        break;
    case 13:
        createWaterfall(div1, div2);
        break;
    case 14:
        fire(div1, div2);
        break;
    case 15:
        explosion(div1, div2);
        break;
    default:
        break;
    }
}

export function makeTurn(magic, points, player1, player2, classAboutPlayer, idPlayerLife, classAboutMonster, idMonsterLife, whoMakeTurn) {
    const temp = document.querySelector('.points');

    setTimeout(() => {
        temp.className = 'points';

        if (magic === 3 || magic === 7 || magic === 11) {
            player1.score += points;
            temp.innerHTML = `${whoMakeTurn} прибавил<br />к своему здоровью<br />${points} пунктов!`;
            if (player1.score > 100 * (level + 0.25)) {
                player1.score = Math.floor(100 * (level + 0.25));
                temp.innerHTML = `${whoMakeTurn} уже очень здоров! :) <br />Пора ходить!`;
            }
            document.querySelector(`${classAboutPlayer}`).lastChild.innerHTML = player1.score;
            temp.className += ' appear';
            document.querySelector(`${idPlayerLife}`).style.width = `${`${player1.score * 2.5}px`}`;
            document.querySelector(`${idPlayerLife}`).style.transition = 'width 0.7s ease-in-out';
            document.querySelector(`${idPlayerLife}`).title = player1.score;
            setTimeout(() => {
                temp.className += ' animated fadeOutDown';
            }, 3000);
        } else {
            player2.score -= points;

            if (player2.score <= 0) {
                document.querySelector(`${classAboutMonster}`).lastChild.innerHTML = 0;
                temp.innerHTML = `${whoMakeTurn} нанес <br />сокрушительный урон<br />в ${points} пунктов!`;
                temp.className += ' appear';
                document.querySelector(`${idMonsterLife}`).style.width = '0';
                document.querySelector(`${idMonsterLife}`).style.transition = 'width 0.7s ease-in-out';
                document.querySelector(`${idMonsterLife}`).title = 0;
                document.querySelector('.buttonMagic').innerHTML = '';
                setTimeout(() => {
                    temp.className += ' animated fadeOutDown';

                    if (player2.name === 'Крош') {
                        document.querySelector('.field').style.display = 'none';
                        document.querySelector('.gameOver').style.display = 'block';
                        saveInLocalStorage().saveData();
                        leaderBoard();
                    } else {
                        document.querySelector('.field').style.display = 'none';
                        document.querySelector('.nextRaund .winner').innerHTML = `Ты выиграл! :)<br />Попробуй победить следующего монстра.<br /><br /> Раунд ${level / 0.25 - 2}`;
                        document.querySelector('.nextRaund').style.display = 'block';
                        document.querySelector(`${idMonsterLife}`).innerHTML = '';
                        document.querySelector(`${idPlayerLife}`).innerHTML = '';
                        document.querySelector(`${classAboutMonster}`).lastChild.remove();
                        document.querySelector(`${classAboutPlayer}`).lastChild.remove();
                        document.querySelector('#player').innerHTML = '';
                        document.querySelector('#monster').innerHTML = '';
                        document.querySelector('.hero').remove();
                        document.querySelector('.monster').remove();
                        document.querySelector('.field').lastChild.remove();
                        setTimeout(() => {
                            document.querySelector('.nextRaund').style.display = 'none';
                            document.querySelector('.field').style.display = 'grid';
                            temp.innerHTML = '';
                        }, 4000);

                        const nextRaund = new Game();
                    }
                }, 3000);

            } else {
                document.querySelector(`${classAboutMonster}`).lastChild.innerHTML = player2.score;
                temp.innerHTML = `${whoMakeTurn} нанес <br />сокрушительный урон<br />в ${points} пунктов!`;
                temp.className += ' appear';
                document.querySelector(`${idMonsterLife}`).style.width = `${`${player2.score * 2.5}px`}`;
                document.querySelector(`${idMonsterLife}`).style.transition = 'width 0.7s ease-in-out';
                document.querySelector(`${idMonsterLife}`).title = player2.score;
                setTimeout(() => {
                    temp.className += ' animated fadeOutDown';
                }, 3000);
            }
        }
    }, 2000);

    temp.innerHTML = '';
}
