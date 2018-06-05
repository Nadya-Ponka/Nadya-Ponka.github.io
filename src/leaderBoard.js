import showtask from './task-screen';
import {
    getRandomArbitrary,
    drawLife,
    createNode
} from './utils';
import {
    level,
    Game
} from './game';

export function saveInLocalStorage() {

    return {
        saveData: function () {

            const date = new Date();
            const userData = {
                name: document.querySelector('#firstName').value,
                lastName: document.querySelector('#lastName').value,
                email: document.querySelector('#email').value,
                date: date,
                score: (level / .25 - 4),
                tab: 0
            };

            let serialObj = JSON.stringify(userData);
            localStorage.setItem(date.toLocaleString(), serialObj);
        },

        getData: function (field, value) {
            const keysLocalStorage = Object.keys(localStorage);
            let dataBase = [];

            keysLocalStorage.forEach(key => {
                let returnedObj;

                try {
                    returnedObj = JSON.parse(localStorage.getItem(`${key}`), (key, value) => {
                        if (key === 'date') return new Date(value);
                        return value;
                    });

                    if (!returnedObj.name && !returnedObj.date && !returnedObj.score && !returnedObj.tab)
                        return;
                } catch (err) {
                    return;
                }

                dataBase.push(returnedObj);
            });
            return filterByField(dataBase, field, value);
        }
    };
};

//leaderBoard
export function leaderBoard() {

    let localStorageDB = saveInLocalStorage().getData('tab', parseInt('0', 10));

    let sorted = sortByField(localStorageDB, 'score');

    let displayed = displayResult(sorted);

    const resultsTableContainer = document.querySelector('.leaderBoard-results-table');
    let resultsTable = [...resultsTableContainer.firstElementChild.children];

    for (let i = 1; i < resultsTable.length; i++) {
        resultsTable[i].remove();
    }

    if (displayed.length === 0) {
        const result = createNode('p', {}, 'Будь первым!');
        resultsTableContainer.firstElementChild.appendChild(result);
    }

    for (let i = 0; i < displayed.length && i < 10; i++) {
        const name = displayed[i].name;
        const date = (displayed[i].date).toLocaleDateString();
        const score = displayed[i].score;

        const td1 = createNode('td', {
            className: 'table-name'
        }, `${name}`);
        const td2 = createNode('td', {}, `${date}`);
        const td3 = createNode('td', {}, `${score}`);

        const tr = createNode('tr', {}, td1, td2, td3);
        resultsTableContainer.firstElementChild.appendChild(tr);
    }


};

function filterByField(arr, field, value) {
    return arr.filter(elem => {
        if (elem[field] === value) {
            return elem;
        }
    });
};

function sortByField(arr, field) {
    function sorted(a, b) {
        return b[field] - a[field];
    }

    return arr.sort(sorted);
};

function displayResult(arr, number = arr.length) {
    return arr.slice(0, number);
};
