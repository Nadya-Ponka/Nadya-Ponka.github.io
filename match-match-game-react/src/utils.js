require('babel-core/register');
require('babel-polyfill');
/* export async function getScoreFromAPI () {
        const response = await fetch('http://mmg-score.herokuapp.com');
        return await response.json().then(function (myJson){return myJson});
}*/
export let period;

// leaderBoard
export let displayed;

function sortByField(arr, field) {
    function byField(a, b) {
        if (a[field] >= b[field]) return 1;
        if (a[field] < b[field]) return -1;
    }
    return arr.sort(byField);
}

export function secondsInTimeFormat(s) {
    function num(val) {
        val = Math.floor(val);
        return val < 10 ? `0${val}` : val;
    }
    const hours = (s / 3600) % 24;
    const minutes = (s / 60) % 60;
    const seconds = s % 60;
    return `${num(hours)}:${num(minutes)}:${num(seconds)}`;
}

export function leaderBoard(totalScore) {
    const userData = {
        username: document.querySelector('#firstName').value,
        email: document.querySelector('#email').value,
        score: totalScore,
        // tab: gridSize
    };
    const serialObj = JSON.stringify(userData);
    console.log('userData.score'+userData.score);

    (async () => {
        const rawResponse = await fetch('http://mmg-score.herokuapp.com', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: serialObj,
        });

        const dataBase = [];
        let dataFromAPI;

        fetch('http://mmg-score.herokuapp.com')
            .then(response => response.json())
            .then((myJson) => {
                dataFromAPI = myJson;
                const data = dataFromAPI.result;
                const keysLocalStorage = Object.keys(data);
                keysLocalStorage.forEach((key) => {
                    const returnedObj = data[key];
                    dataBase.push(returnedObj);
                });

                //setTimeout(() => {
                    const sorted = sortByField(dataBase, 'score');
                    displayed = sorted.splice(0, 55);
                    console.log(`displayed:   ${displayed}`);
                //}, 3000);
            })
            .catch(new Error('Something gone wrong'));
    })();
}

// Fisher--Yates Algorithm перемешивания массива рандомом
export function shuffle(arrayForShuffle) {
    let counter = arrayForShuffle.length;
    let temp;
    let index;
    // While there are elements in the array
    while (counter > 0) {
    // Pick a random index
        index = Math.floor(Math.random() * counter);
        counter--;
        // And swap the last element with it
        temp = arrayForShuffle[counter];
        arrayForShuffle[counter] = arrayForShuffle[index];
        arrayForShuffle[index] = temp;
    }
    return arrayForShuffle;
}

export function sendDataToAPI(totalScore) {
    const userData = {
        username: document.querySelector('#firstName').value,
        email: document.querySelector('#email').value,
        score: totalScore,
        // tab: gridSize
    };
    const serialObj = JSON.stringify(userData);
    console.log('userData.score'+userData.score);

    (async () => {
        const rawResponse = await fetch('http://mmg-score.herokuapp.com', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: serialObj,
        });
    })();
}
