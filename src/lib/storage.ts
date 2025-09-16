// Storage utilities for persisting app state to localStorage
export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'simulation';
  powered: 'ai-powered';
  date: string;
  progress: number;
  phase: string;
  simulations: number;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  isCurrent: boolean;
  analysisInput: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  location: string;
  generation: string;
  industry: string;
  reaction: 'full' | 'partial' | 'negative';
  quote: string;
  lat: number;
  lng: number;
  engagement: 'high' | 'medium' | 'low';
}

export interface FeedbackItem {
  id: string;
  personaId: string;
  personaName: string;
  feedback: string;
  timestamp: string;
  sessionId: string;
}

export interface AppState {
  projects: Project[];
  sessions: Session[];
  personas: Persona[];
  feedback: FeedbackItem[];
  currentMode: 'analysis' | 'global';
  analysisPhase: 'input' | 'analyzing' | 'complete' | 'deploying';
  deploymentProgress: number;
  username: string;
}

const STORAGE_KEY = 'tunnel-app-state';
const STORAGE_VERSION = '1.0';

const defaultPersonas: Persona[] = [
  {
    id: '1',
    name: 'James Wilson',
    title: 'CEO',
    location: 'Toronto, Canada',
    generation: 'Gen X',
    industry: 'Fintech',
    reaction: 'full',
    quote: "I like the focus on my generation, there's a gap in the market for fintech solutions tailored for Gen X. I'd be keen to understand how the app plans to address the specific needs and behaviors of this demographic, especially when it comes to investing and financial planning for the future.",
    lat: 43.6532,
    lng: -79.3832,
    engagement: 'high'
  },
  {
    id: '2',
    name: 'Hiroshi Tanaka',
    title: 'Software Engineer',
    location: 'Tokyo, Japan',
    generation: 'Millennial',
    industry: 'Software Development',
    reaction: 'partial',
    quote: "I see the potential in this idea, especially with the older generation's increasing familiarity with digital tools. Perhaps consider a more inclusive approach that targets a wider age range, or adapt the app for the Singaporean market as well, to cater to a broader user base.",
    lat: 35.6762,
    lng: 139.6503,
    engagement: 'medium'
  },
  {
    id: '3',
    name: 'Michelle Johnson',
    title: 'Marketing Director',
    location: 'Vancouver, Canada',
    generation: 'Gen Z',
    industry: 'Marketing',
    reaction: 'partial',
    quote: "I'd be curious to understand how the app intends to address the identified benefits. The focus on Gen X Canadians could be smart, but the execution needs to be flawless.",
    lat: 49.2827,
    lng: -123.1207,
    engagement: 'medium'
  },
  {
    id: '4',
    name: 'Sarah Chen',
    title: 'Product Manager',
    location: 'New York, USA',
    generation: 'Millennial',
    industry: 'Technology',
    reaction: 'full',
    quote: "This addresses a real pain point in the market. Gen X has significant spending power but feels underserved by most fintech apps that focus on younger demographics.",
    lat: 40.7128,
    lng: -74.0060,
    engagement: 'high'
  },
  {
    id: '5',
    name: 'David Rodriguez',
    title: 'Financial Advisor',
    location: 'Los Angeles, USA',
    generation: 'Gen X',
    industry: 'Finance',
    reaction: 'full',
    quote: "My clients in this demographic often struggle with digital tools. A fintech app designed specifically for Gen X would be incredibly valuable.",
    lat: 34.0522,
    lng: -118.2437,
    engagement: 'high'
  },
  {
    id: '6',
    name: 'Emma Thompson',
    title: 'UX Designer',
    location: 'London, UK',
    generation: 'Millennial',
    industry: 'Design',
    reaction: 'partial',
    quote: "The concept is solid, but user research will be critical. Gen X users have different expectations for UI/UX compared to younger generations.",
    lat: 51.5074,
    lng: -0.1278,
    engagement: 'medium'
  },
  {
    id: '7',
    name: 'Alex Kim',
    title: 'Business Analyst',
    location: 'Seoul, South Korea',
    generation: 'Gen Z',
    industry: 'Consulting',
    reaction: 'negative',
    quote: "I'm not convinced the market is large enough to sustain a Gen X-focused fintech app. Most successful fintech companies target broader demographics.",
    lat: 37.5665,
    lng: 126.9780,
    engagement: 'low'
  },
  {
    id: '8',
    name: 'Maria Garcia',
    title: 'Investment Manager',
    location: 'Mexico City, Mexico',
    generation: 'Gen X',
    industry: 'Investment',
    reaction: 'full',
    quote: "There's definitely an opportunity here. Gen X is often overlooked in financial technology despite having substantial assets to manage.",
    lat: 19.4326,
    lng: -99.1332,
    engagement: 'high'
  }
];

