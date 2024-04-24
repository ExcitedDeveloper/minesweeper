// eslint-disable-next-line react-refresh/only-export-components
export enum GameType {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Expert = 'expert',
  Custom = 'custom',
}

export type BoardData = {
  gameType: GameType
  height: number
  width: number
  mines: number
  marks: boolean
}
