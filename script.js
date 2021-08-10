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
        disc.classList.add('disc');

        lastWithoutADisc.appendChild(disc);
    }
    if ( !lastWithoutADisc ) {
        colFilldMsg();
    }
}

const checkColorMatch = (cell1Color, cell2Color, cell3Color, cell4Color) => {
    const firstIsntZero = cell1Color !== 0;

    const otherCellColors = [cell2Color, cell3Color, cell4Color];

    const isAllTheSame = otherCellColors.every( cellColor => cellColor === cell1Color );

    return firstIsntZero && isAllTheSame;
}
