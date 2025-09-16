export interface Influencer {
  id: string;
  name: string;
  college: string;
  schoolId: string; // Reference to school in schools.json
  year: string;
  orgs: Array<{
    org: string;
    role: string;
  }>;
  socials: Array<{
    platform: string;
    handle: string;
    followers: number;
  }>;
  interests: string[];
  lat: number;
  lng: number;
  engagement: 'high' | 'medium' | 'low';
  fitScore: number; // 0-100
  explanation: string;
  examplePosts: Array<{
    id: string;
    mediaUrl: string;
    platform: string;
    baseViews: number;
    baseConversions: number;
    targetViews: number;
    targetConversions: number;
    description: string;
  }>;
}

// Generate placeholder image URLs based on platform and content type
const generatePostImageUrl = (platform: string, contentType: string, seed: number): string => {
  const size = platform === 'TikTok' ? '400x600' : '600x600';
  const colors = [
    'ff6b6b,4ecdc4', // coral & teal
    'a8e6cf,ffd93d', // mint & yellow
    'ff8b94,b4a7d6', // pink & lavender
    '87ceeb,ffa07a', // sky blue & salmon
    '98d8c8,f7dc6f', // seafoam & light gold
    'dda0dd,87cefa', // plum & light sky blue
  ];
  const colorPair = colors[seed % colors.length];
  
  return `https://via.placeholder.com/${size}/${colorPair}/ffffff?text=${encodeURIComponent(contentType)}`;
};

