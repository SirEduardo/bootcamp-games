import './board.css'

export const board = () => {
    const divContainer = document.querySelector(".container")
    const board  = document.createElement("div")
    board.classList.add("board")

    for (let i = 0; i < 9; i++ ){
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.setAttribute("data-index", i)
        board.appendChild(cell)
    }

    divContainer.append(board)

}