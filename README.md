# Cricket Club Website

A modern, responsive website for a cricket club built with React and TypeScript. This website showcases the club's information, team members, match results, testimonials, gallery, and more.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Team Section**: Display team members with their roles, achievements, and photos
- **Match Results**: Show recent match results with scores and key events
- **Testimonials**: Player testimonials with ratings and reasons for joining
- **Gallery**: Interactive photo gallery with filtering and modal view
- **Video Section**: Video showcase with categories and modal player
- **Contact Information**: Club contact details and social media links
- **Smooth Navigation**: Fixed header with smooth scrolling to sections

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Lucide React** for beautiful icons
- **CSS3** with modern features (Grid, Flexbox, Custom Properties)
- **Responsive Design** with mobile-first approach

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cricket-club-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx           # Hero section with stats
│   ├── About.tsx          # About the club
│   ├── Team.tsx           # Team members showcase
│   ├── Matches.tsx        # Recent match results
│   ├── Testimonials.tsx   # Player testimonials
│   ├── Gallery.tsx        # Photo gallery
│   ├── VideoSection.tsx   # Video showcase
│   ├── Contact.tsx        # Contact information
│   └── Footer.tsx         # Footer with links
├── App.tsx                # Main app component
├── App.css               # Main styles
└── index.css             # Global styles
```

## Customization

### Adding New Team Members

Edit the `teamMembers` array in `src/components/Team.tsx`:

```typescript
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Your Name",
    role: "Captain",
    position: "Batsman",
    experience: "5 years",
    achievements: ["Achievement 1", "Achievement 2"],
    image: "path/to/image.jpg"
  },
  // ... more members
];
```

### Adding Match Results

Edit the `matches` array in `src/components/Matches.tsx`:

```typescript
const matches: Match[] = [
  {
    id: 1,
    date: "2024-01-15",
    opponent: "Opponent Team",
    venue: "Venue Name",
    result: "won", // or "lost" or "tied"
    ourScore: "245/8 (50 overs)",
    opponentScore: "198/10 (45.2 overs)",
    keyEvents: ["Event 1", "Event 2"],
    manOfTheMatch: "Player Name"
  },
  // ... more matches
];
```

### Adding Testimonials

Edit the `testimonials` array in `src/components/Testimonials.tsx`:

```typescript
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Player Name",
    role: "Position",
    image: "path/to/image.jpg",
    quote: "Testimonial quote",
    reason: "Why they love the club",
    rating: 5
  },
  // ... more testimonials
];
```

### Customizing Colors

Edit the CSS custom properties in `src/index.css`:

```css
:root {
  --primary-color: #2563eb;    /* Main brand color */
  --secondary-color: #fbbf24;  /* Accent color */
  --accent-color: #ef4444;     /* Highlight color */
  /* ... more variables */
}
```

## Features in Detail

### Gallery
- Filterable by categories (All, Matches, Training, Events)
- Modal view with navigation
- Responsive grid layout
- Hover effects and smooth transitions

### Video Section
- Video thumbnails with play overlay
- Modal video player with controls
- Category filtering
- Responsive design

### Team Section
- Role-based icons
- Achievement tags
- Hover effects
- Responsive grid

### Match Results
- Color-coded results (won/lost/tied)
- Detailed match information
- Key events listing
- Man of the match highlighting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with proper sizing
- Lazy loading for better performance
- Smooth animations with `prefers-reduced-motion` support
- Accessible design with proper ARIA labels

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please contact the development team or create an issue in the repository.