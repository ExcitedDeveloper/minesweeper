import './App.css'
import Game from './components/Game'
import { GameProvider } from './GameContext'

function App() {
  console.log(`App 1`)
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}

export default App
