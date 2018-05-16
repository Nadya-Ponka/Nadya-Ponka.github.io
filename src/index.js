document.querySelector('.buttonStart').addEventListener('click', function () {
        location.href = 'battlescreen/index.html';

		startMath();
    }, false);	 

	
	function startMath() {
		let firstFactor = getRandomArbitrary(1,9);
		let secondFactor = getRandomArbitrary(1,9);
		console.log(firstFactor);
		console.log(secondFactor);
		

	}
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
/*var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
		
		var mainField = document.querySelector('.field');
        mainField.appendChild(this.canvas);
		
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}



/*(function () {

    let backCard = "back-1.png";
    let level = 5;
    let period;
    let totalScore;
    let gridSize = 0;

    const gridContainer = document.querySelector('.grid');

    document.querySelector('.buttonStart').addEventListener('click', function () {
        document.querySelector('.rules').style.animation = 'animate 1s linear forwards';

        setTimeout(function () {
            document.querySelector('.rules').style.display = 'none';
            document.querySelector('.introduction').style.display = 'block';
        }, 1000);

        selectBackCard();
        selectDifficalty();
    }, false);

    // button "Start game"
    document.querySelector('.startGame').addEventListener('click', function () {
        document.querySelector('.greeting').style.display = 'none';
        document.querySelector('.playingField').style.display = 'block';
        document.querySelector('.wrapper').style.display = 'block';
        startTimer();

        var mainField = document.querySelector('.wrapper');
        var mainNew = document.createElement('div');
        mainNew.className = 'flex-container cardsField';

        // cards array
        var cards = [{
                img: "Images/cards/card-0.jpg",
                id: 0,
            },
            {
                img: "Images/cards/card-1.jpg",
                id: 1,
            },
            {
                img: "Images/cards/card-2.jpg",
                id: 2
            },
            {
                img: "Images/cards/card-3.jpg",
                id: 3
            },
            {
                img: "Images/cards/card-4.jpg",
                id: 4
            },
            {
                img: "Images/cards/card-5.jpg",
                id: 5,
            },
            {
                img: "Images/cards/card-6.jpg",
                id: 6
            },
            {
                name: "cat",
                img: "Images/cards/card-7.jpg",
                id: 7
            },
            {
                img: "Images/cards/card-8.jpg",
                id: 8
            },
            {
                img: "Images/cards/card-9.jpg",
                id: 9,
            },
            {
                img: "Images/cards/card-10.jpg",
                id: 10
            },
            {
                img: "Images/cards/card-11.jpg",
                id: 11
            },

        ];

        var openCard;
        var Memory = {

            init: function (cards) {
                var temp = cards.slice(0, level);
                this.cardsArray = temp;
                this.cardsArray = this.cardsArray.concat(temp);
                this.shuffle(this.cardsArray);
                this.buildHTML();
                this.binding();
            },

            binding: function () {
                mainNew.addEventListener("click", this.cardClicked, false);
            },

            cardClicked: function () {
                var currentCard = event.target;

                if (currentCard != mainNew && currentCard.className != "flex-element") {
                    if (currentCard.parentNode.parentNode.className != 'inside rotate matched') {

                        if (openCard == undefined) {
                            currentCard.parentNode.parentNode.className += " rotate";
                            openCard = currentCard;
                            return;
                        } else {
                            currentCard.parentNode.parentNode.className += " rotate";

                            if (openCard.parentNode.parentNode.className != 'inside rotate matched' && currentCard.parentNode.parentNode.className != 'inside rotate matched' &&
                                openCard.parentNode.parentNode.parentNode.id == currentCard.parentNode.parentNode.parentNode.id) {

                                openCard.parentNode.parentNode.className += " matched";
                                currentCard.parentNode.parentNode.className += " matched";

                                openCard = undefined;
                                level -= 1;

                                if (level == 0) {
                                    var my_timer = document.getElementById("score");
                                    var time = my_timer.innerHTML;

                                    document.querySelector('#score').innerHTML = period;
                                    document.querySelector('.timer').style.visibility = 'hidden';

                                    setTimeout(function () {
                                        document.querySelector('.wrapper').style.display = 'none';
                                        document.querySelector('.win').style.display = 'grid';
                                    }, 4000)


                                    var arrayOfTime = period.split(':');

                                    totalScore = Number(arrayOfTime[2]) + Number(arrayOfTime[1]) * 60 + Number(arrayOfTime[0]) * 3600;
                                    saveInLocalStorage().saveData();
                                    leaderBoard();

                                    document.querySelector('.startNewGame').addEventListener('click', function () {
                                        document.querySelector('.win').style.display = 'none';
                                        window.location.reload();

                                    }, false);

                                }
                                return;
                            } else {
                                setTimeout(function () {
                                    openCard.parentNode.parentNode.className = "inside";
                                    currentCard.parentNode.parentNode.className = "inside";
                                    openCard = undefined;
                                }, 900);
                            };
                        };

                    } else return;

                }

            },

            // Fisher--Yates Algorithm перемешивания массива рандомом
            shuffle: function (array) {
                var counter = array.length,
                    temp, index;
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);
                    // Decrease counter by 1
                    counter--;
                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            },

            buildHTML: function () {
                if (level == 5) {
                    mainNew.style.gridTemplateColumns = 'repeat(5, 20%)';
                    document.querySelector('.wrapper').style.width = '900px';
                    gridSize = 0;
                }
                if (level == 9) {
                    mainNew.style.gridTemplateColumns = 'repeat(6, 16.6%)';
                    document.querySelector('.wrapper').style.width = '1100px';
                    gridSize = 1;
                }
                if (level == 12) {
                    mainNew.style.gridTemplateColumns = 'repeat(8, 12.5%)';
                    document.querySelector('.wrapper').style.width = '1300px';
                    gridSize = 2;
                }

                var frag = '';
                this.cardsArray.forEach(function (k, v) {
                    frag += '<div class="flex-element" id="' + k.id + '"><div class="inside"><div class="front"><img src="' + k.img + '" alt="" /></div>' +
                        '<div class="back"><img src="' + 'Images/' + backCard.toString() + '" alt="" /></div></div></div>';
                });
                mainNew.innerHTML = frag;
                return mainField.appendChild(mainNew);
            }
        };

        Memory.init(cards);

        function startTimer() {
            var my_timer = document.getElementById("my_timer");
            var time = my_timer.innerHTML;
            var arr = time.split(":");
            var h = arr[0];
            var m = arr[1];
            var s = arr[2];
            if (s == 59) {
                if (m == 59) {
                    h++;
                    m = 0;
                    if (h < 10) h = "0" + h;
                }
                m++;
                if (m < 10) m = "0" + m;
                s = 0;
            } else s++;
            if (s < 10) s = "0" + s;
            document.getElementById("my_timer").innerHTML = h + ":" + m + ":" + s;
            period = h + ":" + m + ":" + s;
            setTimeout(startTimer, 1000);
        }

    }, false);


    // make a choice

    function selectBackCard() {
        var itemsInput = document.querySelectorAll('#back-card img');
        console.log(itemsInput);

        document.querySelector('#back-card').addEventListener('click', function (elem) {
            itemsInput.forEach(x => x.classList.remove('active'));
            elem.target.classList.add('active');

            if (elem.target.id == "black") {
                backCard = "back-1.png";
            } else if (event.target.id == "blue") {
                backCard = "back-2.png";
            } else {
                backCard = "back-3.png";
            }
            return backCard;
        }, false);
    }

    function selectDifficalty() {
        var difficulty = document.getElementById('difficulty');

        difficulty.onclick = function (event) {
            if (event.target.id == "easy") {
                level = 5;
                return level;
            } else if (event.target.id == "medium") {
                level = 9;
                return level;
            } else {
                level = 12;
                return level;
            }
        }
    }

    // save players in LocalStorage

    function saveInLocalStorage() {

        return {
            saveData: function () {

                const date = new Date();
                const userData = {
                    name: document.querySelector('#firstName').value,
                    lastName: document.querySelector('#lastName').value,
                    email: document.querySelector('#email').value,
                    date: date,
                    score: totalScore,
                    tab: gridSize
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
    }

    //leaderBoard

    function leaderBoard() {

        const valueSelectSize = ['5*2', '6*3', '8*3'];;
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

    function clickTab(e) {
        const listTabs = [...e.target.classList];
        listTabs.shift();

        let localStorageDB = saveInLocalStorage().getData('tab', parseInt(listTabs, 10));

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
            const score = secondsInTimeFormat(displayed[i].score);

            const td1 = createNode('td', {
                className: 'table-name'
            }, `${name}`);
            const td2 = createNode('td', {}, `${date}`);
            const td3 = createNode('td', {}, `${score}`);

            const tr = createNode('tr', {}, td1, td2, td3);
            resultsTableContainer.firstElementChild.appendChild(tr);
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

    function filterByField(arr, field, value) {
        return arr.filter(elem => {
            if (elem[field] === value) {
                return elem;
            }
        });
    }

    function sortByField(arr, field) {
        function byField(a, b) {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
        }
        return arr.sort(byField);
    }

    function displayResult(arr, number = arr.length) {
        return arr.slice(0, number);
    }

	function secondsInTimeFormat(s){
		function num(val){
			val = Math.floor(val);
			return val < 10 ? '0' + val : val;
		}

			let hours = s / 3600  % 24, 
				minutes = s / 60 % 60, 
				seconds = s % 60;

			return num(hours) + ":" + num(minutes) + ":" + num(seconds);
	}

})();*/

//console.log('Hello Webpack!');

