# Pattern Master 🎯

A modern, fun, and playful gamified learning platform for mastering design patterns, algorithms, and machine learning concepts built with Vue 3, TailwindCSS, and Vitest.

![Pattern Master Screenshot](https://github.com/user-attachments/assets/69ed96b1-ef53-45db-a888-7e1e6d45dad1)

## ✨ Features

### 🎮 Interactive Learning Experience
- **Code Editor**: Write and edit code in a sleek CodeMirror-based editor with syntax highlighting
- **Live Test Runner**: Run tests instantly and see real-time feedback with visual results
- **Pattern Descriptions**: Comprehensive explanations with visualizations and examples
- **Smart Hints System**: Toggle hints when you need a little help

### 🏆 Gamification System
- **XP & Levels**: Earn experience points and level up as you complete challenges
- **Achievement Badges**: Unlock achievements for reaching milestones
- **Progress Tracking**: Track completed patterns and overall progress
- **Visual Feedback**: Animations and effects that celebrate your success

### 📚 Content Categories
- **Design Patterns**: Learn classic software design patterns (Singleton, Factory, Observer, etc.)
- **Data Structures & Algorithms**: Master fundamental DS&A concepts (Binary Search, Sorting, etc.)
- **Machine Learning**: Understand ML algorithms (Linear Regression, K-Means, etc.)

### 🎨 Modern Design
- Vibrant gradient backgrounds and playful color schemes
- Smooth animations and transitions
- Responsive layout that works on all devices
- Fun emoji icons throughout the interface

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/orieken/literate-train.git
cd literate-train
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🛠️ Development

### Project Structure
```
src/
├── components/          # Vue components
│   ├── CodeEditor.vue   # CodeMirror-based code editor
│   ├── TestRunner.vue   # Test execution and results display
│   ├── PatternDescription.vue  # Pattern info display
│   ├── PatternList.vue  # Challenge selection sidebar
│   └── UserProgress.vue # User stats and achievements
├── stores/             # Pinia state management
│   ├── patterns.ts     # Pattern data and management
│   └── user.ts         # User progress and achievements
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── views/              # Page components
│   └── PatternWorkspace.vue  # Main application view
└── router/             # Vue Router configuration
    └── index.ts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test:unit` - Run unit tests with Vitest
- `npm run type-check` - Run TypeScript type checking

### Tech Stack

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom theme
- **State Management**: Pinia
- **Routing**: Vue Router
- **Code Editor**: CodeMirror 6
- **Testing**: Vitest
- **Build Tool**: Vite

## 🎯 How to Use

1. **Select a Challenge**: Choose from the sidebar (Design Patterns, DS&A, or ML)
2. **Read the Description**: Understand the concept with visualizations and examples
3. **Write Your Code**: Implement the solution in the code editor
4. **Run Tests**: Click "Run Tests" to validate your solution
5. **Earn Rewards**: Complete challenges to earn XP, level up, and unlock achievements!

## 🏅 Achievement System

Track your progress with achievements:
- 🎯 **First Steps**: Complete your first pattern
- 🏆 **Pattern Master**: Complete 5 patterns
- 💯 **Century Club**: Earn 100 XP
- ⭐ **Rising Star**: Reach level 5

## 🎨 Customization

The design system uses custom TailwindCSS colors defined in `tailwind.config.js`:
- `pattern-blue`, `pattern-purple`, `pattern-green` - Primary colors
- `fun-pink`, `fun-orange`, `fun-cyan`, `fun-lime` - Accent colors

Custom animations include:
- `animate-float` - Gentle floating effect
- `animate-wiggle` - Playful wiggle animation
- `animate-bounce-slow` - Slow bounce effect

## 📝 Adding New Patterns

To add a new pattern, edit `src/stores/patterns.ts` and add a new pattern object:

```typescript
{
  id: 'your-pattern-id',
  title: 'Pattern Name',
  category: 'design-pattern' | 'ml-algorithm' | 'dsa',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  description: 'Pattern explanation...',
  visualization: 'ASCII art or diagram...',
  xpReward: 50,
  starterCode: 'Initial code...',
  solution: 'Complete solution...',
  testCases: [/* test cases */],
  hints: ['Hint 1', 'Hint 2']
}
```

## 🧪 Testing

Run the test suite:
```bash
npm run test:unit
```

Tests are located in `src/components/__tests__/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

Built with ❤️ using Vue 3, TailwindCSS, and the amazing open-source community.

---

Happy Learning! 🚀 Level up your coding skills one pattern at a time!
