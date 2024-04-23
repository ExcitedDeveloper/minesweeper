// eslint-disable-next-line react-refresh/only-export-components
export enum GameType {
  Beginner,
  Intermediate,
  Expert,
  Custom,
}

export type BoardData = {
  gameType: GameType
  height: number
  width: number
  mines: number
  marks: boolean
}
