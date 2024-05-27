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

export enum CellType {
  Blank,
  Bomb,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
}

export type BoardType = CellType[][]
