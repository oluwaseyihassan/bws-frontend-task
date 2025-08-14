# BWS Frontend Task - Football Fixtures & Predictions App

A modern web application built with Next.js that displays football fixtures and predictions with an intuitive user interface.

## Features

### 🏈 Fixture Management

- **Date-based Fixtures**: View fixtures for any specific date
- **Calendar Integration**: Interactive calendar picker for easy date selection
- **Team Search**: Search fixtures by team name with real-time results
- **Match Details**: Detailed modal view for each fixture with team information

### 📊 Predictions & Analytics

- **Match Predictions**: Visual prediction bars showing win/draw probabilities
- **Color-coded Results**: Green (home win), Gray (draw), Red (away win)
- **Percentage Display**: Clear percentage indicators for each outcome

### 🎨 User Interface

- **Dark Theme**: Modern dark UI with accent colors
- **Responsive Design**: Optimized for desktop and mobile devices
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: User-friendly error messages and fallbacks
- **Modal Overlays**: Clean overlay system for enhanced user experience

### 🔍 Search & Navigation

- **Real-time Search**: Auto-search as you type (3+ characters)
- **Search Mode Toggle**: Easy switching between date and search views
- **Date Validation**: Intelligent date validation with fallbacks
- **Empty States**: Helpful messages when no results are found

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Date Handling**: date-fns
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bws-frontend-task
   ```
2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Run the development server**
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
