import { SHOW_LEADERBOARD } from '../constants/index';

export const takeDataFromAPI = () => (dispatch) => {
    console.log('Мы получили асинхронность');
    const dataBase = [];
    let dataFromAPI;

    function sortByField(arr, field) {
        function byField(a, b) {
            if (a[field] >= b[field]) return 1;
            if (a[field] < b[field]) return -1;
        }
        return arr.sort(byField);
    }

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

            const sorted = sortByField(dataBase, 'score');
            const displayed = sorted.splice(0, 55);
            console.log(`displayed:   ${displayed}`);
            dispatch({ type: SHOW_LEADERBOARD, payload: displayed });
            //document.querySelector('#resultsTable').style.display = 'none';
            //document.querySelector('.leaderBoard').style.display = 'block';
        })
        .catch(new Error('Something gone wrong'));
};
