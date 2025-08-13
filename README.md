# Finance Calculator Pro - React Native App

A comprehensive financial calculator and expense tracking application built with React Native, featuring modern UI/UX design and production-grade architecture.

## 🌟 Features

### Finance Calculators
- **EMI Calculator**: Calculate loan EMIs with amortization schedules
- **SIP Calculator**: Plan systematic investment returns
- **FD Calculator**: Fixed deposit maturity calculations
- **Lumpsum Calculator**: One-time investment growth projections
- **SWP Calculator**: Systematic withdrawal planning
- **NPS Calculator**: National pension scheme projections

### Expense Management
- **Transaction Tracking**: Manual entry with category management
- **Budget Management**: Monthly/custom period budgets with alerts
- **Insights & Analytics**: Spending patterns and trends
- **Data Export**: CSV/Excel export functionality

### Modern UX/UI
- **Clean Design**: Modern, attractive interface with consistent design system
- **Bottom Tab Navigation**: Intuitive navigation between main sections
- **Real-time Calculations**: Instant results as you type
- **Dark Mode Support**: Automatic theme adaptation
- **Accessibility**: Large touch targets and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FinanceCalculatorApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### Development Mode

1. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android**
   ```bash
   npm run android
   # or
   yarn android
   ```

3. **Run on iOS (macOS only)**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

#### Using GitHub Codespaces

This project includes a complete DevContainer configuration for development in GitHub Codespaces:

1. **Open in Codespaces**
   - Click "Code" → "Codespaces" → "Create codespace on main"
   - Wait for the container to build and dependencies to install

2. **Development in Codespaces**
   - The environment includes Android SDK, Java 17, Node.js, and all required tools
   - Metro bundler will be available on port 8081
   - Use Android emulator or connect a physical device via USB debugging

3. **Running Commands**
   ```bash
   # Start the development server
   npm start

   # Build Android APK
   npm run build:android

   # Run tests
   npm test

   # Lint code
   npm run lint
   ```

## 📁 Project Structure

```
FinanceCalculatorApp/
├── .devcontainer/          # GitHub Codespaces configuration
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Generic components (Button, Input, Card)
│   │   ├── calculators/   # Calculator-specific components
│   │   ├── expenses/      # Expense-related components
│   │   └── insights/      # Analytics components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── services/          # Business logic and API services
│   ├── utils/             # Utility functions
│   ├── styles/            # Theme and styling
│   ├── types/             # TypeScript type definitions
│   └── constants/         # App constants and configuration
├── android/               # Android-specific files
├── ios/                   # iOS-specific files (macOS only)
├── assets/                # Images, fonts, and other assets
└── package.json           # Dependencies and scripts
```

## 🛠️ Development

### Architecture

- **Modular Design**: Clean separation of concerns with dedicated service layers
- **TypeScript**: Full type safety throughout the application
- **Context API**: Centralized state management with React Context
- **Local Storage**: AsyncStorage for offline-first data persistence
- **Navigation**: React Navigation with bottom tabs and stack navigation
- **Styling**: Custom theme system with consistent design tokens

### Key Services

- **StorageService**: Handles local data persistence
- **AppContext**: Global state management
- **Financial Calculations**: Precise mathematical calculations for all calculators

### Component Library

- **Button**: Customizable button with variants and gradients
- **Input**: Form input with validation and error handling
- **Card**: Reusable card container with elevation options

### Adding New Features

1. **New Calculator**: Add to `CALCULATOR_TYPES` constant and create calculator logic
2. **New Screen**: Create in `src/screens/` and add to navigation
3. **New Component**: Add to appropriate component directory with proper typing

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📦 Building

### Android

```bash
# Debug build
npm run android

# Release build
npm run build:android
cd android && ./gradlew assembleRelease
```

### iOS (macOS only)

```bash
# Debug build
npm run ios

# Release build
# Open ios/FinanceCalculatorApp.xcworkspace in Xcode
# Select "Any iOS Device" and build for archive
```

## 🔧 Configuration

### Environment Variables

Create `.env` file in root directory:

```env
# App Configuration
APP_NAME=Finance Calculator Pro
VERSION=1.0.0

# Analytics (optional)
ANALYTICS_ENABLED=false
```

### Customization

- **Colors**: Modify `src/styles/theme.ts`
- **Constants**: Update `src/constants/index.ts`
- **Categories**: Customize expense categories in constants

## 📱 Features in Detail

### Financial Calculations

All calculations use industry-standard formulas:

- **EMI**: `EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)`
- **SIP**: `M = P × ((1 + i)^n – 1)/i × (1 + i)`
- **Compound Interest**: `A = P(1 + r/n)^(nt)`

### Data Management

- **Local-First**: All data stored locally with optional cloud backup
- **Export/Import**: CSV format for data portability
- **Privacy**: No personal data collection or transmission

### User Experience

- **Progressive Disclosure**: Information revealed as needed
- **Immediate Feedback**: Real-time calculation updates
- **Error Handling**: Graceful error recovery with helpful messages
- **Accessibility**: WCAG compliant with screen reader support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in `/docs`
- Review the FAQ section

## 🔄 Roadmap

### Phase 1 (Current)
- [x] Basic calculators (EMI, SIP, FD, Lumpsum)
- [x] Expense tracking
- [x] Modern UI/UX
- [x] Local data storage

### Phase 2 (Planned)
- [ ] Advanced calculators (SWP, NPS, Tax planning)
- [ ] Charts and visualizations
- [ ] Budget analytics
- [ ] Cloud backup

### Phase 3 (Future)
- [ ] Investment goal tracking
- [ ] Bill reminders
- [ ] Multi-currency support
- [ ] Export to PDF reports

---

Built with ❤️ using React Native and TypeScript
