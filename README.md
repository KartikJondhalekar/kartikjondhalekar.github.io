# Kartik Jondhalekar - Portfolio Website

A technical portfolio website that demonstrates engineering decision-making, not just project showcases. Built to communicate how I think, how I approach problems, and how I make trade-offs under constraints.

## Design Philosophy

This portfolio is **engineered, not assembled**. Every component, interaction, and content structure is intentional:

- **Neon Slate Theme**: Clean, modern aesthetic with neon blue (#38BDF8) and indigo (#6366F1) accents on dark slate backgrounds
- **Light/Dark Mode**: Toggle between themes with persistent preference storage
- **Depth over Breadth**: Fewer projects, deeper insight into technical decisions and trade-offs
- **Decision Documentation**: Every project includes problem context, constraints, key decisions, and future improvements
- **Signature "How I Think" Section**: Interactive exploration of debugging, trade-off evaluation, and engineering mindset

## Tech Stack

### Core
- **Framework**: Next.js 15 (static export)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React

### Runtime
- **React**: 19.0 (latest stable)
- **Node.js**: 18.x or higher recommended

### Infrastructure
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Analytics**: Plausible Analytics (privacy-first, no cookies)

### Why These Choices?

**Next.js 15**: Latest version with improved performance, better error handling, and enhanced developer experience

**React 19**: Latest stable release with improved concurrent rendering and server components support

**TypeScript 5.7**: Latest TypeScript with improved type inference and performance

**Tailwind CSS 3.4**: Latest utility-first CSS framework with modern features and optimizations

**Framer Motion 11**: Latest animation library with better performance and tree-shaking

**Plausible Analytics**: Privacy-first, lightweight (<1KB), no cookies, GDPR compliant

## Project Structure

```
portfolio-site/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Continuous Integration
│       └── deploy.yml          # Continuous Deployment
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles and CSS variables
│   ├── components/
│   │   ├── Navigation.tsx      # Fixed nav with active state
│   │   ├── Hero.tsx            # Landing section with kinetic typography
│   │   ├── About.tsx           # Narrative-driven background
│   │   ├── Projects.tsx        # Project cards with deep-dive modals
│   │   ├── HowIThink.tsx       # Signature mindset section
│   │   ├── Experience.tsx      # Timeline of impact
│   │   ├── Contact.tsx         # Contact options with copy-to-clipboard
│   │   └── Footer.tsx          # Site footer
│   ├── data/
│   │   └── content.json        # All content data (no hardcoded JSX)
│   ├── lib/
│   │   └── analytics.ts        # Plausible Analytics wrapper
│   └── types/
│       └── content.ts          # TypeScript interfaces
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind customization
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Local Development

### Prerequisites
- Node.js 18.x or later (20.x recommended)
- npm 9.x or later

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-site.git
cd portfolio-site

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev          # Start development server (with hot reload)
npm run build        # Build production bundle
npm run start        # Start production server (for testing)
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Important Notes

- Next.js 15 uses React 19, which may have breaking changes from React 18
- ESLint 9 uses flat config format (eslint.config.mjs)
- All config files now use ESM format (.mjs, .ts)
- Make sure to run `npm install` to get the latest dependencies

## Building for Production

```bash
# Build static site
npm run build

# Output will be in the /out directory
# This is what gets deployed to GitHub Pages
```

## Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Branch: None (using Actions for deployment)

2. **Update Configuration**:
   - Edit `next.config.js`:
     ```javascript
     basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
     assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
     ```

3. **Push to Main Branch**:
   - CI workflow validates build
   - CD workflow deploys to GitHub Pages
   - Site available at `https://yourusername.github.io/your-repo-name/`

### CI/CD Pipeline

**Continuous Integration** (`.github/workflows/ci.yml`):
- Triggers on: Pull requests, pushes to main
- Steps: Install deps → Type check → Lint → Build
- Fast feedback loop for code quality

**Continuous Deployment** (`.github/workflows/deploy.yml`):
- Triggers on: Push to main (after CI passes)
- Steps: Build → Upload artifacts → Deploy to GitHub Pages
- Automatic deployment on successful merge

## Analytics

### Why Plausible?
- **Privacy-first**: No cookies, no personal data collection
- **Lightweight**: <1KB script, minimal performance impact
- **Static-site compatible**: Works perfectly with GitHub Pages
- **Ethical**: GDPR, CCPA, PECR compliant out of the box

### Events Tracked

**Engagement**:
- Page views (automatic)
- Section views (as user scrolls)

**Project Interest**:
- Project card opens
- Deep-dive modal engagement
- GitHub/Demo link clicks

**Interaction**:
- Contact form interactions
- Email copy-to-clipboard
- Social link clicks

### Setup Plausible

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Update `src/app/layout.tsx`:
   ```typescript
   data-domain="yourdomain.com"
   ```

### Interpreting Analytics

See `src/lib/analytics.ts` for detailed guidance on:
- Which metrics matter
- Example insights (e.g., "Users read architecture but don't click demos")
- How to iterate based on data
- Privacy and performance considerations

## Design Decisions

### 1. Static Export over Server Components
**Decision**: Use Next.js static export (`output: 'export'`)

**Rationale**: 
- Zero hosting costs (GitHub Pages is free)
- No server management complexity
- Fast loading (all assets pre-generated)
- Easy to deploy and maintain
- Perfect for portfolio use case

**Trade-off**: No dynamic server features (API routes, middleware), but portfolio doesn't need them

### 2. Content in JSON over MDX
**Decision**: Store all content in `content.json`

**Rationale**:
- Easier to iterate on content structure
- Single source of truth for all data
- TypeScript interfaces provide type safety
- Simpler build process (no MDX parsing)

**Trade-off**: Less flexibility for rich text formatting, but current content doesn't require it

### 3. Framer Motion for Animations
**Decision**: Use Framer Motion instead of CSS-only animations

**Rationale**:
- Declarative API (easier to reason about)
- Better performance for complex animations
- InView hooks for scroll-triggered effects
- Works seamlessly with React

**Trade-off**: Slightly larger bundle (~30KB), but provides significant DX improvement

### 4. Tailwind CSS over CSS Modules
**Decision**: Use Tailwind CSS with custom CSS variables

**Rationale**:
- Rapid iteration without switching files
- Consistent spacing and sizing tokens
- Excellent dark mode support
- Smaller CSS bundle (unused styles purged)

**Trade-off**: Verbose class names, but productivity gain outweighs this

## Future Improvements

### Short Term
- [ ] Add resume download link
- [ ] Implement blog section with MDX
- [ ] Add project filtering by technology
- [ ] Create case study format for larger projects

### Medium Term
- [ ] Add interactive system design diagrams
- [ ] Implement A/B testing for CTA placement
- [ ] Add "Now" page with current focus
- [ ] Create video demos for projects

### Long Term
- [ ] Build custom CMS for content management
- [ ] Add search functionality
- [ ] Implement progressive web app features
- [ ] Create multi-language support

## Accessibility

- Semantic HTML throughout
- ARIA labels where appropriate
- Keyboard navigation support
- `prefers-reduced-motion` respected
- Color contrast meets WCAG AA standards
- Focus indicators on all interactive elements

## Performance

- Lighthouse scores (target):
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100

- Bundle size: ~200KB (including animations)
- First Contentful Paint: <1s
- Time to Interactive: <2s

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

This is a personal portfolio, but suggestions are welcome! If you notice a bug or have an idea:

1. Open an issue describing the problem/suggestion
2. If you'd like to contribute, fork the repo and submit a PR

## License

© 2024 Kartik Jondhalekar. All rights reserved.

The code is available for reference and learning purposes. Please don't copy the entire portfolio—build your own unique version that represents who you are as an engineer.

## Contact

- **Email**: jondhalekar.k@northeastern.edu
- **GitHub**: [github.com/KartikJondhalekar](https://github.com/KartikJondhalekar)
- **LinkedIn**: [linkedin.com/in/kartik-jondhalekar](https://www.linkedin.com/in/kartik-jondhalekar/)

---

Built with intention. Deployed with confidence. Iterated with data.
