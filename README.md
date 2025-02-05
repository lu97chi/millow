# Millow - AI-Powered Real Estate Platform 🏠

An intelligent real estate search platform tailored for the Mexican market, combining traditional property search with AI-powered recommendations through natural conversation.

## 🌟 Features

- **AI-Powered Search**: Natural language property matching through chat interface
- **Intelligent Filtering**: Automatic filter application based on user conversations
- **Real-Time Chat**: Modern ChatGPT-like interface for property inquiries
- **Context-Aware**: Chat maintains awareness of user's search context
- **Dual Interface**: Traditional search + AI-powered recommendations
- **Mexican Market Focus**: Tailored for Mexican real estate specifics
- **Responsive Design**: Optimized for both desktop and mobile

## 🛠 Tech Stack

### Core
- Next.js 15 (App Router)
- React & React DOM v19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion

### Database & Caching
- PlanetScale (MySQL)
- Prisma ORM
- Upstash Redis (Caching Layer)

### AI & Integration
- OpenAI API
- Zod (Validation)
- React Hook Form

## 📁 Project Structure

```
/src
├── /app
│   ├── /api
│   │   ├── /chat
│   │   └── /properties
│   ├── /(auth)
│   ├── /(marketing)
│   └── /(dashboard)
├── /components
│   ├── /ui
│   ├── /properties
│   ├── /chat
│   ├── /filters
│   └── /layout
└── /lib
    ├── /utils
    ├── /hooks
    └── /services
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm (recommended) or npm
- Git
- MySQL local instance (optional, can use PlanetScale)

### Environment Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/millow.git
cd millow
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your .env.local with:
\`\`\`
# Database
DATABASE_URL="your-planetscale-connection-string"

# Redis
UPSTASH_REDIS_URL="your-upstash-redis-url"
UPSTASH_REDIS_TOKEN="your-upstash-redis-token"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Other configs...
\`\`\`

5. Initialize the database:
\`\`\`bash
pnpm prisma generate
pnpm prisma db push
\`\`\`

6. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

Visit \`http://localhost:3000\` to see the application.

## 🏗 Project Phases

### Phase 1: Foundation (2-3 weeks)
- Project setup and configuration
- Core UI components
- Basic routing structure
- Database schema design

### Phase 2: Property Search (2-3 weeks)
- Property listing features
- Advanced filter system
- Search functionality
- Property detail pages

### Phase 3: Chat Integration (2-3 weeks)
- Chat UI implementation
- OpenAI API integration
- Context management
- Response handling

### Phase 4: AI Enhancement (2-3 weeks)
- Advanced AI features
- Performance optimization
- Mexican market specifics
- Final polish

## 🎨 UI/UX Guidelines

### Layout
- 80% main content area
- 20% persistent chat interface
- Responsive design with mobile-first approach

### Design Principles
- Modern and minimalistic
- Mexican market cultural elements
- Smooth animations and transitions
- High-performance rendering

### Mobile Considerations
- Bottom sheet for chat
- Collapsible filters
- Touch-friendly interfaces
- Optimized performance

## 🔧 Development Commands

\`\`\`bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Run linting
pnpm lint

# Format code
pnpm format
\`\`\`

## 📈 Performance Considerations

- Server-side rendering for main content
- Client-side chat interface
- Image optimization
- Lazy loading for non-critical components
- Efficient state management
- Redis caching for frequent queries

## 🔒 Security Measures

- API rate limiting
- Input sanitization
- Data encryption
- Secure chat history storage
- Authentication flow

## 🌐 SEO Optimization

- Meta tags optimization
- Structured data for properties
- Static generation for property pages
- Sitemap generation
- Mexican market keywords

## 📱 Mobile-First Approach

The application is designed with a mobile-first approach, ensuring:
- Responsive design across all devices
- Touch-friendly interfaces
- Optimized performance on mobile networks
- Adaptive chat interface
- Mobile-optimized images

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn UI for beautiful components
- OpenAI for AI capabilities
- PlanetScale for scalable database
- Upstash for Redis solutions
