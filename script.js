const gameContainer = document.getElementById('game-container')

const createTemplate = () => {
    for(let i = 0; i < 7; i++){
        let column = document.createElement('div')
        gameContainer.appendChild(column)

        for(let j = 0; j < 6; j++){
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
    }
    if ( !lastWithoutADisc ) {
        colFilledMsg(column);
        return;
    }

    checkVictory(getHorizontalCells(lastWithoutADisc));
    checkVictory(getVerticalCells(lastWithoutADisc));
    checkVictory(getDiagonalCells(lastWithoutADisc, 'up'));
    checkVictory(getDiagonalCells(lastWithoutADisc, 'down'));
}

const checkColorMatch = (disc1Color, disc2Color, disc3Color, disc4Color) => {
    const firstIsntZero = disc1Color !== 0;

    const otherDiscColors = [disc2Color, disc3Color, disc4Color];

    const isAllTheSame = otherDiscColors.every( discColor => discColor === disc1Color );

    return firstIsntZero && isAllTheSame;
}

columnsArray.forEach((item) => item.addEventListener("click", colClickhandler))

const getLineArray = () => {
    const linesArray = [];
    
    for ( let line = 0; line < 6; line++) {
        const selector = `.line[data-column-line ^= "${line}-"]`;
        const lineNode = document.querySelectorAll(selector);
        linesArray.push(lineNode);
    }

    return linesArray;
}

const getCellColor  = (cell) => {
    let cellDiscColor = 0;
    
    const cellHasDisc = cell.childElementCount === 1;
    if( cellHasDisc ) {
        const cellDisc = cell.firstChild;
        cellDiscColor = cellDisc.dataset.color;
    }

    return cellDiscColor;
}

const getHorizontalCells = (cell) => {    
    const cellAddress = cell.dataset.columnLine;
    const lineNumber = cellAddress.substring(0, 1);

    const selector = `.line[data-column-line ^= "${lineNumber}"]`;
    const cellNodes = document.querySelectorAll(selector);

    return cellNodes;
}

const getVerticalCells = (cell) => {    
    const cellAddress = cell.dataset.columnLine;
    const lineNumber = Number(cellAddress.substring(1, 0));
    const colNumber = Number(cellAddress.substring(2));

    const cellNodes = [];

    if ( lineNumber <= 2 ) {
        for ( let line = lineNumber; line <= lineNumber + 3; line++ ) {
            const selector = `.line[data-column-line = "${line}-${colNumber}"]`;
            const cellNode = document.querySelector(selector);
            cellNodes.push(cellNode);
        }
    }

    return cellNodes;
}

const getUpDiagonalCells = (colNumber, lineNumber) => {

    const cellNodes = [];

    if ( colNumber >= 3 && lineNumber <= 2 ) {
        for ( let col = colNumber; col >= colNumber - 3; col-- ) {
            const selector = `.line[data-column-line = "${lineNumber}-${col}"]`;
            const cellNode = document.querySelector(selector);
            cellNodes.push(cellNode);
            lineNumber++;
        }
    }

    return cellNodes;
}

const getDownDiagonalCells = (colNumber, lineNumber) => {

    const cellNodes = [];

    if ( colNumber <= 3 && lineNumber <= 2 ) {
        for ( let col = colNumber; col <= colNumber + 3; col++ ) {
            const selector = `.line[data-column-line = "${lineNumber}-${col}"]`;
            const cellNode = document.querySelector(selector);
            cellNodes.push(cellNode);
            lineNumber++;
        }
    }

    return cellNodes;
}

const getDiagonalCells = (cell, direction) => {    
    const cellAddress = cell.dataset.columnLine;
    const lineNumber = Number(cellAddress.substring(0, 1));
    const colNumber = Number(cellAddress.substring(2));

    if ( direction === 'up') {
        return getUpDiagonalCells(colNumber, lineNumber);
    }
    if ( direction === 'down' ) {
        return getDownDiagonalCells(colNumber, lineNumber);
    }
}

const checkHorizontalVictory = (colorsArray) => {
    let isAVictory = false;

    colorsArray.some( (color, index, arr) => {

        if ( index <= 3 ) {

            const disc1Color = color;
            const disc2Color = arr[index + 1];
            const disc3Color = arr[index + 2];
            const disc4Color = arr[index + 3];

            const sequenseDiscColor = [
                disc1Color,
                disc2Color,
                disc3Color,
                disc4Color
            ];

            isAVictory = checkColorMatch(...sequenseDiscColor); 
            return isAVictory;
        }
    })

    if ( isAVictory ) {
        console.log('Venceu!!');
    }

    return isAVictory;
}

const checkVictory = (cellNodes) => {
    let isAVictory = false;

    if (cellNodes.length > 0 ) {

        const colorsArray = [...cellNodes].map( cell => {
            const cellHasADisc = cell.childElementCount === 1;

            if ( cellHasADisc ) {
                const disc = cell.firstChild;
                return disc.dataset.color;
            }

            return 0;
        }, [] );

        if( colorsArray.length > 4 ) {
            return checkHorizontalVictory(colorsArray);
        }

        isAVictory = checkColorMatch(...colorsArray);
    }

    if ( isAVictory ) {
        console.log('Venceu!!');
    }

    return isAVictory;
}