export const influencers: Influencer[] = [
  {
    id: "inf-001",
    name: "Maya Patel",
    college: "Stanford University",
    schoolId: "stanford",
    year: "Junior",
    orgs: [
      { org: "Stanford Fashion Society", role: "President" },
      { org: "Delta Gamma", role: "Social Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@mayastyle", followers: 15200 },
      { platform: "Instagram", handle: "@maya.fits", followers: 8900 },
      { platform: "LinkedIn", handle: "maya-patel-stanford", followers: 1200 }
    ],
    interests: ["Fashion", "Tech", "Sustainability"],
    lat: 37.4419,
    lng: -122.1430,
    engagement: "high",
    fitScore: 94,
    explanation: "Top fashion influencer with strong tech background - perfect for tech-fashion crossover brands targeting aspirational college market.",
    examplePosts: [
      {
        id: "tiktok-1",
        mediaUrl: generatePostImageUrl("TikTok", "Fashion+Haul", 1),
        platform: "TikTok",
        baseViews: 8500,
        baseConversions: 127,
        targetViews: 25000,
        targetConversions: 380,
        description: "Fashion try-on haul with sustainable brands"
      },
      {
        id: "instagram-1", 
        mediaUrl: generatePostImageUrl("Instagram", "OOTD+Post", 1),
        platform: "Instagram",
        baseViews: 4200,
        baseConversions: 84,
        targetViews: 12000,
        targetConversions: 245,
        description: "Outfit of the day featuring eco-friendly accessories"
      }
    ]
  },
  {
    id: "inf-002",
    name: "Jake Thompson",
    college: "University of Michigan",
    schoolId: "umich",
    year: "Senior",
    orgs: [
      { org: "Michigan Football", role: "Starting QB" },
      { org: "Student Athletes Advisory Committee", role: "Vice President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@jakethrows", followers: 28500 },
      { platform: "Instagram", handle: "@jthompson_qb", followers: 22100 },
      { platform: "LinkedIn", handle: "jake-thompson-umich", followers: 3400 }
    ],
    interests: ["Football", "Fitness", "Business"],
    lat: 42.2808,
    lng: -83.7430,
    engagement: "high",
    fitScore: 91,
    explanation: "High-profile college athlete with massive reach - ideal for sports, fitness, and lifestyle brands targeting competitive college demographic.",
    examplePosts: [
      {
        id: "tiktok-2",
        mediaUrl: generatePostImageUrl("TikTok", "Workout+Tips", 2),
        platform: "TikTok",
        baseViews: 15200,
        baseConversions: 304,
        targetViews: 45000,
        targetConversions: 900,
        description: "Pre-game workout routine and nutrition tips"
      },
      {
        id: "instagram-2",
        mediaUrl: generatePostImageUrl("Instagram", "Game+Day", 2),
        platform: "Instagram", 
        baseViews: 9800,
        baseConversions: 196,
        targetViews: 28000,
        targetConversions: 560,
        description: "Game day preparation and mindset"
      }
    ]
  },
  {
    id: "inf-003",
    name: "Isabella Martinez",
    college: "University of Miami",
    schoolId: "umiami",
    year: "Junior",
    orgs: [
      { org: "Alpha Chi Omega", role: "President" },
      { org: "Miami Fashion Society", role: "Creative Director" }
    ],
    socials: [
      { platform: "TikTok", handle: "@bellamiami", followers: 19200 },
      { platform: "Instagram", handle: "@bella.martinez", followers: 24600 },
      { platform: "Pinterest", handle: "BellaMiamiFashion", followers: 7800 }
    ],
    interests: ["Fashion", "Beauty", "Miami Lifestyle", "Greek Life"],
    lat: 25.7617,
    lng: -80.1918,
    engagement: "high",
    fitScore: 95,
    explanation: "Top fashion influencer with Miami aesthetic - ideal for luxury fashion, beauty, swimwear, and lifestyle brands targeting aspirational college market.",
    examplePosts: [
      {
        id: "tiktok-3",
        mediaUrl: generatePostImageUrl("TikTok", "Miami+Style", 3),
        platform: "TikTok",
        baseViews: 12800,
        baseConversions: 256,
        targetViews: 38000,
        targetConversions: 760,
        description: "Miami summer fashion essentials and styling tips"
      },
      {
        id: "instagram-3",
        mediaUrl: generatePostImageUrl("Instagram", "Beach+Vibes", 3),
        platform: "Instagram",
        baseViews: 11500,
        baseConversions: 345,
        targetViews: 32000,
        targetConversions: 960,
        description: "Beach day outfit and lifestyle content"
      }
    ]
  },
  {
    id: "inf-004", 
    name: "Alex Chen",
    college: "MIT",
    schoolId: "mit",
    year: "Graduate Student",
    orgs: [
      { org: "MIT Entrepreneurship Club", role: "President" },
      { org: "Computer Science Graduate Association", role: "Treasurer" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "alex-chen-mit", followers: 8900 },
      { platform: "TikTok", handle: "@alexcodes", followers: 6700 },
      { platform: "Twitter", handle: "@alexchen_dev", followers: 4200 }
    ],
    interests: ["Technology", "Entrepreneurship", "AI/ML", "Productivity"],
    lat: 42.3601,
    lng: -71.0942,
    engagement: "medium",
    fitScore: 89,
    explanation: "Tech thought leader with strong professional network - perfect for B2B SaaS, productivity tools, and tech education targeting ambitious students.",
    examplePosts: [
      {
        id: "linkedin-1",
        mediaUrl: generatePostImageUrl("LinkedIn", "Tech+Insights", 4),
        platform: "LinkedIn",
        baseViews: 3200,
        baseConversions: 128,
        targetViews: 8500,
        targetConversions: 340,
        description: "Latest trends in AI and machine learning for students"
      },
      {
        id: "tiktok-4",
        mediaUrl: generatePostImageUrl("TikTok", "Coding+Tips", 4),
        platform: "TikTok",
        baseViews: 5400,
        baseConversions: 81,
        targetViews: 15000,
        targetConversions: 225,
        description: "Quick coding tips and productivity hacks"
      }
    ]
  },
  {
    id: "inf-005",
    name: "Emma Johnson",
    college: "UCLA",
    schoolId: "ucla",
    year: "Sophomore",
    orgs: [
      { org: "UCLA Dance Team", role: "Captain" },
      { org: "Kappa Alpha Theta", role: "Philanthropy Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@emmadances", followers: 23400 },
      { platform: "Instagram", handle: "@emma.johnson", followers: 16800 },
      { platform: "YouTube", handle: "EmmaJDance", followers: 5200 }
    ],
    interests: ["Dance", "Fitness", "UCLA Spirit", "Greek Life"],
    lat: 34.0689,
    lng: -118.4452,
    engagement: "high",
    fitScore: 88,
    explanation: "High-energy dance content creator with strong UCLA presence - ideal for fitness, activewear, and lifestyle brands targeting energetic college demographic.",
    examplePosts: [
      {
        id: "tiktok-5",
        mediaUrl: generatePostImageUrl("TikTok", "Dance+Routine", 5),
        platform: "TikTok",
        baseViews: 18600,
        baseConversions: 279,
        targetViews: 52000,
        targetConversions: 780,
        description: "Trending dance routine with workout elements"
      },
      {
        id: "instagram-4",
        mediaUrl: generatePostImageUrl("Instagram", "Fitness+Inspo", 5),
        platform: "Instagram",
        baseViews: 7200,
        baseConversions: 144,
        targetViews: 20000,
        targetConversions: 400,
        description: "Daily fitness motivation and dance practice"
      }
    ]
  },
  {
    id: "inf-006",
    name: "Ryan O'Connor",
    college: "Boston University",
    schoolId: "harvard",
    year: "Senior",
    orgs: [
      { org: "BU Hockey Team", role: "Alternate Captain" },
      { org: "Student Government", role: "Athletics Representative" }
    ],
    socials: [
      { platform: "TikTok", handle: "@ryanhockey", followers: 12100 },
      { platform: "Instagram", handle: "@roconnor_hockey", followers: 9800 },
      { platform: "LinkedIn", handle: "ryan-oconnor-bu", followers: 2100 }
    ],
    interests: ["Hockey", "Boston Sports", "Business", "Leadership"],
    lat: 42.3505,
    lng: -71.1054,
    engagement: "medium",
    fitScore: 85,
    explanation: "Boston sports culture ambassador with leadership experience - great for sports equipment, energy drinks, and professional development brands.",
    examplePosts: [
      {
        id: "tiktok-6",
        mediaUrl: generatePostImageUrl("TikTok", "Hockey+Skills", 6),
        platform: "TikTok",
        baseViews: 8900,
        baseConversions: 133,
        targetViews: 24000,
        targetConversions: 360,
        description: "Hockey training techniques and game highlights"
      },
      {
        id: "instagram-5",
        mediaUrl: generatePostImageUrl("Instagram", "Team+Spirit", 6),
        platform: "Instagram",
        baseViews: 4100,
        baseConversions: 82,
        targetViews: 11500,
        targetConversions: 230,
        description: "Team bonding and Boston sports culture"
      }
    ]
  },
  {
    id: "inf-007",
    name: "Sofia Rodriguez",
    college: "University of Texas at Austin",
    schoolId: "utaustin",
    year: "Junior",
    orgs: [
      { org: "UT Film Society", role: "Creative Director" },
      { org: "Hispanic Business Student Association", role: "Vice President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@sofiafilms", followers: 14700 },
      { platform: "Instagram", handle: "@sofia.creates", followers: 11200 },
      { platform: "YouTube", handle: "SofiaCreates", followers: 3800 }
    ],
    interests: ["Film", "Creative Content", "Austin Culture", "Business"],
    lat: 30.2849,
    lng: -97.7341,
    engagement: "high",
    fitScore: 87,
    explanation: "Creative content specialist with strong Austin/Texas following - perfect for creative tools, tech products, and lifestyle brands targeting artistic students.",
    examplePosts: [
      {
        id: "tiktok-7",
        mediaUrl: generatePostImageUrl("TikTok", "Film+Tips", 7),
        platform: "TikTok",
        baseViews: 9600,
        baseConversions: 192,
        targetViews: 27000,
        targetConversions: 540,
        description: "Behind-the-scenes filmmaking tips and Austin spots"
      },
      {
        id: "instagram-6",
        mediaUrl: generatePostImageUrl("Instagram", "Austin+Vibes", 7),
        platform: "Instagram",
        baseViews: 5800,
        baseConversions: 116,
        targetViews: 16000,
        targetConversions: 320,
        description: "Austin lifestyle and creative project updates"
      }
    ]
  },
  {
    id: "inf-008",
    name: "Marcus Williams",
    college: "Duke University",
    schoolId: "duke",
    year: "Senior",
    orgs: [
      { org: "Duke Basketball", role: "Starting Forward" },
      { org: "Black Student Alliance", role: "President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@marcushoops", followers: 31200 },
      { platform: "Instagram", handle: "@mwilliams_duke", followers: 27400 },
      { platform: "LinkedIn", handle: "marcus-williams-duke", followers: 4100 }
    ],
    interests: ["Basketball", "Leadership", "Social Justice", "Business"],
    lat: 36.0014,
    lng: -78.9382,
    engagement: "high",
    fitScore: 93,
    explanation: "High-profile Duke basketball player with strong social presence - ideal for athletic brands, leadership development, and social impact companies.",
    examplePosts: [
      {
        id: "tiktok-8",
        mediaUrl: generatePostImageUrl("TikTok", "Basketball+Training", 8),
        platform: "TikTok",
        baseViews: 22100,
        baseConversions: 442,
        targetViews: 62000,
        targetConversions: 1240,
        description: "Elite basketball training and mindset content"
      },
      {
        id: "instagram-7",
        mediaUrl: generatePostImageUrl("Instagram", "Duke+Pride", 8),
        platform: "Instagram",
        baseViews: 13500,
        baseConversions: 405,
        targetViews: 38000,
        targetConversions: 1140,
        description: "Duke basketball highlights and campus life"
      }
    ]
  },
  {
    id: "inf-009",
    name: "Zoe Kim",
    college: "Northwestern University",
    schoolId: "northwestern",
    year: "Junior",
    orgs: [
      { org: "Northwestern Business Review", role: "Editor-in-Chief" },
      { org: "Kappa Kappa Gamma", role: "Treasurer" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "zoe-kim-northwestern", followers: 6800 },
      { platform: "TikTok", handle: "@zoetalks", followers: 9400 },
      { platform: "Medium", handle: "@zoekim_nu", followers: 2100 }
    ],
    interests: ["Business", "Finance", "Writing", "Consulting"],
    lat: 42.0565,
    lng: -87.6753,
    engagement: "medium",
    fitScore: 86,
    explanation: "Business-focused thought leader with strong professional network - excellent for B2B services, financial products, and career development platforms.",
    examplePosts: [
      {
        id: "linkedin-2",
        mediaUrl: generatePostImageUrl("LinkedIn", "Business+Insights", 9),
        platform: "LinkedIn",
        baseViews: 4200,
        baseConversions: 168,
        targetViews: 11000,
        targetConversions: 440,
        description: "Career advice and business insights for students"
      },
      {
        id: "tiktok-9",
        mediaUrl: generatePostImageUrl("TikTok", "Finance+Tips", 9),
        platform: "TikTok",
        baseViews: 6300,
        baseConversions: 94,
        targetViews: 17500,
        targetConversions: 262,
        description: "Personal finance tips for college students"
      }
    ]
  },
  {
    id: "inf-010",
    name: "Tyler Brooks",
    college: "University of Georgia",
    schoolId: "uga",
    year: "Senior",
    orgs: [
      { org: "UGA Football", role: "Defensive End" },
      { org: "Fellowship of Christian Athletes", role: "Chapter President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@tylerbrooks", followers: 18900 },
      { platform: "Instagram", handle: "@tbrooks_uga", followers: 15600 },
      { platform: "Twitter", handle: "@TylerBrooksUGA", followers: 8200 }
    ],
    interests: ["Football", "Faith", "Southern Culture", "Community Service"],
    lat: 33.9480,
    lng: -83.3773,
    engagement: "high",
    fitScore: 84,
    explanation: "Southern football culture ambassador with strong community ties - great for athletic brands, Southern lifestyle, and faith-based organizations.",
    examplePosts: [
      {
        id: "tiktok-10",
        mediaUrl: generatePostImageUrl("TikTok", "Football+Life", 10),
        platform: "TikTok",
        baseViews: 11800,
        baseConversions: 177,
        targetViews: 33000,
        targetConversions: 495,
        description: "SEC football culture and training insights"
      },
      {
        id: "instagram-8",
        mediaUrl: generatePostImageUrl("Instagram", "UGA+Spirit", 10),
        platform: "Instagram",
        baseViews: 6900,
        baseConversions: 138,
        targetViews: 19000,
        targetConversions: 380,
        description: "UGA gameday experience and team culture"
      }
    ]
  },
  {
    id: "inf-011",
    name: "Lily Anderson",
    college: "Vanderbilt University",
    schoolId: "vanderbilt",
    year: "Sophomore",
    orgs: [
      { org: "Vanderbilt Student Government", role: "Freshman Class President" },
      { org: "Chi Omega", role: "New Member Coordinator" }
    ],
    socials: [
      { platform: "TikTok", handle: "@lilyvandy", followers: 13500 },
      { platform: "Instagram", handle: "@lily.anderson", followers: 10700 },
      { platform: "LinkedIn", handle: "lily-anderson-vanderbilt", followers: 1800 }
    ],
    interests: ["Politics", "Southern Culture", "Leadership", "Greek Life"],
    lat: 36.1447,
    lng: -86.8027,
    engagement: "medium",
    fitScore: 82,
    explanation: "Rising political leader with strong Southern campus influence - ideal for professional development, political organizations, and Southern lifestyle brands.",
    examplePosts: [
      {
        id: "tiktok-11",
        mediaUrl: generatePostImageUrl("TikTok", "Campus+Politics", 11),
        platform: "TikTok",
        baseViews: 7400,
        baseConversions: 111,
        targetViews: 20500,
        targetConversions: 307,
        description: "Student government insights and campus leadership"
      },
      {
        id: "instagram-9",
        mediaUrl: generatePostImageUrl("Instagram", "Vandy+Life", 11),
        platform: "Instagram",
        baseViews: 4800,
        baseConversions: 96,
        targetViews: 13500,
        targetConversions: 270,
        description: "Vanderbilt campus culture and Greek life"
      }
    ]
  },
  {
    id: "inf-012",
    name: "David Park",
    college: "UC Berkeley",
    schoolId: "berkeley",
    year: "Graduate Student",
    orgs: [
      { org: "Berkeley Tech Entrepreneurs", role: "Co-Founder" },
      { org: "Korean American Student Association", role: "Alumni Relations Chair" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "david-park-berkeley", followers: 7200 },
      { platform: "TikTok", handle: "@davidbuilds", followers: 8100 },
      { platform: "YouTube", handle: "DavidBuilds", followers: 2900 }
    ],
    interests: ["Entrepreneurship", "Technology", "Startups", "Bay Area Culture"],
    lat: 37.8719,
    lng: -122.2585,
    engagement: "high",
    fitScore: 90,
    explanation: "Silicon Valley entrepreneur with strong tech network - perfect for B2B SaaS, startup tools, and entrepreneurship education targeting ambitious students.",
    examplePosts: [
      {
        id: "linkedin-3",
        mediaUrl: generatePostImageUrl("LinkedIn", "Startup+Journey", 12),
        platform: "LinkedIn",
        baseViews: 5100,
        baseConversions: 204,
        targetViews: 14000,
        targetConversions: 560,
        description: "Startup journey and entrepreneurship lessons"
      },
      {
        id: "tiktok-12",
        mediaUrl: generatePostImageUrl("TikTok", "Tech+Entrepreneur", 12),
        platform: "TikTok",
        baseViews: 6800,
        baseConversions: 102,
        targetViews: 19000,
        targetConversions: 285,
        description: "Day in the life of a student entrepreneur"
      }
    ]
  },
  {
    id: "inf-013",
    name: "Ashley Thompson",
    college: "University of Alabama",
    schoolId: "uga",
    year: "Junior",
    orgs: [
      { org: "Alabama Crimson Tide Cheerleading", role: "Co-Captain" },
      { org: "Alpha Delta Pi", role: "Social Media Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@ashleycheers", followers: 21600 },
      { platform: "Instagram", handle: "@ashley.thompson", followers: 18900 },
      { platform: "Pinterest", handle: "AshleyBamaStyle", followers: 5400 }
    ],
    interests: ["Cheerleading", "Alabama Football", "Southern Fashion", "Greek Life"],
    lat: 32.6098,
    lng: -87.5692,
    engagement: "high",
    fitScore: 88,
    explanation: "High-visibility Alabama cheerleader with strong SEC following - excellent for athletic wear, Southern lifestyle brands, and college sports merchandise.",
    examplePosts: [
      {
        id: "tiktok-13",
        mediaUrl: generatePostImageUrl("TikTok", "Cheer+Routine", 13),
        platform: "TikTok",
        baseViews: 16200,
        baseConversions: 243,
        targetViews: 45000,
        targetConversions: 675,
        description: "Game day cheer routines and team spirit"
      },
      {
        id: "instagram-10",
        mediaUrl: generatePostImageUrl("Instagram", "Game+Day+Style", 13),
        platform: "Instagram",
        baseViews: 8700,
        baseConversions: 174,
        targetViews: 24000,
        targetConversions: 480,
        description: "Game day outfits and Alabama traditions"
      }
    ]
  },
  {
    id: "inf-014",
    name: "Carlos Mendoza",
    college: "University of Southern California",
    schoolId: "usc",
    year: "Senior",
    orgs: [
      { org: "USC Film School", role: "Student Advisory Board" },
      { org: "Latino Student Assembly", role: "Cultural Events Coordinator" }
    ],
    socials: [
      { platform: "TikTok", handle: "@carlosfilms", followers: 16800 },
      { platform: "Instagram", handle: "@carlos.mendoza", followers: 12400 },
      { platform: "YouTube", handle: "CarlosMendozaFilms", followers: 4600 }
    ],
    interests: ["Film", "Los Angeles Culture", "Creative Arts", "Latino Culture"],
    lat: 34.0224,
    lng: -118.2851,
    engagement: "high",
    fitScore: 89,
    explanation: "Hollywood-adjacent content creator with strong LA presence - ideal for creative software, entertainment brands, and multicultural lifestyle companies.",
    examplePosts: [
      {
        id: "tiktok-14",
        mediaUrl: generatePostImageUrl("TikTok", "LA+Film+Life", 14),
        platform: "TikTok",
        baseViews: 12100,
        baseConversions: 181,
        targetViews: 34000,
        targetConversions: 510,
        description: "Behind the scenes of USC film projects and LA culture"
      },
      {
        id: "instagram-11",
        mediaUrl: generatePostImageUrl("Instagram", "USC+Creative", 14),
        platform: "Instagram",
        baseViews: 5900,
        baseConversions: 118,
        targetViews: 16500,
        targetConversions: 330,
        description: "Creative projects and USC film school life"
      }
    ]
  },
  {
    id: "inf-015",
    name: "Grace Liu",
    college: "Harvard University",
    schoolId: "harvard",
    year: "Junior",
    orgs: [
      { org: "Harvard Business Review Student Contributors", role: "Lead Writer" },
      { org: "Harvard Undergraduate Women in Business", role: "President" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "grace-liu-harvard", followers: 9600 },
      { platform: "TikTok", handle: "@gracethinks", followers: 11200 },
      { platform: "Medium", handle: "@graceliu_harvard", followers: 3400 }
    ],
    interests: ["Business Strategy", "Women in Leadership", "Academia", "Consulting"],
    lat: 42.3770,
    lng: -71.1167,
    engagement: "high",
    fitScore: 92,
    explanation: "Harvard business thought leader with strong professional presence - perfect for B2B services, professional development, and women-focused brands.",
    examplePosts: [
      {
        id: "linkedin-4",
        mediaUrl: generatePostImageUrl("LinkedIn", "Harvard+Business", 15),
        platform: "LinkedIn",
        baseViews: 6200,
        baseConversions: 248,
        targetViews: 17000,
        targetConversions: 680,
        description: "Business strategy insights from Harvard case studies"
      },
      {
        id: "tiktok-15",
        mediaUrl: generatePostImageUrl("TikTok", "Harvard+Life", 15),
        platform: "TikTok",
        baseViews: 8400,
        baseConversions: 126,
        targetViews: 23500,
        targetConversions: 352,
        description: "Day in the life at Harvard Business School"
      }
    ]
  },
  {
    id: "inf-016",
    name: "Jordan Miller",
    college: "University of Wisconsin-Madison",
    schoolId: "umich",
    year: "Senior",
    orgs: [
      { org: "Wisconsin Badgers Football", role: "Linebacker" },
      { org: "Student Athlete Advisory Committee", role: "Secretary" }
    ],
    socials: [
      { platform: "TikTok", handle: "@jordanfootball", followers: 14300 },
      { platform: "Instagram", handle: "@jmiller_wisc", followers: 11800 },
      { platform: "LinkedIn", handle: "jordan-miller-wisconsin", followers: 2600 }
    ],
    interests: ["Football", "Midwest Culture", "Fitness", "Agricultural Business"],
    lat: 43.0731,
    lng: -89.4012,
    engagement: "medium",
    fitScore: 83,
    explanation: "Midwest football culture representative with strong Wisconsin following - great for athletic brands, Midwest lifestyle, and agricultural products.",
    examplePosts: [
      {
        id: "tiktok-16",
        mediaUrl: generatePostImageUrl("TikTok", "Badger+Football", 16),
        platform: "TikTok",
        baseViews: 9700,
        baseConversions: 145,
        targetViews: 27000,
        targetConversions: 405,
        description: "Big Ten football training and Wisconsin traditions"
      },
      {
        id: "instagram-12",
        mediaUrl: generatePostImageUrl("Instagram", "Wisconsin+Pride", 16),
        platform: "Instagram",
        baseViews: 5200,
        baseConversions: 104,
        targetViews: 14500,
        targetConversions: 290,
        description: "Wisconsin gameday experience and team culture"
      }
    ]
  },
  {
    id: "inf-017",
    name: "Samantha Davis",
    college: "New York University",
    schoolId: "nyu",
    year: "Sophomore",
    orgs: [
      { org: "NYU Fashion Business Society", role: "Marketing Director" },
      { org: "Washington Square News", role: "Style Columnist" }
    ],
    socials: [
      { platform: "TikTok", handle: "@samnyc", followers: 17200 },
      { platform: "Instagram", handle: "@sam.davis", followers: 13600 },
      { platform: "Pinterest", handle: "SamNYCStyle", followers: 6100 }
    ],
    interests: ["NYC Fashion", "Street Style", "Media", "Urban Culture"],
    lat: 40.7295,
    lng: -73.9965,
    engagement: "high",
    fitScore: 90,
    explanation: "NYC fashion scene insider with strong urban influence - ideal for fashion brands, lifestyle products, and NYC-focused companies targeting trend-conscious students.",
    examplePosts: [
      {
        id: "tiktok-17",
        mediaUrl: generatePostImageUrl("TikTok", "NYC+Fashion", 17),
        platform: "TikTok",
        baseViews: 13800,
        baseConversions: 207,
        targetViews: 38500,
        targetConversions: 577,
        description: "NYC street style and fashion week insights"
      },
      {
        id: "instagram-13",
        mediaUrl: generatePostImageUrl("Instagram", "NYC+Lifestyle", 17),
        platform: "Instagram",
        baseViews: 7100,
        baseConversions: 142,
        targetViews: 19800,
        targetConversions: 396,
        description: "NYC lifestyle and fashion inspiration"
      }
    ]
  },
  {
    id: "inf-018",
    name: "Kevin Wang",
    college: "Carnegie Mellon University",
    schoolId: "upenn",
    year: "Junior",
    orgs: [
      { org: "CMU Robotics Club", role: "Project Lead" },
      { org: "Asian Students Association", role: "Technical Director" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "kevin-wang-cmu", followers: 5800 },
      { platform: "TikTok", handle: "@kevinbuilds", followers: 7900 },
      { platform: "GitHub", handle: "kwang-cmu", followers: 1200 }
    ],
    interests: ["Robotics", "AI/ML", "Engineering", "Pittsburgh Tech Scene"],
    lat: 40.4433,
    lng: -79.9436,
    engagement: "medium",
    fitScore: 87,
    explanation: "Robotics engineer with strong tech credibility - excellent for technical products, engineering tools, and STEM education targeting technically-minded students.",
    examplePosts: [
      {
        id: "linkedin-5",
        mediaUrl: generatePostImageUrl("LinkedIn", "Robotics+Engineering", 18),
        platform: "LinkedIn",
        baseViews: 3800,
        baseConversions: 152,
        targetViews: 10500,
        targetConversions: 420,
        description: "Latest robotics projects and engineering insights"
      },
      {
        id: "tiktok-18",
        mediaUrl: generatePostImageUrl("TikTok", "Robot+Builds", 18),
        platform: "TikTok",
        baseViews: 5600,
        baseConversions: 84,
        targetViews: 15600,
        targetConversions: 234,
        description: "Cool robotics projects and tech demonstrations"
      }
    ]
  },
  {
    id: "inf-019",
    name: "Madison Taylor",
    college: "University of North Carolina at Chapel Hill",
    schoolId: "duke",
    year: "Junior",
    orgs: [
      { org: "UNC Women's Soccer", role: "Team Captain" },
      { org: "Pi Beta Phi", role: "VP of Community Relations" }
    ],
    socials: [
      { platform: "TikTok", handle: "@madisonsoccer", followers: 16400 },
      { platform: "Instagram", handle: "@madison.taylor", followers: 14200 },
      { platform: "LinkedIn", handle: "madison-taylor-unc", followers: 2800 }
    ],
    interests: ["Soccer", "Sports Medicine", "Southern Culture", "Community Service"],
    lat: 35.9049,
    lng: -79.0469,
    engagement: "high",
    fitScore: 86,
    explanation: "Elite women's soccer player with strong UNC and Southern following - ideal for women's athletic wear, sports nutrition, and health/wellness brands.",
    examplePosts: [
      {
        id: "tiktok-19",
        mediaUrl: generatePostImageUrl("TikTok", "Soccer+Training", 19),
        platform: "TikTok",
        baseViews: 11900,
        baseConversions: 178,
        targetViews: 33000,
        targetConversions: 495,
        description: "Elite soccer training tips and team highlights"
      },
      {
        id: "instagram-14",
        mediaUrl: generatePostImageUrl("Instagram", "UNC+Soccer", 19),
        platform: "Instagram",
        baseViews: 6800,
        baseConversions: 136,
        targetViews: 19000,
        targetConversions: 380,
        description: "UNC soccer team culture and game highlights"
      }
    ]
  },
  {
    id: "inf-020",
    name: "Ethan Rodriguez",
    college: "University of Florida",
    schoolId: "uf",
    year: "Senior",
    orgs: [
      { org: "UF Student Government", role: "Senate Pro Tempore" },
      { org: "Sigma Chi", role: "Public Relations Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@ethanflorida", followers: 12800 },
      { platform: "Instagram", handle: "@ethan.rodriguez", followers: 9600 },
      { platform: "LinkedIn", handle: "ethan-rodriguez-uf", followers: 3200 }
    ],
    interests: ["Politics", "Florida Culture", "Greek Life", "Public Policy"],
    lat: 29.6436,
    lng: -82.3549,
    engagement: "medium",
    fitScore: 84,
    explanation: "Student government leader with strong Florida presence - great for political organizations, Florida lifestyle brands, and leadership development programs.",
    examplePosts: [
      {
        id: "tiktok-20",
        mediaUrl: generatePostImageUrl("TikTok", "Student+Politics", 20),
        platform: "TikTok",
        baseViews: 8200,
        baseConversions: 123,
        targetViews: 23000,
        targetConversions: 345,
        description: "Student government insights and Florida campus life"
      },
      {
        id: "instagram-15",
        mediaUrl: generatePostImageUrl("Instagram", "Florida+Life", 20),
        platform: "Instagram",
        baseViews: 4300,
        baseConversions: 86,
        targetViews: 12000,
        targetConversions: 240,
        description: "Florida campus culture and political engagement"
      }
    ]
  },
  {
    id: "inf-021",
    name: "Chloe Brown",
    college: "University of Washington",
    schoolId: "washington",
    year: "Sophomore",
    orgs: [
      { org: "UW Environmental Club", role: "President" },
      { org: "Kappa Delta", role: "Sustainability Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@chloeecolife", followers: 15700 },
      { platform: "Instagram", handle: "@chloe.brown", followers: 12100 },
      { platform: "YouTube", handle: "ChloeEcoLife", followers: 3600 }
    ],
    interests: ["Environmental Activism", "Sustainability", "Pacific Northwest", "Outdoor Activities"],
    lat: 47.6553,
    lng: -122.3035,
    engagement: "high",
    fitScore: 91,
    explanation: "Environmental activist with strong sustainability focus - perfect for eco-friendly brands, outdoor gear, and sustainable lifestyle products targeting conscious consumers.",
    examplePosts: [
      {
        id: "tiktok-21",
        mediaUrl: generatePostImageUrl("TikTok", "Eco+Tips", 21),
        platform: "TikTok",
        baseViews: 12600,
        baseConversions: 252,
        targetViews: 35000,
        targetConversions: 700,
        description: "Sustainable living tips and environmental activism"
      },
      {
        id: "instagram-16",
        mediaUrl: generatePostImageUrl("Instagram", "PNW+Nature", 21),
        platform: "Instagram",
        baseViews: 7800,
        baseConversions: 156,
        targetViews: 21500,
        targetConversions: 430,
        description: "Pacific Northwest nature and eco-friendly lifestyle"
      }
    ]
  },
  {
    id: "inf-022",
    name: "Anthony Martinez",
    college: "Arizona State University",
    schoolId: "asu",
    year: "Junior",
    orgs: [
      { org: "ASU Entrepreneurship Society", role: "Vice President" },
      { org: "Latino Business Student Association", role: "Marketing Director" }
    ],
    socials: [
      { platform: "TikTok", handle: "@anthonyasu", followers: 11400 },
      { platform: "Instagram", handle: "@anthony.martinez", followers: 8900 },
      { platform: "LinkedIn", handle: "anthony-martinez-asu", followers: 4100 }
    ],
    interests: ["Entrepreneurship", "Desert Lifestyle", "Business", "Fitness"],
    lat: 33.4255,
    lng: -111.9400,
    engagement: "medium",
    fitScore: 85,
    explanation: "Southwest entrepreneur with strong ASU presence - ideal for business tools, Arizona lifestyle brands, and entrepreneurship education targeting ambitious students.",
    examplePosts: [
      {
        id: "tiktok-22",
        mediaUrl: generatePostImageUrl("TikTok", "ASU+Entrepreneur", 22),
        platform: "TikTok",
        baseViews: 7600,
        baseConversions: 114,
        targetViews: 21000,
        targetConversions: 315,
        description: "Student entrepreneur journey and ASU life"
      },
      {
        id: "instagram-17",
        mediaUrl: generatePostImageUrl("Instagram", "Arizona+Life", 22),
        platform: "Instagram",
        baseViews: 4600,
        baseConversions: 92,
        targetViews: 12800,
        targetConversions: 256,
        description: "Arizona lifestyle and business networking"
      }
    ]
  },
  {
    id: "inf-023",
    name: "Natalie Green",
    college: "University of Virginia",
    schoolId: "virginia",
    year: "Senior",
    orgs: [
      { org: "UVA Honor Committee", role: "Vice Chair" },
      { org: "Delta Delta Delta", role: "Chapter President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@nataliegreen", followers: 14900 },
      { platform: "Instagram", handle: "@natalie.green", followers: 17200 },
      { platform: "LinkedIn", handle: "natalie-green-uva", followers: 3800 }
    ],
    interests: ["Honor Code", "Southern Traditions", "Greek Life", "Law"],
    lat: 38.0336,
    lng: -78.5080,
    engagement: "high",
    fitScore: 88,
    explanation: "UVA tradition bearer with strong honor/leadership presence - excellent for professional services, Southern lifestyle brands, and leadership development programs.",
    examplePosts: [
      {
        id: "tiktok-23",
        mediaUrl: generatePostImageUrl("TikTok", "UVA+Traditions", 23),
        platform: "TikTok",
        baseViews: 10200,
        baseConversions: 153,
        targetViews: 28500,
        targetConversions: 427,
        description: "UVA traditions and honor system insights"
      },
      {
        id: "instagram-18",
        mediaUrl: generatePostImageUrl("Instagram", "Southern+Grace", 23),
        platform: "Instagram",
        baseViews: 8100,
        baseConversions: 162,
        targetViews: 22500,
        targetConversions: 450,
        description: "Southern traditions and UVA campus culture"
      }
    ]
  },
  {
    id: "inf-024",
    name: "Brandon Lee",
    college: "University of Colorado Boulder",
    schoolId: "colorado",
    year: "Junior",
    orgs: [
      { org: "CU Ski and Snowboard Club", role: "President" },
      { org: "Environmental Design Student Government", role: "Representative" }
    ],
    socials: [
      { platform: "TikTok", handle: "@brandonskis", followers: 13100 },
      { platform: "Instagram", handle: "@brandon.lee", followers: 16800 },
      { platform: "YouTube", handle: "BrandonSkirAdventures", followers: 4200 }
    ],
    interests: ["Skiing", "Snowboarding", "Mountain Life", "Outdoor Adventure"],
    lat: 40.0150,
    lng: -105.2705,
    engagement: "high",
    fitScore: 89,
    explanation: "Mountain sports influencer with strong outdoor community - perfect for outdoor gear, adventure brands, and Colorado lifestyle products targeting active students.",
    examplePosts: [
      {
        id: "tiktok-24",
        mediaUrl: generatePostImageUrl("TikTok", "Ski+Adventures", 24),
        platform: "TikTok",
        baseViews: 11700,
        baseConversions: 175,
        targetViews: 32500,
        targetConversions: 487,
        description: "Epic ski runs and mountain adventures"
      },
      {
        id: "instagram-19",
        mediaUrl: generatePostImageUrl("Instagram", "Colorado+Mountains", 24),
        platform: "Instagram",
        baseViews: 9200,
        baseConversions: 184,
        targetViews: 25500,
        targetConversions: 510,
        description: "Colorado mountain lifestyle and outdoor adventures"
      }
    ]
  },
  {
    id: "inf-025",
    name: "Jessica Wong",
    college: "University of California, Los Angeles",
    schoolId: "ucla",
    year: "Senior",
    orgs: [
      { org: "UCLA Pre-Med Society", role: "President" },
      { org: "Asian Pacific Coalition", role: "Health & Wellness Director" }
    ],
    socials: [
      { platform: "TikTok", handle: "@jessicamed", followers: 16200 },
      { platform: "Instagram", handle: "@jessica.wong", followers: 11800 },
      { platform: "LinkedIn", handle: "jessica-wong-ucla", followers: 5400 }
    ],
    interests: ["Pre-Med", "Health & Wellness", "Asian American Culture", "STEM"],
    lat: 34.0689,
    lng: -118.4452,
    engagement: "high",
    fitScore: 90,
    explanation: "Pre-med leader with strong health/wellness focus - ideal for health products, medical education, and wellness brands targeting academic high-achievers.",
    examplePosts: [
      {
        id: "tiktok-25",
        mediaUrl: generatePostImageUrl("TikTok", "PreMed+Life", 25),
        platform: "TikTok",
        baseViews: 12400,
        baseConversions: 186,
        targetViews: 34500,
        targetConversions: 517,
        description: "Pre-med study tips and medical school prep"
      },
      {
        id: "instagram-20",
        mediaUrl: generatePostImageUrl("Instagram", "Wellness+UCLA", 25),
        platform: "Instagram",
        baseViews: 6700,
        baseConversions: 134,
        targetViews: 18500,
        targetConversions: 370,
        description: "Health and wellness tips for busy students"
      }
    ]
  },
  {
    id: "inf-026",
    name: "Michael O'Brien",
    college: "University of Notre Dame",
    schoolId: "umich",
    year: "Senior",
    orgs: [
      { org: "Notre Dame Football", role: "Starting Center" },
      { org: "Student-Athlete Advisory Committee", role: "Chairman" }
    ],
    socials: [
      { platform: "TikTok", handle: "@mikeobrien", followers: 19800 },
      { platform: "Instagram", handle: "@mobrien_nd", followers: 15600 },
      { platform: "LinkedIn", handle: "michael-obrien-nd", followers: 3900 }
    ],
    interests: ["Football", "Catholic Faith", "Leadership", "Irish Traditions"],
    lat: 41.7001,
    lng: -86.2379,
    engagement: "high",
    fitScore: 87,
    explanation: "Notre Dame football captain with strong Catholic/traditional values - excellent for athletic brands, faith-based organizations, and traditional American values companies.",
    examplePosts: [
      {
        id: "tiktok-26",
        mediaUrl: generatePostImageUrl("TikTok", "ND+Football", 26),
        platform: "TikTok",
        baseViews: 14600,
        baseConversions: 219,
        targetViews: 40500,
        targetConversions: 607,
        description: "Notre Dame football tradition and team culture"
      },
      {
        id: "instagram-21",
        mediaUrl: generatePostImageUrl("Instagram", "Irish+Pride", 26),
        platform: "Instagram",
        baseViews: 8300,
        baseConversions: 166,
        targetViews: 23000,
        targetConversions: 460,
        description: "Fighting Irish pride and Catholic traditions"
      }
    ]
  },
  {
    id: "inf-027",
    name: "Rachel Stevens",
    college: "University of Pennsylvania",
    schoolId: "upenn",
    year: "Junior",
    orgs: [
      { org: "Wharton Undergraduate Finance Club", role: "VP of External Relations" },
      { org: "Alpha Phi", role: "Standards Board Chair" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "rachel-stevens-wharton", followers: 8700 },
      { platform: "TikTok", handle: "@rachelfinance", followers: 9800 },
      { platform: "Instagram", handle: "@rachel.stevens", followers: 7400 }
    ],
    interests: ["Finance", "Wall Street", "Business", "Philadelphia"],
    lat: 39.9526,
    lng: -75.1652,
    engagement: "high",
    fitScore: 93,
    explanation: "Wharton finance student with strong Wall Street connections - perfect for financial services, professional development, and business education targeting ambitious students.",
    examplePosts: [
      {
        id: "linkedin-6",
        mediaUrl: generatePostImageUrl("LinkedIn", "Wharton+Finance", 27),
        platform: "LinkedIn",
        baseViews: 5600,
        baseConversions: 224,
        targetViews: 15500,
        targetConversions: 620,
        description: "Finance industry insights from Wharton perspective"
      },
      {
        id: "tiktok-27",
        mediaUrl: generatePostImageUrl("TikTok", "Finance+Tips", 27),
        platform: "TikTok",
        baseViews: 7200,
        baseConversions: 108,
        targetViews: 20000,
        targetConversions: 300,
        description: "Finance and investment tips for students"
      }
    ]
  },
  {
    id: "inf-028",
    name: "Austin Clark",
    college: "Texas A&M University",
    schoolId: "utaustin",
    year: "Senior",
    orgs: [
      { org: "Corps of Cadets", role: "Company Commander" },
      { org: "Agricultural Economics Society", role: "President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@austinaggie", followers: 12700 },
      { platform: "Instagram", handle: "@austin.clark", followers: 10300 },
      { platform: "LinkedIn", handle: "austin-clark-tamu", followers: 4200 }
    ],
    interests: ["Military", "Agriculture", "Texas Culture", "Leadership"],
    lat: 30.6280,
    lng: -96.3344,
    engagement: "medium",
    fitScore: 86,
    explanation: "Military-style leader with strong Texas A&M tradition - ideal for military/tactical brands, agricultural products, and Texas lifestyle companies.",
    examplePosts: [
      {
        id: "tiktok-28",
        mediaUrl: generatePostImageUrl("TikTok", "Aggie+Traditions", 28),
        platform: "TikTok",
        baseViews: 8900,
        baseConversions: 133,
        targetViews: 24500,
        targetConversions: 367,
        description: "Texas A&M traditions and Corps of Cadets life"
      },
      {
        id: "instagram-22",
        mediaUrl: generatePostImageUrl("Instagram", "Texas+Pride", 28),
        platform: "Instagram",
        baseViews: 5100,
        baseConversions: 102,
        targetViews: 14000,
        targetConversions: 280,
        description: "Texas A&M pride and agricultural lifestyle"
      }
    ]
  },
  {
    id: "inf-029",
    name: "Olivia Johnson",
    college: "University of Oregon",
    schoolId: "oregon",
    year: "Sophomore",
    orgs: [
      { org: "Oregon Track and Field", role: "Distance Runner" },
      { org: "Environmental Studies Student Union", role: "Outreach Coordinator" }
    ],
    socials: [
      { platform: "TikTok", handle: "@oliviaruns", followers: 14800 },
      { platform: "Instagram", handle: "@olivia.johnson", followers: 13200 },
      { platform: "Strava", handle: "OliviaRunsUO", followers: 2100 }
    ],
    interests: ["Track and Field", "Environmental Science", "Oregon Nature", "Running"],
    lat: 44.0459,
    lng: -123.0351,
    engagement: "high",
    fitScore: 88,
    explanation: "Elite distance runner with environmental consciousness - perfect for running gear, eco-friendly products, and Pacific Northwest lifestyle brands.",
    examplePosts: [
      {
        id: "tiktok-29",
        mediaUrl: generatePostImageUrl("TikTok", "Running+Training", 29),
        platform: "TikTok",
        baseViews: 11200,
        baseConversions: 168,
        targetViews: 31000,
        targetConversions: 465,
        description: "Elite running training and Oregon nature runs"
      },
      {
        id: "instagram-23",
        mediaUrl: generatePostImageUrl("Instagram", "Oregon+Nature", 29),
        platform: "Instagram",
        baseViews: 6900,
        baseConversions: 138,
        targetViews: 19000,
        targetConversions: 380,
        description: "Oregon trail running and environmental awareness"
      }
    ]
  },
  {
    id: "inf-030",
    name: "Daniel Kim",
    college: "Georgia Institute of Technology",
    schoolId: "uga",
    year: "Junior",
    orgs: [
      { org: "Georgia Tech Robotics Club", role: "Vice President" },
      { org: "Korean Student Association", role: "Technology Director" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "daniel-kim-gatech", followers: 6200 },
      { platform: "TikTok", handle: "@danieltech", followers: 8600 },
      { platform: "GitHub", handle: "dkim-gatech", followers: 1800 }
    ],
    interests: ["Robotics", "AI/ML", "Engineering", "Korean Culture"],
    lat: 33.7756,
    lng: -84.3963,
    engagement: "medium",
    fitScore: 89,
    explanation: "Georgia Tech engineering student with strong technical background - excellent for engineering tools, tech education, and STEM-focused brands targeting technical students.",
    examplePosts: [
      {
        id: "linkedin-7",
        mediaUrl: generatePostImageUrl("LinkedIn", "GT+Engineering", 30),
        platform: "LinkedIn",
        baseViews: 4100,
        baseConversions: 164,
        targetViews: 11500,
        targetConversions: 460,
        description: "Engineering innovations and Georgia Tech research"
      },
      {
        id: "tiktok-30",
        mediaUrl: generatePostImageUrl("TikTok", "Tech+Projects", 30),
        platform: "TikTok",
        baseViews: 6500,
        baseConversions: 97,
        targetViews: 18000,
        targetConversions: 270,
        description: "Cool engineering projects and tech tutorials"
      }
    ]
  }
];

