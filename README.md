# Flappy Bird - Next.js

A modern implementation of the classic Flappy Bird game built with Next.js and Tailwind CSS.

## Features

- User authentication (login/register)
- High score tracking
- Responsive design
- Modern UI with Tailwind CSS
- Smooth animations

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Custom auth context (can be replaced with NextAuth.js)
- **State Management**: React hooks

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flappy-bird-next.git
   cd flappy-bird-next
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the game.

## Game Instructions

- Click or press Space to make the bird fly
- Navigate through the pipes
- Each pipe passed gives you 1 point
- Try to beat your high score!

## Project Structure

```
flappy-bird-next/
├── app/
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   ├── login/
│   │   └── register/
│   ├── game/
│   │   ├── components/
│   │   │   ├── Bird.tsx
│   │   │   ├── Pipe.tsx
│   │   │   └── GameOver.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── bird.png
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Deployment

This project can be easily deployed to Vercel:

```bash
npm run build
# or
vercel
```

## Future Improvements

- Add sound effects
- Implement different difficulty levels
- Add more visual effects and animations
- Create a leaderboard system
- Add social sharing features

## License

This project is licensed under the MIT License.
