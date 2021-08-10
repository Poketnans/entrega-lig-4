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
    }
}

<<<<<<< HEAD
let positionArray  =  [
                        [0,0,0,0,0,0,0], 
                        [0,0,0,0,0,0,0], 
                        [0,0,0,0,0,0,0], 
                        [0,0,0,0,0,0,0], 
                        [0,0,0,0,0,0,0], 
                        [0,0,0,0,0,0,0]
                      ]
 
let verticalWinningChecker = (aaaa) => {
    for(let i = 0; i <= 3; i++){
        for(let j = 0; j < 7; j++){
            if(funcaoSeraCriadaa()){
                
            }
        }
    }
} 

// indice do array 0 b r outerHeight
// se tiver 4 b ou r
=======
const checkColorMatch = (disc1Color, disc2Color, disc3Color, disc4Color) => {
    const firstIsntZero = disc1Color !== 0;

    const otherDiscColors = [disc2Color, disc3Color, disc4Color];

    const isAllTheSame = otherDiscColors.every( discColor => discColor === disc1Color );

    return firstIsntZero && isAllTheSame;
}

columnsArray.forEach((item) => item.addEventListener("click", colClickhandler))
>>>>>>> development