// Helper functions for working with influencer data
export const getInfluencersByIds = (ids: string[]): Influencer[] => {
  return influencers.filter(inf => ids.includes(inf.id));
};

export const calculateTotalFollowers = (influencersList: Influencer[]): number => {
  return influencersList.reduce((total, influencer) => {
    return total + influencer.socials.reduce((sum, social) => sum + social.followers, 0);
  }, 0);
};

export const sortInfluencersByFitScore = (influencersList: Influencer[]): Influencer[] => {
  return [...influencersList].sort((a, b) => b.fitScore - a.fitScore);
};

export const sortInfluencersByFollowers = (influencersList: Influencer[]): Influencer[] => {
  return [...influencersList].sort((a, b) => {
    const aTotal = a.socials.reduce((sum, social) => sum + social.followers, 0);
    const bTotal = b.socials.reduce((sum, social) => sum + social.followers, 0);
    return bTotal - aTotal;
  });
};

export const filterInfluencersByMinFollowers = (influencersList: Influencer[], minFollowers: number): Influencer[] => {
  return influencersList.filter(influencer => {
    const totalFollowers = influencer.socials.reduce((sum, social) => sum + social.followers, 0);
    return totalFollowers >= minFollowers;
  });
};

export const filterInfluencersByInterests = (influencersList: Influencer[], interests: string[]): Influencer[] => {
  if (interests.length === 0) return influencersList;
  
  return influencersList.filter(influencer =>
    interests.some(interest => 
      influencer.interests.some(inf_interest => 
        inf_interest.toLowerCase().includes(interest.toLowerCase())
      )
    )
  );
};

export const formatFollowerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const getInfluencerTier = (totalFollowers: number): string => {
  if (totalFollowers >= 50000) return "Macro";
  if (totalFollowers >= 10000) return "Mid-tier";
  return "Micro";
};
