#!/bin/bash

# Playwright E2E Test Setup Script
# Run this script to install Playwright and set up the test environment

set -e

echo "🎭 Setting up Playwright E2E Tests..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install Playwright
echo ""
echo "📦 Installing Playwright..."
npm install -D @playwright/test

# Install browsers
echo ""
echo "🌐 Installing Playwright browsers (chromium, firefox, webkit)..."
npx playwright install

# Install system dependencies (Linux)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo ""
    echo "📚 Installing system dependencies for Linux..."
    npx playwright install-deps
fi

# Update package.json with test scripts
echo ""
echo "📝 Updating package.json with test scripts..."

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the project root?"
    exit 1
fi

# Add scripts to package.json if not already present
if ! grep -q '"test:e2e"' package.json; then
    echo "  Adding test scripts..."
    
    # Use Node.js to safely update package.json
    node << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!pkg.scripts) pkg.scripts = {};

pkg.scripts['test:e2e'] = 'playwright test';
pkg.scripts['test:e2e:ui'] = 'playwright test --ui';
pkg.scripts['test:e2e:headed'] = 'playwright test --headed';
pkg.scripts['test:e2e:debug'] = 'playwright test --debug';
pkg.scripts['test:e2e:report'] = 'playwright show-report';

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('✅ Test scripts added to package.json');
EOF
fi

echo ""
echo "✅ Directory structure:"
echo "   tests/e2e.spec.ts          - Test cases"
echo "   playwright.config.ts        - Playwright configuration"
echo "   PLAYWRIGHT_README.md        - Test documentation"
echo "   OPTIMIZATION_GUIDE.md       - Optimization suggestions"

echo ""
echo "=================================="
echo "✨ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   1. Start the dev server:  npm run dev"
echo "   2. In another terminal:   npm run test:e2e"
echo ""
echo "🚀 Quick commands:"
echo "   npm run test:e2e          - Run all tests"
echo "   npm run test:e2e:ui       - Run tests with UI"
echo "   npm run test:e2e:headed   - Run tests in headed mode"
echo "   npm run test:e2e:debug    - Debug tests interactively"
echo "   npm run test:e2e:report   - View test report"
echo ""
echo "📚 For more info, see PLAYWRIGHT_README.md"
echo "=================================="
