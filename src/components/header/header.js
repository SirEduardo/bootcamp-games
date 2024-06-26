import { ticTacToe } from '../../pages/3-en-raya/3-en-raya'
import { ahorcado } from '../../pages/ahorcado/ahorcado'
import { PPT } from '../../pages/piedra-papel-tijera/piedra-papel-tijera'
import './header.css'

export const Header = (divApp) => {
  

    const header = document.createElement("header")
    const btnTicTacToe = document.createElement("button")
    const btnAhorcado = document.createElement("button")
    const btnWhac = document.createElement("button")

    btnTicTacToe.textContent = "3 En Raya"
    btnAhorcado.textContent = "Ahorcado"
    btnWhac.textContent = "Piedra Papel Tijera"

    btnTicTacToe.addEventListener("click", ticTacToe)
    btnAhorcado.addEventListener("click", ahorcado)
    btnWhac.addEventListener("click", PPT)

    header.appendChild(btnTicTacToe)
    header.appendChild(btnAhorcado)
    header.appendChild(btnWhac)
    divApp.appendChild(header)
}