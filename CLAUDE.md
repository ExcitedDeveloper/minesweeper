# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server with hot reload
- **Build**: `npm run build` - TypeScript compilation followed by Vite build
- **Lint**: `npm run lint` - ESLint with TypeScript support, zero warnings policy
- **Preview**: `npm run preview` - Preview the built application
- **Test**: `npm run test` - Run Vitest test suite
- **Test UI**: `npm run test:ui` - Run tests with UI interface

## Architecture Overview

This is a modern React TypeScript minesweeper game built with Vite, featuring a modernized architecture with Zustand state management, custom hooks, and comprehensive testing.

### State Management

- **Zustand Store** (`store/gameStore.ts`): Centralized state management with immer integration for immutable updates
- **Custom Hooks**: Clean separation of concerns with specialized hooks:
  - `useGameState`: Game status, face states, and game actions
  - `useBoard`: Board state, cell interactions, and game logic
  - `useTimer`: Timer functionality with automatic cleanup

### Core Architecture

- **App.tsx**: Root component (no providers needed with Zustand)
- **Game.tsx**: Main game container component that renders Header and Board
- **GameEngine** (`engine/GameEngine.ts`): Pure functions for game logic validation and calculations

### Key Components (All Memoized)

- **Header**: Game controls, timer, mine counter, and face button
- **Board**: Optimized minesweeper grid with memoized cell rendering
- **Cell**: Individual cell component with optimized event handlers
- **Counter**: Digital-style number display with efficient digit calculation
- **Dialog**: Modal for game settings and custom configuration

### Performance Optimizations

- **React.memo**: Applied to all components to prevent unnecessary re-renders
- **useCallback**: Optimized event handlers and functions
- **useMemo**: Expensive calculations cached appropriately
- **Immer**: Safe, immutable state updates via Zustand middleware

### Game Engine

- **GameEngine.ts**: Pure utility functions for:
  - Win condition validation
  - Adjacent mine counting
  - Position validation
  - Coordinate calculations

### Board Generation Logic

- **createBoard()** in `util/board.ts`: Generates random mine placement and calculates adjacent mine counts
- Uses enum-based cell types (Blank, One-Eight, Bomb) for type safety
- Reveal classes map cell states to CSS classes for visual representation

### Testing

- **Vitest**: Modern test runner with jsdom environment
- **@testing-library/react**: Component testing utilities
- **Test Coverage**: GameEngine logic fully tested

### Styling Approach

CSS modules with component-specific stylesheets. Uses sprite-based graphics for classic minesweeper appearance.

### Type Definitions

Comprehensive TypeScript types in `types/Game.tsx` including enums for GameType, CellType, FaceClass, and GameStatus. All code uses strict TypeScript with no any types or disabled checks.