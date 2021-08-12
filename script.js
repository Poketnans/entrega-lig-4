const game = document.getElementById("game-flex")
const gameContainer = document.getElementById('game-container')
let blackScore = 0;
let redScore = 0;
let victoryDiv;
let moveCount = 0;

let moveCount = 0
let victoryDiv;

let dataArray  = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0]
]


const createTemplate = () => {
    for(let i = 0; i < 7; i++){
        let column = document.createElement('div')
        gameContainer.appendChild(column)
        column.classList.add('column')

        for(let j = 5; j >= 0; j--){
            let line = document.createElement('div')
            line.dataset.columnLine = `${j}-${i}`
            line.classList.add('line')
            column.appendChild(line)
        }
    }
}

createTemplate()

const firstCells = document.querySelectorAll(".line[data-column-line|='0']");
const columnsArray = [...firstCells].map( cell => cell.parentElement );

let lastColor = 'red';

const getColor = () => {
    const switchColorObj = {
        red: 'black',
        black: 'red'
    };

    const color = lastColor;

    lastColor = switchColorObj[lastColor];

    return color;
}

const genDisc = () => {
    const newDisc = document.createElement('div');

    const discColor = getColor();

    newDisc.dataset.color = discColor;
    newDisc.classList.add('disc');

    return newDisc;
}

const colFilledMsg = (columnNode) => {
    columnNode.classList.add('filledColumnError');
}

const colClickhandler = (event) => {
    const column = event.currentTarget;

    const cellNodes = column.childNodes;

    const lastWithoutADisc = [...cellNodes].reverse().find( (cell) => {
        return cell.childElementCount === 0;
    });

    if ( lastWithoutADisc ) {
        const disc = genDisc();
        const cellDataSet = lastWithoutADisc.dataset.columnLine;

        disc.dataset.discAddress = cellDataSet;

        lastWithoutADisc.appendChild(disc);
        moveCount++
        modifyArray(disc)
        checkVertical(dataArray);
        checkHorizontal(dataArray);
        checkDownLeft(dataArray);
        checkDownRight(dataArray);
        checkDraw(moveCount)
        switchTurns();
    }
    if ( !lastWithoutADisc ) {
        colFilledMsg(column);
    }
}

const modifyArray = (currentAppend) => {
    const positionData = currentAppend.dataset.discAddress; 
    const indexOfHifen = positionData.indexOf('-');
    let positionLine = Number(positionData.slice(0, indexOfHifen))
    let positionColumn = Number(positionData.slice(indexOfHifen + 1))
    if(currentAppend.dataset.color === 'black'){
        dataArray[positionLine][positionColumn] = 'b'
    } else {
        dataArray[positionLine][positionColumn] = 'r'
    }
};



columnsArray.forEach((item) => item.addEventListener("click", colClickhandler));

const show4inARow = (line1, line2, line3, line4, column1, column2, column3, column4) => {
    let first = document.querySelector(`div[data-column-line='${line1}-${column1}']`);
    let second = document.querySelector(`div[data-column-line='${line2}-${column2}']`);
    let third = document.querySelector(`div[data-column-line='${line3}-${column3}']`);
    let fourth = document.querySelector(`div[data-column-line='${line4}-${column4}']`);
    first.firstChild.style.background = 'yellow'
    second.firstChild.style.background = 'yellow'
    third.firstChild.style.background = 'yellow'
    fourth.firstChild.style.background = 'yellow'
}

const checkColorMatch = (disc1Color, disc2Color, disc3Color, disc4Color) => {
    return ((disc1Color !== 0) && (disc1Color === disc2Color) && (disc1Color === disc2Color) && (disc1Color === disc3Color) && (disc1Color === disc4Color))
}

const checkDownRight = (dataBase) => {
    for(let line = 0; line < 3; line++){
        for(let column = 0; column < 4; column++){
            if(checkColorMatch(dataBase[line][column], dataBase[line + 1][column + 1], dataBase[line + 2][column + 2], dataBase[line + 3][column + 3])){
                show4inARow(line, line + 1, line + 2, line + 3,column,column + 1, column + 2, column + 3)
                victoryScreen()
            }
        }
    }
}

const checkDownLeft = (dataBase) => {
    for(let line = 0; line < 3; line++){
        for(column = 3; column < 7; column++){
            if(checkColorMatch(dataBase[line][column], dataBase[line + 1][column - 1], dataBase[line + 2][column - 2], dataBase[line + 3][column - 3])){
                show4inARow(line, line + 1, line + 2, line + 3,column,column - 1, column - 2, column - 3)
                victoryScreen()
            }
        }
    }
}

