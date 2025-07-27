# Cang-Jie Input Method Touch Typing Practice

This project is a web application designed to help users practice touch typing for the Cangjie (倉頡) input method. It is built with React and TypeScript.

## Core Features

- **Typing Practice:** Displays a Chinese character and prompts the user to type the corresponding Cangjie radicals.
- **Visual Keyboard:** Shows a visual representation of the Cangjie keyboard layout.
- **Input Validation:** Tracks the user's keystrokes and validates them against the correct radical sequence.
- **State Management:** Uses a reducer (`keyDownRadicalReducer.ts`) to manage the application's state based on keyboard input.

## Technology Stack

- **Frontend:** React, TypeScript
- **Styling:** styled-components
- **Build Tool:** esbuild
- **Scripts:** ts-node

## Project Structure

- `src/`: Contains the main React application source code.
  - `App.tsx`: The main application component.
  - `CangJieKeyboard.tsx`: The visual keyboard component.
  - `RadicalQuestion.tsx`: The component that displays the character to be typed.
  - `*.json`: Data files for Cangjie key bindings and character mappings.
- `scripts/`: Contains Node.js scripts for development, building, and cleaning the project.
