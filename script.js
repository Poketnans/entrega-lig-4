const gameContainer = document.getElementById('game-container')

const createTemplate = () => {
    for(let i = 0; i < 7; i++){
        let column = document.createElement('div')
        gameContainer.appendChild(column)

        for(let j = 0; j < 6; j++){
            let line = document.createElement('div')
            line.dataset.columnLine = `${i}-${j}`
            line.classList.add('line')
            column.appendChild(line)
        }
    }
}

createTemplate()

const firstCells = document.querySelectorAll(".line[data-column-line$='-0']");
const columnsArray = [...firstCells].map( cell => cell.parentElement );
