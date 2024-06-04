import { Header } from './components/header/header'
import { ticTacToe } from './pages/3-en-raya/3-en-raya'
import { ahorcado } from './pages/ahorcado/ahorcado'
import { PPT } from './pages/piedra-papel-tijera/piedra-papel-tijera'
import './style.css'

const divApp = document.querySelector('#app')

const divContainer = document.createElement("div")
divContainer.classList.add("container")

Header(divApp)

divApp.append(divContainer)


ticTacToe()
ahorcado()
PPT()

divContainer.innerHTML = ""