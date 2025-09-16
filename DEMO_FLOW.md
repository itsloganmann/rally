# Rally Demo Flow - Live Presentation Guide

## Overview
Rally is a platform that connects college students and campus micro-influencers with brands through a smart two-sided marketplace using AI-powered matching and a vector database for semantic alignment.

## Demo Flow (5-7 minutes)

### 1. Landing Page (30 seconds)
- Start at: `http://localhost:3001`
- Show the Rally branding and value proposition
- Click "Get Started as a Brand" to begin onboarding

### 2. Brand Onboarding (45 seconds)
- Fill out the brand profile form:
  - Company Name: "TechFlow Energy"
  - Industry: "Energy Drinks" 
  - Company Size: "Startup"
  - Budget Preference: "Micro"
  - Description: "Revolutionary energy drink targeting college students and young professionals"
- Click "Complete Setup" to proceed to recommendations

### 3. Globe Interface - Main Demo (3-4 minutes)

#### A. Initial Globe View (30 seconds)
- Show the 3D wireframe globe with country outlines
- Point out the colored dots representing student influencers:
  - Green dots: 90%+ brand fit
  - Yellow dots: 80-89% brand fit  
  - White dots: Standard fit
- Explain the AI-powered matching based on semantic similarity

#### B. Search Functionality (30 seconds)
- Use the search bar to find "Stanford"
- Watch the globe smoothly fly to Stanford University
- Show how the view automatically filters to Stanford students
- Clear the school filter to return to global view

#### C. View Mode Toggles (45 seconds)
- **Students View**: Default view showing individual student influencers
- **Schools View**: Toggle to show university locations as gray dots
  - Click on a school dot (e.g., UCLA) to zoom in and filter students
- **Density View**: Toggle to show hexagonal heatmap
  - Point out high-density areas (California, Northeast, Texas)
  - Click on a dense hexagon to zoom and explore that region

#### D. Influencer Selection (60 seconds)
- Return to Students view
- Click on several high-fit green dots across different regions:
  - West Coast: Stanford or UCLA student
  - East Coast: Harvard or MIT student  
  - South: University of Miami or Duke student
- Show the side panel with detailed influencer information:
  - School and organizations
  - Social media reach and platforms
  - Brand fit score and explanation
  - "Why they're a match" AI reasoning
- Select 4-5 influencers total (watch the counter in top-right)

#### E. Filtering and Sorting (30 seconds)
- Demonstrate the filters in the right panel:
  - Sort by Fit Score vs Followers
  - Minimum followers filter
  - Interest-based filtering
- Show how the globe updates in real-time

### 4. Campaign Deployment (45 seconds)
- Click "Deploy Campaign" button
- Navigate to the simulation page showing selected influencers
- Watch the animated campaign results:
  - Individual posts from each influencer
  - Real-time view and conversion counters
  - Platform-specific content (TikTok, Instagram, LinkedIn)
  - Engagement metrics and CTR calculations

### 5. Results Summary (30 seconds)
- Show the final campaign performance metrics
- Highlight the total reach, conversions, and ROI
- Emphasize the authentic campus connections and targeted reach

## Key Talking Points

### Technology Stack
- **Frontend**: Next.js with React and Tailwind CSS
- **3D Visualization**: Globe.gl with Three.js for WebGL rendering
- **Geographic Data**: TopoJSON world boundaries and precise university coordinates
- **AI Matching**: Vector embeddings for semantic similarity (mention future backend integration)

### Unique Value Proposition
1. **Authentic Campus Connections**: Real student influencers with verified campus affiliations
2. **AI-Powered Matching**: Semantic analysis of student profiles vs brand campaign needs
3. **Geographic Precision**: Exact university locations for targeted regional campaigns
4. **Scalable Platform**: From nano-influencers to macro-influencers across all major campuses

### Market Opportunity
- **$16B+ Influencer Marketing Market**: Growing 20%+ annually
- **45M+ College Students**: Highly engaged demographic with significant purchasing power
- **Campus Influence**: Students trust peer recommendations 3x more than traditional advertising
- **Untapped Niche**: Most platforms focus on celebrity influencers, missing authentic campus voices

## Technical Demo Notes

### Performance Features
- **Smooth 3D Interactions**: 60fps globe rotation and zoom
- **Real-time Filtering**: Instant updates as filters are applied
- **Responsive Design**: Works across desktop and mobile devices
- **Fast Loading**: Optimized data loading and caching

### Data Quality
- **30 Major Universities**: Accurate coordinates and comprehensive student profiles
- **Realistic Metrics**: Believable follower counts and engagement rates
- **Diverse Representation**: Students from various backgrounds, interests, and campus roles
- **Rich Context**: Detailed explanations for why each match makes sense

## Backup Demo Points (if needed)
- Show the hexagonal density heatmap in detail
- Demonstrate mobile responsiveness
- Explain the vector database concept for semantic matching
- Discuss scalability to thousands of universities and millions of students
