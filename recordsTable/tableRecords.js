leaderBoard();
function clickTab(e) {
        const listTabs = [...e.target.classList];
        listTabs.shift();

        if (listTabs == '0') {
            jsonData = data.session1;
        } else {
            jsonData = data.session2;
        }

        const resultsTableContainer = document.querySelector('.leaderBoard-results-table');

        let resultsTable = [...resultsTableContainer.firstElementChild.children];
        let round = [];
        for (let i = 0; i < jsonData.puzzles.length; i++) {
            round[i] = createNode('th', {}, `${jsonData.puzzles[i].name}`);
        }
        if (listTabs == '0') {
            round.push(createNode('th', {}, `Total time`));
            round.push(createNode('th', {}, `Comparison`));
        }

        const headerTd1 = createNode('th', {}, 'Player\'s name');
        const headerTr = createNode('tr', {}, headerTd1, ...round);
        resultsTableContainer.firstElementChild.appendChild(headerTr);

        for (let i = 1; i < resultsTable.length; i++) {
            resultsTable[i].remove();
        }

        for (let i = 0; i < mydata.length; i++) {
            const name = mydata[i].displayName;
            const uidNew = mydata[i].uid;

            let round = [];
            let sum = 0;

            for (let j = 0; j < jsonData.rounds.length; j++) {
                let temp = jsonData.rounds[j];

                if (!temp["solutions"][uidNew] || temp["solutions"][uidNew]["correct"] == "Incorrect") {
                    let elem = createNode('td', {}, `150`);
                    elem.title = `No solution`;
                    sum += 150;
                    round.push(elem);
                } else {
                    let elem = createNode('td', {}, `${temp["solutions"][uidNew]["time"]["$numberLong"]}`);
                    elem.title = `${temp["solutions"][uidNew]["code"]}`;
                    sum = sum + Number(`${temp["solutions"][uidNew]["time"]["$numberLong"]}`);
                    round.push(elem);
                }
            }
            if (listTabs == '0') {
                round.push(createNode('td', {}, `${sum}`));
                let compare = createNode('input', {}, `Comparison`);
                compare.type = 'checkbox';
                compare.className = 'forCompare';
                round.push(compare);
            }
            const td1 = createNode('td', {
                className: 'table-name'
            }, `${name}`);

            const tr = createNode('tr', {}, td1, ...round);
            tr.id = name;
            resultsTableContainer.firstElementChild.appendChild(tr);
        }

        let boxHover = document.querySelectorAll('td:not(.table-name)');

        [].forEach.call(boxHover, function (el) {
            el.addEventListener("mouseover", function () {
                let newTarget = event.target;
                newTarget.style.backgroundColor = "green";
                newTarget.style.color = "#fff";
            })
        }, false);

        [].forEach.call(boxHover, function (el) {
            el.addEventListener("mouseout", function () {
                let newTarget = event.target;
                newTarget.style.backgroundColor = "transparent";
                newTarget.style.color = "#000";
            })
        }, false);

        if (listTabs == '1') {} else {
            drawGraph();
        }

    }

    function createNode(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => element[key] = props[key]);
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
        return element;
    }

    function leaderBoard() {

        const valueSelectSize = ['Full Version', 'Demo Version'];;
        let listGridSize = document.querySelector('.leaderBoard-tabs');
        if (!listGridSize.firstElementChild) {
            for (let i = 0; i < valueSelectSize.length; i++) {
                const tab = createNode('a', {
                    className: `tab ${i}`
                }, `${valueSelectSize[i]}`);
                tab.addEventListener('click', clickTab);
                listGridSize.appendChild(tab);
            }
        }
    }