const checkVertical = (dataBase) => {
    for(let line = 0; line < 3; line++){
        for(let column = 0; column < 7; column++){
            if(checkColorMatch(dataBase[line][column], dataBase[line + 1][column], dataBase[line + 2][column], dataBase[line + 3][column])){
                show4inARow(line, line + 1, line + 2, line + 3,column,column, column, column)
                victoryScreen()
            }
        }
    }
}

const checkHorizontal = (dataBase) => {
    for(let line = 0; line < 6; line++){
        for(let column = 0; column < 5; column++){
            if(checkColorMatch(dataBase[line][column], dataBase[line][column + 1], dataBase[line][column + 2], dataBase[line][column + 3])){
                show4inARow(line, line, line, line,column,column + 1, column + 2, column + 3)
                victoryScreen()
            }
        }
    }
}

const checkDraw = (database) => {
    if(database === 42){
        return victoryScreen()
    }
}

const counter = (appendBlack, appendRed, appendDraw) => {
    if(lastColor === 'red' && moveCount !== 42){
        blackScore++
        appendBlack.innerText = `${redScore}`;
        appendRed.innerText = `${blackScore}`
    } else if(lastColor === 'black' && moveCount !== 42) {
        redScore++
        appendBlack.innerText = `${redScore}`;
        appendRed.innerText = `${blackScore}`
    } else{
        appendDraw.innerHTML = '<h1>THATS A DRAW</h1>'
    }
}

const clearBoard = () => {
    const parents = document.querySelectorAll('[data-column-line]')
    for(let i = 0; i < parents.length; i++){
        if(parents[i].hasChildNodes()){
            let discAddress = parents[i].firstChild
            parents[i].removeChild(discAddress)
        }
    }
    if(victoryDiv.children[0] !== 'hidden'){
        victoryDiv.classList.add('hidden')
    }
    columnsArray.forEach((item) => item.addEventListener("click", colClickhandler));
    dataArray = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0],
    ]
    moveCount = 0;
}

const resetButton = (appendDiv) => {
    const resetButton = document.createElement('button');
    resetButton.setAttribute('id', 'playAgain');
    resetButton.innerText = 'Play Again?'
    appendDiv.appendChild(resetButton)
    resetButton.addEventListener('click', clearBoard)
}

const addPlayers = (appendDiv) => {
    const player1 = document.createElement("div")
    const player2 = document.createElement("div")
    player1.classList.add('player1')
    player2.classList.add('player2')
    appendDiv.appendChild(player1)
    appendDiv.appendChild(player2)
}

const playersDiv = (appendDiv) => {
    const playersDiv = document.createElement('div');
    playersDiv.classList.add('playersDiv')
    addPlayers(playersDiv)
    appendDiv.appendChild(playersDiv)
}

const countersContainer = (appendDiv) => {
    const countersContainer = document.createElement('div');
    countersContainer.setAttribute('id', 'counterContainer');
    counterDiv(countersContainer);
    appendDiv.appendChild(countersContainer);
}

const counterDiv = (appendDiv) => {
    const counterP1 = document.createElement('div');
    const counterP2 = document.createElement('div');
    const DrawDiv = document.createElement('div');
    DrawDiv.classList.add('drawDiv');
    counterP1.classList.add('scores')
    counterP2.classList.add('scores')
    counter(counterP1, counterP2, DrawDiv)
    appendDiv.appendChild(counterP1)
    appendDiv.appendChild(counterP2)
    if(moveCount === 42){
        if(appendDiv.hasChildNodes){
            appendDiv.appendChild(DrawDiv);
            appendDiv.removeChild(counterP1);
            appendDiv.removeChild(counterP2);
        }
        appendDiv.appendChild(DrawDiv);
    }
}

const switchTurns = () => {
    let arrowDiv = document.getElementById('arrowDiv');
    if(lastColor === 'red'){
        arrowDiv.classList.remove('arrowRight');
        arrowDiv.classList.add('arrowLeft');
    } else {
        arrowDiv.classList.remove('arrowLeft');
        arrowDiv.classList.add('arrowRight');
    }
}

const victoryScreen = () => {
    victoryDiv = document.createElement("div");
    victoryDiv.classList.add("victoryScreen");
    countersContainer(victoryDiv);
const victoryScreen = () => {
    victoryDiv = document.createElement("div");
    victoryDiv.classList.add("victoryScreen");
    countersContainer(victoryDiv);
    playersDiv(victoryDiv);
    resetButton(victoryDiv);
    game.appendChild(victoryDiv);
    victoryDiv.classList.remove("hidden")
    columnsArray.forEach((item) => item.removeEventListener("click", colClickhandler));
}
}