const defaultProjects: Project[] = [
  {
    id: 'hackthenofrth',
    name: 'hackthenofrth',
    description: 'AI-powered hackathon project analyzer for evaluating innovative solutions in real-time competitive environments.',
    type: 'simulation',
    powered: 'ai-powered',
    date: 'Sep 14, 2025',
    progress: 73,
    phase: 'Phase 2',
    simulations: 12
  },
  {
    id: 'fxf',
    name: 'fxf',
    description: 'Foreign exchange forecasting platform using machine learning to predict currency fluctuations.',
    type: 'simulation',
    powered: 'ai-powered',
    date: 'Sep 14, 2025',
    progress: 45,
    phase: 'Phase 1',
    simulations: 8
  },
  {
    id: 'ytytyt',
    name: 'ytytyt',
    description: 'YouTube analytics tool for content creators to optimize their video performance and audience engagement.',
    type: 'simulation',
    powered: 'ai-powered',
    date: 'Sep 14, 2025',
    progress: 91,
    phase: 'Phase 3',
    simulations: 25
  },
  {
    id: 'yco',
    name: 'yco',
    description: 'Youth career optimization platform connecting Gen Z talent with forward-thinking employers.',
    type: 'simulation',
    powered: 'ai-powered',
    date: 'Sep 14, 2025',
    progress: 27,
    phase: 'Phase 1',
    simulations: 5
  },
  {
    id: 'vapi',
    name: 'vapi',
    description: 'Voice API integration service for seamless audio communication in web applications.',
    type: 'simulation',
    powered: 'ai-powered',
    date: 'Sep 14, 2025',
    progress: 66,
    phase: 'Phase 2',
    simulations: 18
  },
  {
    id: 'yc',
    name: 'yc',
    description: 'Y Combinator startup evaluation system for assessing early-stage company potential.',
    type: 'simulation',
    powered: 'ai-powered',
    date: 'Sep 14, 2025',
    progress: 38,
    phase: 'Phase 1',
    simulations: 7
  }
];

const defaultState: AppState = {
  projects: defaultProjects,
  sessions: [
    {
      id: 'default-session',
      title: 'I want to create a fintech app for gen x in canada',
      createdAt: '2025-09-14T10:30:00Z',
      isCurrent: true,
      analysisInput: 'I want to create a fintech app for gen x in canada'
    }
  ],
  personas: defaultPersonas,
  feedback: [],
  currentMode: 'analysis',
  analysisPhase: 'input',
  deploymentProgress: 0,
  username: 'loganmann'
};

export function loadState(): AppState {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultState;
    }

    const parsed = JSON.parse(stored);
    
    // Validate version and structure
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, using default state');
      return defaultState;
    }

    // Merge with defaults to handle schema changes
    return {
      ...defaultState,
      ...parsed.data,
      // Ensure required arrays exist
      projects: parsed.data?.projects || defaultState.projects,
      sessions: parsed.data?.sessions || defaultState.sessions,
      personas: parsed.data?.personas || defaultState.personas,
      feedback: parsed.data?.feedback || defaultState.feedback,
    };
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const toStore = {
      version: STORAGE_VERSION,
      data: state,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear state from localStorage:', error);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(d);
}

// TTS Critique generator
export function generateCritique(persona: Persona, analysisInput: string): string {
  const critiques = {
    full: [
      `This is ${persona.name} speaking. I'm really excited about this ${analysisInput} concept. As someone in ${persona.industry}, I can see exactly how this would solve real problems we're facing. The market timing feels right, and I think you're onto something significant here.`,
      `Hi, ${persona.name} here from ${persona.location}. I have to say, this ${analysisInput} idea really resonates with me. In my experience as a ${persona.title}, I've seen the gap you're trying to fill. This could be a game-changer if executed well.`,
      `${persona.name} speaking. I'm genuinely impressed by this ${analysisInput} proposal. From my perspective in ${persona.industry}, this addresses a critical need. I'd be very interested in learning more about your implementation strategy.`
    ],
    partial: [
      `This is ${persona.name}. I have mixed feelings about this ${analysisInput} concept. While I see the potential, especially given my background in ${persona.industry}, I think there are some challenges you'll need to address. The idea has merit, but execution will be everything.`,
      `${persona.name} here. I'm cautiously optimistic about this ${analysisInput} idea. As a ${persona.title}, I can see both the opportunities and the risks. You're on the right track, but I'd want to see more details about your approach.`,
      `Hi, it's ${persona.name}. This ${analysisInput} concept is interesting, but I have some reservations. In my experience working in ${persona.industry}, similar ideas have faced significant hurdles. That said, your angle might be different enough to work.`
    ],
    negative: [
      `${persona.name} speaking. I have to be honest - I'm not convinced about this ${analysisInput} idea. Having worked in ${persona.industry} for years, I've seen similar concepts struggle. The market might not be as receptive as you think.`,
      `This is ${persona.name}. I appreciate the innovation behind this ${analysisInput} concept, but I have serious doubts about its viability. As a ${persona.title}, I've seen the challenges in this space. You might want to reconsider your approach.`,
      `${persona.name} here from ${persona.location}. While I admire the ambition of this ${analysisInput} project, I don't think it addresses the real needs in ${persona.industry}. The concept feels disconnected from market realities.`
    ]
  };

  const reactionCritiques = critiques[persona.reaction] || critiques.partial;
  return reactionCritiques[Math.floor(Math.random() * reactionCritiques.length)];
}
