# AI GitHub Intelligence

Analyze your repositories with AI-powered insights to detect risky files, unstable pull requests, and high-change hotspots instantly.

## Features

- **Risk Detection**: Automatically identify files most at risk of introducing bugs based on change patterns and history
- **PR Analysis**: Score pull requests for stability and quality with intelligent metrics
- **File Frequency Analysis**: Discover hotspots—files that change frequently and may indicate maintenance bottlenecks
- **Real-time Insights**: Process repository data and generate actionable intelligence in seconds
- **Visual Dashboard**: Interactive charts and heatmaps for easy comprehension of complex metrics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub personal access token (for accessing repository data)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/ai-github-intelligence.git
cd ai-github-intelligence
npm install
```

### Configuration

Set up your GitHub token:

```bash
export GITHUB_TOKEN="your_github_pat_here"
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter a GitHub repository URL (format: `owner/repo`) in the input field
2. Click "Analyze" to process the repository
3. View insights including:
   - Risk heatmap of high-risk files
   - PR stability scores
   - File change frequency analysis

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom components from [shadcn/ui](https://ui.shadcn.com/)
- **UI Components**: Radix UI, Lucide React icons
- **Language**: TypeScript
- **API Integration**: GitHub REST API

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── actions/        # Server actions for backend logic
│   ├── dashboard/      # Dashboard pages
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── insights/       # AI insights visualizations
│   ├── pr/            # PR analysis components
│   ├── risk/          # Risk assessment components
│   ├── shared/        # Shared UI components
│   └── ui/            # Base UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and feature logic
│   ├── ai/           # AI prompts and processing
│   ├── github/       # GitHub API integration
│   ├── pr/           # PR scoring logic
│   ├── risk/         # Risk engine
│   └── features/     # Feature extraction
└── public/            # Static assets
```

## Building for Production

Build the application:

```bash
npm run build
npm start
```

## Linting

Check code quality:

```bash
npm run lint
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Built with ❤️ for better code intelligence

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ai-github-nextjs
This is a POC created for nextjs goal along with ai intelligence
