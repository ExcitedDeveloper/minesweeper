import Board from "./Board";
import Header from "./Header";
import styles from "./Game.module.css";

const Game = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Board />
    </div>
  );
};

export default Game;
