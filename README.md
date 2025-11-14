# Open AGI Model Marketplace

> **Building the future of open-source AGI through transparent, decentralized model distribution**

A professional marketplace platform aligned with [Sentient Foundation's](https://sentient.foundation) mission to make AGI innovation open and accessible to everyone.

---

##  Mission

Innovation in AGI must be **open and accessible to everyone**. This marketplace demonstrates how open-source AGI models can be discovered, shared, and monetized in a transparent, decentralized ecosystem; moving away from closed-source systems dominated by private companies.

### Core Principles

- ** Open Source First**: All models and infrastructure prioritize transparency and community access
- ** Decentralized**: No single entity controls the marketplace or model distribution
- ** Fair Monetization**: Builders earn sustainable revenue while keeping AGI accessible
- ** Community Governed**: Transparent operations with accountability to the developer community
- ** AGI-Focused**: Supporting the next generation of open-source AGI pioneers

---

##  Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Contributing to Open AGI](#contributing-to-open-agi)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

The **Open AGI Model Marketplace** is a demonstration platform showcasing how open-source AGI models can be distributed, accessed, and monetized transparently:

### For Model Builders
-  **List open-source models** with transparent pricing
-  **Earn from usage** through fair revenue sharing
-  **Track impact** with detailed analytics
-  **Build reputation** through community ratings

### For Developers & Researchers
-  **Discover AGI models** across multiple categories
-  **Start with demo credits** to explore and experiment
-  **Compare pricing** with full transparency
-  **Simulate costs** before committing to production

### Platform Categories
- ** LLM**: Large language models for reasoning, code generation, and analysis
- ** Vision**: Computer vision models for image understanding and generation
- ** Audio**: Speech, music, and audio processing models
- ** Tooling**: Agent frameworks, routing, moderation, and specialized utilities

---

## How It Works

### 1️ **Authentication**
- Sign in with **Google OAuth** or **email magic link**
- Receive **$25.00 in demo credits** to start exploring immediately
- No wallet or cryptocurrency required for the simulation

### 2️ **Discover Models**
- Browse curated open-source AGI models
- Filter by: **Category**, **Rating**, **Price**, **Tags**
- Sort by: **Trending**, **Most Used**, **Top Rated**, **Newest**
- View detailed metrics: pricing, latency, usage statistics

### 3️ **Unlock & Use Models**
- **Unlock models** with one-time access (free in simulation mode)
- **Run simulated API calls** to test functionality
- **Track costs** based on token usage (1,000 tokens per test call)
- **Rate models** to help the community make informed decisions

### 4️ **Monitor Usage**
- View your **credit balance** and spending history
- Track **owned models** and usage patterns
- Access **detailed analytics** on your API calls
- Simulate **revenue scenarios** with the monetization calculator

---

## Key Features

###  **Professional Marketplace UI**
- Modern, glassmorphic design with smooth animations
- Responsive interface optimized for all devices
- Advanced filtering and sorting capabilities
- Real-time usage statistics

###  **Credit-Based Economy**
- Demo credits for risk-free experimentation
- Transparent pricing per 1K tokens
- Automatic cost calculation and deduction
- Low-balance warnings and protection

###  **Analytics Dashboard**
- Personal usage statistics and spending trends
- Model performance metrics
- Revenue simulation tools
- Leaderboards for top models

###  **Secure Authentication**
- NextAuth.js with multiple providers
- Session-based security
- Protected routes and API endpoints
- Email verification support

###  **Robust Data Layer**
- PostgreSQL database with Prisma ORM
- Efficient querying and caching
- Migration support for schema evolution
- Data integrity and validation

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (or Neon serverless Postgres)
- Google OAuth credentials (optional, for social login)
- SMTP server for email authentication (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Iziedking/sentient-model-marketplace.git
   cd sentient-model-marketplace/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_URL` - Your application URL
   - `NEXTAUTH_SECRET` - Random secret for session encryption
   - `GOOGLE_CLIENT_ID` - (Optional) Google OAuth
   - `GOOGLE_CLIENT_SECRET` - (Optional) Google OAuth
   - `EMAIL_SERVER` - (Optional) SMTP configuration

4. **Initialize database**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

---

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless functions
- **NextAuth.js** - Authentication framework
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Relational database

### Infrastructure
- **AWS S3** - File storage (optional)
- **Nodemailer** - Email delivery
- **Neon** - Serverless Postgres hosting

---

## Contributing to Open AGI

We welcome contributions that advance open-source AGI! This project aligns with the **Sentient Foundation's** mission to fund and support the next generation of AGI pioneers.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** with clear, documented code
4. **Write or update tests** as needed
5. **Commit with descriptive messages** (`git commit -m 'Add amazing feature'`)
6. **Push to your branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request** with detailed description

### Areas for Contribution
-  **Infrastructure**: Improve decentralization and scalability
-  **UI/UX**: Enhance accessibility and user experience
-  **Documentation**: Expand guides and tutorials
-  **Testing**: Add test coverage and quality assurance
-  **Models**: Add support for new AGI model types
-  **Integration**: Connect with other open-source AGI projects

---

## Roadmap

###  Phase 1: Foundation (Completed)
- Professional marketplace UI
- Authentication and user management
- Credit-based economy simulation
- Model browsing and filtering
- Usage tracking and analytics

###  Phase 2: Builder Tools (In Progress)
- Model upload and submission workflow
- Automated model validation
- Custom pricing strategies
- Revenue analytics for builders

###  Phase 3: Decentralization
- IPFS integration for model distribution
- Blockchain-based ownership verification
- Token-based governance mechanisms
- Peer-to-peer model sharing

###  Phase 4: Advanced Features
- Real billing integration (optional)
- Subscription and bundle pricing
- Multi-model inference pipelines
- Community grants and fellowships
- Integration with GRID network

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

This marketplace is inspired by and aligned with the **Sentient Foundation's** vision for open, decentralized AGI:

> *"Innovation in AGI must be open and accessible to everyone. We fund and support the next generation of open-source AGI pioneers through targeted grants and fellowships."*

### Learn More
-  [Sentient Foundation](https://sentient.foundation)
-  [Mission & Vision](https://sentient.foundation/mission)
-  [ROMA Framework](https://github.com/sentient-agi/roma) - Open-source meta-agent framework
-  [The GRID Network](https://sentient.foundation/grid) - Decentralized AGI platform

---

**Join me in building the future of open-source AGI** 
