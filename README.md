<p align="center">
  <img src="/public/logo.png" alt/>
</p>

**By Royal Decree** is a grid-based coding puzzle game designed as a private learning project. The goal is to let
players
define logic for multiple medieval-themed entities—such as minions and knights—to accomplish tasks on a 2D grid. The
game is built from scratch, focusing on hand-crafted game logic, a custom renderer, and a "game engine."

This project is a personal exploration of frontend development, game design, devops, and systems engineering,
prioritizing
process over production. While packages are used for peripheral functionalities like linting, metrics, and build
tools, the core gameplay and rendering are entirely custom-built.

Feel free to explore, modify, and use any code you find here for your own learning and
projects.

The current PROD build is deployed as https://by-royal-decree.vercel.app/.

---

## Why This Project?

**The whole project is heavily WIP and might change at any point. This is very much experimental.**

This project exists entirely as a learning experience. Therefor It avoids
pre-built engines to focus on:

- Writing a custom renderer
- Writing a custom game loop
- Managing unpredictable user input and game-state updates.

Vue is included to simplify app-wide state management (Pinia) and routing, which will become more relevant if the
project grows into a proper website with additional features.

---

## Current State

**Game Features:**

- A 2D grid layout rendered in the browser.
- Player-controlled logic execution for medieval-themed pawns.
- Syntax-highlighted in-browser code editor using Monaco Editor.
- Work-in-progress level design.

---

## Tech Stack

The project is built using **Vue 3**. Peripheral dependencies are included for
development convenience but are intentionally kept minimal for core functionalities.

**Primary Libraries and Tools:**

- **Vue 3**: Core framework, includes **Pinia** for state management and **Vue Router** for navigation handling.
- **Monaco Editor**: Code editing interface.

**Development Dependencies:**

- **TypeScript**: Static typing and type safety.
- **ESLint & Stylelint**: Code style enforcement.
- **Husky**: Pre-commit hooks.
- **Commitlint**: Enforces conventional commit messages.
- **Vite**: Development server and build tool.

**DevOps / Server Infrastructure:**

- **Vercel**: Deployment Environment, User Metrics

---

## Contributing

While contributions are not actively sought, they are welcome. See the [CONTRIBUTING](CONTRIBUTING.md) file for
detailed guidelines.

In particular, creating **new levels** is the easiest way to contribute. Levels are stored in `src/lib/levels/data` as
separate files (e.g., `level_01.js`) and follow a simple pattern.

---

## Development Setup

1. Clone the repository:
    ```bash
      git clone https://github.com/MilanFox/By-Royal-Decree.git
      cd by-royal-decree
    ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser:

   ```
   http://localhost:5173
   ```

## Credit:

- Sprites / Tileset by Pixel Frog: https://pixelfrog-assets.itch.io/tiny-swords
- Some Icons by iconfield: https://www.flaticon.com/authors/iconfield/black-hand-drawn?author_id=1502
- Font / Typeface by Sharkshock: https://www.dafont.com/de/enchanted-land.font

For all of which I am using the non-commercial private licence as this is a learning project with no business
implications. 
