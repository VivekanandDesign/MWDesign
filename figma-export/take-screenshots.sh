#!/bin/bash

# Component Screenshot Automation Script
# Run this to capture all component states for Figma reference

echo "📸 Taking screenshots of all components..."

# Navigate to your project
cd /Users/vivekanandchoudhari/Desktop/MWDV1

# Create screenshots directory
mkdir -p figma-export/screenshots

echo "🌐 Starting development server..."
npm run dev &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 10

echo "📷 Taking component screenshots..."

# Using built-in macOS screenshot tool
# You can manually take these or use automation tools

echo "Manual Screenshot Guide:"
echo "1. Open http://localhost:3000/components"
echo "2. Take screenshots of each component section:"
echo "   - Buttons (all variants)"
echo "   - Forms (all input types)"
echo "   - Cards (all variants)"
echo "   - Badges (all colors)"
echo "   - Navigation components"
echo "   - Tables"
echo "   - Modals (if any)"
echo ""
echo "3. Save screenshots to: figma-export/screenshots/"
echo "4. Name them: button-variants.png, input-forms.png, etc."

# Alternative: Use Puppeteer for automation
echo ""
echo "🤖 Alternative: Automated screenshots with Puppeteer"
echo "Run: npm install puppeteer"
echo "Then use the screenshot script in package.json"

# Keep server running for screenshots
echo "✅ Server running at http://localhost:3000"
echo "Press Ctrl+C to stop server after taking screenshots"

wait $SERVER_PID
