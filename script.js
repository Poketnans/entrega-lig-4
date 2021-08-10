const gameContainer = document.getElementById('game-container')


//Array bidimensional para fins de DEBUG.
const dataArray = [
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
    
    if(discColor === 'black'){
        newDisc.style.background = 'black'
    } else {
        newDisc.style.background = 'red'
    }
    newDisc.style.borderRadius = '50%'
    newDisc.style.width = '50px';
    newDisc.style.height = '50px';

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
        modifyArray(disc)
    }
    if ( !lastWithoutADisc ) {
        colFilldMsg();
    }
}

//EventListener para fins de DEBUG
columnsArray.forEach(column => column.addEventListener('click', colClickhandler));

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