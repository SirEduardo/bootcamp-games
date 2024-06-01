import { Header } from './components/header/header'
import { ticTacToe } from './pages/3-en-raya/3-en-raya'
import { ahorcado } from './pages/ahorcado/ahorcado'
import { whacAMole } from './pages/whac-a-mole/whac-a-mole'
import './style.css'

const divApp = document.querySelector('#app')

Header(divApp)

const divContainer = document.createElement("div")
divContainer.classList.add("container")

divApp.append(divContainer)

ticTacToe()
ahorcado()
whacAMole()