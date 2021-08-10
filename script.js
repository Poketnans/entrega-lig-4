const gameContainer = document.getElementById('game-container')

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
    
    if(discColor === 'black'){
        newDisc.style.background = 'black'
    } else {
        newDisc.style.background = 'red'
    }
    newDisc.style.borderRadius = '50%'
    newDisc.style.width = '50px';
    newDisc.style.height = '50px';

    newDisc.dataset.color = discColor;
    newDisc.classList.add('disc');

    return newDisc;
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
        modifyArray(disc)
        checkForWinner(dataArray);
    }
    if ( !lastWithoutADisc ) {
        colFilldMsg();
    }
}

const modifyArray = (currentAppend) => {
    const positionData = currentAppend.dataset.discAddress; 
    const indexOfHifen = positionData.indexOf('-');
    let positionLine = Number(positionData.slice(0, indexOfHifen))
    console.log(positionLine);
    let positionColumn = Number(positionData.slice(indexOfHifen + 1))
    console.log(positionColumn)
    if(currentAppend.dataset.color === 'black'){
        dataArray[positionLine][positionColumn] = 'b'
    } else {
        dataArray[positionLine][positionColumn] = 'r'
    }
};



const checkColorMatch = (disc1Color, disc2Color, disc3Color, disc4Color) => {
    return ((disc1Color !== 0) && (disc1Color === disc2Color) && (disc1Color === disc2Color) && (disc1Color === disc3Color) && (disc1Color === disc4Color))
}

columnsArray.forEach((item) => item.addEventListener("click", colClickhandler));

const checkForWinner = (param) => {
    // DIAGONAL PARA ESQUERDA
    for(let line = 0; line < 3; line++){
        for(let column = 0; column < 4; column++){
            if(checkColorMatch(param[line][column], param[line + 1][column + 1], param[line + 2][column + 2], param[line + 3][column + 3])){
                console.log('entrou')
            }
        }
    }
    // DIAGONAL PARA DIREITA
    for(let line = 0; line < 3; line++){
        for(column = 3; column < 7; column++){
            if(checkColorMatch(param[line][column], param[line + 1][column - 1], param[line + 2][column - 2], param[line + 3][column - 3])){
                console.log('entrou2')
            }
        }
    }
    // Vertical
    for(let line = 0; line < 3; line++){
        for(let column = 0; column < 7; column++){
            if(checkColorMatch(param[line][column], param[line + 1][column], param[line + 2][column], param[line + 3][column])){
                console.log('entrou3')
            }
        }
    }
    //Horizontal
    for(let line = 0; line < 6; line++){
        for(let column = 0; column < 5; column++){
            if(checkColorMatch(param[line][column], param[line][column + 1], param[line][column + 2], param[line][column + 3])){
                console.log('entrou4')
            }
        }
    }
}