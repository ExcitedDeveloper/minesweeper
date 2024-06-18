import './App.css'
import Game from './components/Game'
import { GameProvider } from './GameContext'

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}

export default App
