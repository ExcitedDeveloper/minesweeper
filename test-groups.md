# Test Groups for Memory Management

Due to memory constraints, you can run tests in smaller groups:

## Group 1: Core Logic
```bash
npm run test -- src/engine/GameEngine.test.ts src/util/board.test.ts src/constants.test.ts --run
```

## Group 2: State Management
```bash
npm run test -- src/store/gameStore.test.ts src/types/Game.test.tsx --run
```

## Group 3: Hooks
```bash
npm run test -- src/hooks/useGameState.test.ts src/hooks/useTimer.test.ts --run
```

## Group 4: Complex Hooks
```bash
npm run test -- src/hooks/useBoard.test.ts --run
```

## Group 5: Simple Components
```bash
npm run test -- src/App.test.tsx src/components/Game.test.tsx src/components/Counter.test.tsx --run
```

## Group 6: Complex Components
```bash
npm run test -- src/components/Cell.test.tsx src/components/Header.test.tsx --run
```

## Group 7: Board Components
```bash
npm run test -- src/components/Board.test.tsx src/components/Mines.test.tsx src/components/Time.test.tsx --run
```

## Coverage Analysis
For coverage, run individual groups and combine results manually, or increase Node.js memory:
```bash
node --max-old-space-size=4096 ./node_modules/.bin/vitest --run --coverage
```