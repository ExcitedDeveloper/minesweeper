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
  Blank = 'K',
  Bomb = 'B',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
}

export type CellState = {
  type: CellType
  isRevealed: boolean
  revealClass: string
}

export type BoardType = CellState[][]

export enum FaceClass {
  FaceDead = 'facedead',
  FaceOoh = 'faceooh',
  FacePressed = 'facepressed',
  FaceSmile = 'facesmile',
  FaceWin = 'facewin',
}
