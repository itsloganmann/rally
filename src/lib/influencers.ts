export interface Influencer {
  id: string;
  name: string;
  college: string;
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
  }>;
}

export const influencers: Influencer[] = [
  {
    id: "inf-001",
    name: "Maya Patel",
    college: "Stanford University",
    year: "Junior",
    orgs: [
      { org: "Kappa Alpha Theta", role: "Social Chair" },
      { org: "Stanford Entrepreneurship Club", role: "Member" }
    ],
    socials: [
      { platform: "TikTok", handle: "@mayapatelpatel", followers: 12500 },
      { platform: "Instagram", handle: "@maya.stanford", followers: 8200 },
      { platform: "LinkedIn", handle: "Maya Patel", followers: 1800 }
    ],
    interests: ["Fashion", "Entrepreneurship", "Tech", "Greek Life"],
    lat: 37.4419,
    lng: -122.1430,
    engagement: "high",
    fitScore: 94,
    explanation: "Perfect fit for fashion/lifestyle brands - Greek life social chair with strong engagement in fashion and entrepreneurship communities.",
    examplePosts: [
      {
        id: "post-001-1",
        mediaUrl: "/example-posts/fashion-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 8500,
        baseConversions: 127,
        targetViews: 25000,
        targetConversions: 380
      },
      {
        id: "post-001-2", 
        mediaUrl: "/example-posts/outfit-ig-1.jpg",
        platform: "Instagram",
        baseViews: 3200,
        baseConversions: 89,
        targetViews: 12000,
        targetConversions: 245
      }
    ]
  },
  {
    id: "inf-002",
    name: "Marcus Johnson",
    college: "University of Michigan",
    year: "Senior",
    orgs: [
      { org: "Alpha Phi Alpha", role: "President" },
      { org: "Michigan Athletic Department", role: "Student Manager" }
    ],
    socials: [
      { platform: "TikTok", handle: "@marcusmichigan", followers: 18700 },
      { platform: "Instagram", handle: "@marcus.umich", followers: 15300 },
      { platform: "Twitter", handle: "@MarcusJ_UM", followers: 4200 }
    ],
    interests: ["Sports", "Fitness", "Leadership", "Greek Life"],
    lat: 42.2780,
    lng: -83.7382,
    engagement: "high",
    fitScore: 92,
    explanation: "Strong athletic and leadership presence - ideal for sports/fitness brands targeting college athletes and Greek life.",
    examplePosts: [
      {
        id: "post-002-1",
        mediaUrl: "/example-posts/workout-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 12300,
        baseConversions: 185,
        targetViews: 35000,
        targetConversions: 520
      },
      {
        id: "post-002-2",
        mediaUrl: "/example-posts/gameday-ig-1.jpg", 
        platform: "Instagram",
        baseViews: 6800,
        baseConversions: 134,
        targetViews: 18000,
        targetConversions: 310
      }
    ]
  },
  {
    id: "inf-003",
    name: "Sofia Chen",
    college: "UC Berkeley",
    year: "Sophomore",
    orgs: [
      { org: "Berkeley Consulting", role: "Analyst" },
      { org: "Asian Student Union", role: "Secretary" }
    ],
    socials: [
      { platform: "TikTok", handle: "@sofiacberk", followers: 9800 },
      { platform: "Instagram", handle: "@sofia.berkeley", followers: 11200 },
      { platform: "LinkedIn", handle: "Sofia Chen", followers: 2600 }
    ],
    interests: ["Business", "Tech", "Study Tips", "Culture"],
    lat: 37.8719,
    lng: -122.2585,
    engagement: "medium",
    fitScore: 88,
    explanation: "Rising star in business/tech content - strong academic focus appeals to productivity and educational brands.",
    examplePosts: [
      {
        id: "post-003-1",
        mediaUrl: "/example-posts/study-tips-tiktok-1.jpg",
        platform: "TikTok", 
        baseViews: 5400,
        baseConversions: 76,
        targetViews: 15000,
        targetConversions: 210
      },
      {
        id: "post-003-2",
        mediaUrl: "/example-posts/berkeley-campus-ig-1.jpg",
        platform: "Instagram",
        baseViews: 4100,
        baseConversions: 92,
        targetViews: 11000,
        targetConversions: 180
      }
    ]
  },
  {
    id: "inf-004",
    name: "Jake Williams",
    college: "University of Texas at Austin",
    year: "Junior",
    orgs: [
      { org: "Sigma Chi", role: "Rush Chair" },
      { org: "Texas Cowboys", role: "Member" }
    ],
    socials: [
      { platform: "TikTok", handle: "@jakeutaustin", followers: 22000 },
      { platform: "Instagram", handle: "@jake.longhorns", followers: 16800 },
      { platform: "Snapchat", handle: "@jakewilliams", followers: 8500 }
    ],
    interests: ["Nightlife", "Music", "Greek Life", "Sports"],
    lat: 30.2849,
    lng: -97.7341,
    engagement: "high",
    fitScore: 91,
    explanation: "Top performer in lifestyle/party content - excellent reach for entertainment, alcohol, and lifestyle brands targeting college social scene.",
    examplePosts: [
      {
        id: "post-004-1",
        mediaUrl: "/example-posts/party-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 15600,
        baseConversions: 234,
        targetViews: 42000,
        targetConversions: 630
      },
      {
        id: "post-004-2",
        mediaUrl: "/example-posts/tailgate-ig-1.jpg",
        platform: "Instagram", 
        baseViews: 8900,
        baseConversions: 167,
        targetViews: 24000,
        targetConversions: 380
      }
    ]
  },
  {
    id: "inf-005",
    name: "Emma Rodriguez",
    college: "New York University",
    year: "Senior",
    orgs: [
      { org: "NYU Student Government", role: "VP Communications" },
      { org: "Pre-Law Society", role: "President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@emmanyc", followers: 14200 },
      { platform: "Instagram", handle: "@emma.nyu", followers: 19500 },
      { platform: "LinkedIn", handle: "Emma Rodriguez", followers: 3400 }
    ],
    interests: ["Politics", "Law", "NYC", "Leadership"],
    lat: 40.7295,
    lng: -73.9965,
    engagement: "high",
    fitScore: 89,
    explanation: "Strong political/academic voice in NYC - perfect for professional services, educational, and civic engagement brands.",
    examplePosts: [
      {
        id: "post-005-1",
        mediaUrl: "/example-posts/nyc-life-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 9800,
        baseConversions: 147,
        targetViews: 28000,
        targetConversions: 420
      },
      {
        id: "post-005-2",
        mediaUrl: "/example-posts/law-school-prep-ig-1.jpg",
        platform: "Instagram",
        baseViews: 7200,
        baseConversions: 156,
        targetViews: 19000,
        targetConversions: 285
      }
    ]
  },
  {
    id: "inf-006",
    name: "Tyler Brooks",
    college: "University of Georgia",
    year: "Junior",
    orgs: [
      { org: "Kappa Sigma", role: "Social Chair" },
      { org: "UGA Club Baseball", role: "Captain" }
    ],
    socials: [
      { platform: "TikTok", handle: "@tyleruga", followers: 16900 },
      { platform: "Instagram", handle: "@tyler.dawgs", followers: 13400 },
      { platform: "Twitter", handle: "@TylerB_UGA", followers: 5200 }
    ],
    interests: ["Sports", "Greek Life", "Southern Culture", "Fitness"],
    lat: 33.9519,
    lng: -83.3576,
    engagement: "high", 
    fitScore: 90,
    explanation: "Quintessential southern college experience - ideal for sports apparel, outdoor brands, and southern lifestyle products.",
    examplePosts: [
      {
        id: "post-006-1",
        mediaUrl: "/example-posts/gameday-southern-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 11200,
        baseConversions: 168,
        targetViews: 32000,
        targetConversions: 480
      },
      {
        id: "post-006-2",
        mediaUrl: "/example-posts/baseball-practice-ig-1.jpg",
        platform: "Instagram",
        baseViews: 6700,
        baseConversions: 123,
        targetViews: 17000,
        targetConversions: 290
      }
    ]
  },
  {
    id: "inf-007",
    name: "Zoe Kim",
    college: "UCLA",
    year: "Sophomore",
    orgs: [
      { org: "Korean Student Association", role: "Social Media Manager" },
      { org: "UCLA Dance Team", role: "Member" }
    ],
    socials: [
      { platform: "TikTok", handle: "@zoeucla", followers: 21500 },
      { platform: "Instagram", handle: "@zoe.ucla", followers: 18700 },
      { platform: "YouTube", handle: "ZoeKimDance", followers: 6300 }
    ],
    interests: ["Dance", "K-Pop", "Beauty", "Fashion"],
    lat: 34.0689,
    lng: -118.4452,
    engagement: "high",
    fitScore: 93,
    explanation: "Viral dance content creator - perfect for beauty, fashion, and lifestyle brands targeting Gen Z with strong K-pop/dance culture appeal.",
    examplePosts: [
      {
        id: "post-007-1",
        mediaUrl: "/example-posts/dance-trend-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 18400,
        baseConversions: 276,
        targetViews: 52000,
        targetConversions: 780
      },
      {
        id: "post-007-2",
        mediaUrl: "/example-posts/kpop-inspired-outfit-ig-1.jpg",
        platform: "Instagram",
        baseViews: 9600,
        baseConversions: 192,
        targetViews: 26000,
        targetConversions: 390
      }
    ]
  },
  {
    id: "inf-008", 
    name: "Connor O'Brien",
    college: "Boston College",
    year: "Senior",
    orgs: [
      { org: "Boston College Student Government", role: "Treasurer" },
      { org: "Finance Club", role: "President" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "Connor O'Brien", followers: 4200 },
      { platform: "Instagram", handle: "@connor.bc", followers: 7800 },
      { platform: "TikTok", handle: "@connorfinance", followers: 8900 }
    ],
    interests: ["Finance", "Business", "Networking", "Boston"],
    lat: 42.3355,
    lng: -71.1677,
    engagement: "medium",
    fitScore: 85,
    explanation: "Rising finance professional - strong appeal for fintech, professional services, and business education brands targeting ambitious students.",
    examplePosts: [
      {
        id: "post-008-1",
        mediaUrl: "/example-posts/finance-tips-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 6200,
        baseConversions: 93,
        targetViews: 17000,
        targetConversions: 255
      },
      {
        id: "post-008-2",
        mediaUrl: "/example-posts/boston-professional-ig-1.jpg",
        platform: "Instagram",
        baseViews: 3800,
        baseConversions: 76,
        targetViews: 10000,
        targetConversions: 150
      }
    ]
  },
  {
    id: "inf-009",
    name: "Aaliyah Washington",
    college: "Howard University",
    year: "Junior",
    orgs: [
      { org: "Delta Sigma Theta", role: "Vice President" },
      { org: "Howard Business School Association", role: "Events Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@aaliyahhoward", followers: 15600 },
      { platform: "Instagram", handle: "@aaliyah.hu", followers: 12300 },
      { platform: "LinkedIn", handle: "Aaliyah Washington", followers: 2800 }
    ],
    interests: ["Business", "Greek Life", "Empowerment", "Culture"],
    lat: 38.9217,
    lng: -77.0198,
    engagement: "high",
    fitScore: 87,
    explanation: "Influential voice in HBCU community - excellent for diversity-focused brands, professional development, and empowerment messaging.",
    examplePosts: [
      {
        id: "post-009-1", 
        mediaUrl: "/example-posts/hbcu-pride-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 8900,
        baseConversions: 134,
        targetViews: 25000,
        targetConversions: 375
      },
      {
        id: "post-009-2",
        mediaUrl: "/example-posts/business-woman-ig-1.jpg",
        platform: "Instagram",
        baseViews: 5400,
        baseConversions: 108,
        targetViews: 14000,
        targetConversions: 210
      }
    ]
  },
  {
    id: "inf-010",
    name: "Alex Thompson",
    college: "University of Washington",
    year: "Sophomore",
    orgs: [
      { org: "UW Gaming Club", role: "President" },
      { org: "Computer Science Student Association", role: "Social Chair" }
    ],
    socials: [
      { platform: "Twitch", handle: "AlexThompsonGames", followers: 18200 },
      { platform: "TikTok", handle: "@alexuwgaming", followers: 11700 },
      { platform: "Discord", handle: "AlexT#1337", followers: 9500 }
    ],
    interests: ["Gaming", "Tech", "Programming", "Esports"],
    lat: 47.6553,
    lng: -122.3035,
    engagement: "high",
    fitScore: 86,
    explanation: "Leading gaming influencer in college space - perfect for gaming hardware, tech products, and digital entertainment brands.",
    examplePosts: [
      {
        id: "post-010-1",
        mediaUrl: "/example-posts/gaming-setup-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 7800,
        baseConversions: 117,
        targetViews: 22000,
        targetConversions: 330
      },
      {
        id: "post-010-2",
        mediaUrl: "/example-posts/coding-session-ig-1.jpg",
        platform: "Instagram",
        baseViews: 4600,
        baseConversions: 92,
        targetViews: 12000,
        targetConversions: 180
      }
    ]
  },
  {
    id: "inf-011",
    name: "Isabella Martinez",
    college: "University of Miami",
    year: "Junior",
    orgs: [
      { org: "Alpha Chi Omega", role: "President" },
      { org: "Miami Fashion Society", role: "Creative Director" }
    ],
    socials: [
      { platform: "Instagram", handle: "@bella.miami", followers: 24500 },
      { platform: "TikTok", handle: "@bellamiami", followers: 19200 },
      { platform: "Pinterest", handle: "BellaMiamiFashion", followers: 7800 }
    ],
    interests: ["Fashion", "Beauty", "Miami Lifestyle", "Greek Life"],
    lat: 25.7217,
    lng: -80.2794,
    engagement: "high",
    fitScore: 95,
    explanation: "Top fashion influencer with Miami aesthetic - ideal for luxury fashion, beauty, swimwear, and lifestyle brands targeting aspirational college market.",
    examplePosts: [
      {
        id: "post-011-1",
        mediaUrl: "/example-posts/miami-fashion-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 16800,
        baseConversions: 252,
        targetViews: 48000,
        targetConversions: 720
      },
      {
        id: "post-011-2",
        mediaUrl: "/example-posts/beach-outfit-ig-1.jpg",
        platform: "Instagram",
        baseViews: 11200,
        baseConversions: 224,
        targetViews: 32000,
        targetConversions: 480
      }
    ]
  },
  {
    id: "inf-012",
    name: "Ryan Mitchell",
    college: "University of Colorado Boulder",
    year: "Senior",
    orgs: [
      { org: "Outdoor Recreation Club", role: "President" },
      { org: "Environmental Action Group", role: "Co-founder" }
    ],
    socials: [
      { platform: "Instagram", handle: "@ryan.colorado", followers: 13400 },
      { platform: "TikTok", handle: "@ryancolorado", followers: 10200 },
      { platform: "YouTube", handle: "RyanOutdoorAdventures", followers: 5600 }
    ],
    interests: ["Outdoors", "Hiking", "Sustainability", "Adventure"],
    lat: 40.0150,
    lng: -105.2705,
    engagement: "medium",
    fitScore: 88,
    explanation: "Authentic outdoor enthusiast - perfect for outdoor gear, sustainable products, and adventure travel brands targeting eco-conscious students.",
    examplePosts: [
      {
        id: "post-012-1",
        mediaUrl: "/example-posts/hiking-colorado-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 7200,
        baseConversions: 108,
        targetViews: 20000,
        targetConversions: 300
      },
      {
        id: "post-012-2",
        mediaUrl: "/example-posts/sustainable-gear-ig-1.jpg",
        platform: "Instagram",
        baseViews: 5800,
        baseConversions: 116,
        targetViews: 16000,
        targetConversions: 240
      }
    ]
  },
  {
    id: "inf-013",
    name: "Hannah Lee",
    college: "Vanderbilt University",
    year: "Sophomore",
    orgs: [
      { org: "Chi Omega", role: "Social Chair" },
      { org: "Vanderbilt Student Communications", role: "Content Creator" }
    ],
    socials: [
      { platform: "TikTok", handle: "@hannahvandy", followers: 17800 },
      { platform: "Instagram", handle: "@hannah.vandy", followers: 14600 },
      { platform: "VSCO", handle: "hannahlee", followers: 8200 }
    ],
    interests: ["Southern Style", "Greek Life", "Photography", "Nashville"],
    lat: 36.1447,
    lng: -86.8027,
    engagement: "high",
    fitScore: 91,
    explanation: "Southern charm with sophisticated aesthetic - great for fashion, lifestyle, and luxury brands targeting affluent college market.",
    examplePosts: [
      {
        id: "post-013-1",
        mediaUrl: "/example-posts/southern-style-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 12600,
        baseConversions: 189,
        targetViews: 36000,
        targetConversions: 540
      },
      {
        id: "post-013-2",
        mediaUrl: "/example-posts/nashville-lifestyle-ig-1.jpg",
        platform: "Instagram",
        baseViews: 8400,
        baseConversions: 168,
        targetViews: 22000,
        targetConversions: 330
      }
    ]
  },
  {
    id: "inf-014",
    name: "Jordan Davis",
    college: "University of North Carolina at Chapel Hill",
    year: "Junior",
    orgs: [
      { org: "UNC Basketball Student Section", role: "Leader" },
      { org: "Phi Beta Sigma", role: "Secretary" }
    ],
    socials: [
      { platform: "TikTok", handle: "@jordanunc", followers: 14200 },
      { platform: "Instagram", handle: "@jordan.tarheels", followers: 11800 },
      { platform: "Twitter", handle: "@JordanD_UNC", followers: 6300 }
    ],
    interests: ["Basketball", "Sports", "Greek Life", "School Spirit"],
    lat: 35.9132,
    lng: -79.0558,
    engagement: "high",
    fitScore: 89,
    explanation: "High-energy sports content with strong school spirit - excellent for sports brands, athletic wear, and products targeting college sports fans.",
    examplePosts: [
      {
        id: "post-014-1",
        mediaUrl: "/example-posts/basketball-hype-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 10200,
        baseConversions: 153,
        targetViews: 29000,
        targetConversions: 435
      },
      {
        id: "post-014-2",
        mediaUrl: "/example-posts/gameday-unc-ig-1.jpg",
        platform: "Instagram",
        baseViews: 6800,
        baseConversions: 136,
        targetViews: 18000,
        targetConversions: 270
      }
    ]
  },
  {
    id: "inf-015",
    name: "Grace Wilson",
    college: "Northwestern University",
    year: "Senior",
    orgs: [
      { org: "Daily Northwestern", role: "Editor-in-Chief" },
      { org: "Kappa Kappa Gamma", role: "Vice President" }
    ],
    socials: [
      { platform: "LinkedIn", handle: "Grace Wilson", followers: 3800 },
      { platform: "TikTok", handle: "@gracenorthwestern", followers: 9400 },
      { platform: "Instagram", handle: "@grace.northwestern", followers: 8700 }
    ],
    interests: ["Journalism", "Media", "Politics", "Chicago"],
    lat: 42.0564,
    lng: -87.6753,
    engagement: "medium",
    fitScore: 84,
    explanation: "Future media professional with strong journalism background - ideal for news organizations, media companies, and professional development brands.",
    examplePosts: [
      {
        id: "post-015-1",
        mediaUrl: "/example-posts/journalism-tips-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 5600,
        baseConversions: 84,
        targetViews: 15000,
        targetConversions: 225
      },
      {
        id: "post-015-2",
        mediaUrl: "/example-posts/chicago-internship-ig-1.jpg",
        platform: "Instagram",
        baseViews: 4200,
        baseConversions: 84,
        targetViews: 11000,
        targetConversions: 165
      }
    ]
  },
  {
    id: "inf-016",
    name: "Carlos Ramirez",
    college: "Arizona State University",
    year: "Junior",
    orgs: [
      { org: "Lambda Chi Alpha", role: "Rush Chair" },
      { org: "ASU Business Fraternity", role: "Professional Development Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@carlosasu", followers: 20100 },
      { platform: "Instagram", handle: "@carlos.asu", followers: 16200 },
      { platform: "Snapchat", handle: "@carlosramirez", followers: 9800 }
    ],
    interests: ["Party Scene", "Desert Life", "Business", "Greek Life"],
    lat: 33.4255,
    lng: -111.9400,
    engagement: "high",
    fitScore: 90,
    explanation: "Ultimate party school influencer - perfect for beverage brands, entertainment, travel, and lifestyle products targeting college party culture.",
    examplePosts: [
      {
        id: "post-016-1",
        mediaUrl: "/example-posts/asu-party-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 14800,
        baseConversions: 222,
        targetViews: 42000,
        targetConversions: 630
      },
      {
        id: "post-016-2",
        mediaUrl: "/example-posts/desert-adventure-ig-1.jpg",
        platform: "Instagram",
        baseViews: 9200,
        baseConversions: 184,
        targetViews: 25000,
        targetConversions: 375
      }
    ]
  },
  {
    id: "inf-017",
    name: "Lily Chang",
    college: "UC San Diego",
    year: "Sophomore",
    orgs: [
      { org: "UCSD Pre-Med Society", role: "Vice President" },
      { org: "Asian Pacific Student Alliance", role: "Cultural Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@lilyucsd", followers: 8700 },
      { platform: "Instagram", handle: "@lily.ucsd", followers: 10300 },
      { platform: "LinkedIn", handle: "Lily Chang", followers: 2100 }
    ],
    interests: ["Medicine", "Study Tips", "Wellness", "STEM"],
    lat: 32.8801,
    lng: -117.2340,
    engagement: "medium",
    fitScore: 82,
    explanation: "Pre-med student with strong academic focus - excellent for educational tools, wellness products, and STEM-focused brands.",
    examplePosts: [
      {
        id: "post-017-1",
        mediaUrl: "/example-posts/study-motivation-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 4800,
        baseConversions: 72,
        targetViews: 13000,
        targetConversions: 195
      },
      {
        id: "post-017-2",
        mediaUrl: "/example-posts/pre-med-life-ig-1.jpg",
        platform: "Instagram",
        baseViews: 3600,
        baseConversions: 72,
        targetViews: 9500,
        targetConversions: 143
      }
    ]
  },
  {
    id: "inf-018",
    name: "Ethan Parker",
    college: "University of Florida",
    year: "Senior",
    orgs: [
      { org: "Sigma Nu", role: "President" },
      { org: "UF Student Government", role: "Senator" }
    ],
    socials: [
      { platform: "TikTok", handle: "@ethanuf", followers: 19600 },
      { platform: "Instagram", handle: "@ethan.gators", followers: 15800 },
      { platform: "Twitter", handle: "@EthanP_UF", followers: 7200 }
    ],
    interests: ["Politics", "Leadership", "Florida Life", "Greek Life"],
    lat: 29.6436,
    lng: -82.3549,
    engagement: "high",
    fitScore: 88,
    explanation: "Student leader with political aspirations - great for civic engagement, leadership development, and brands targeting future professionals.",
    examplePosts: [
      {
        id: "post-018-1",
        mediaUrl: "/example-posts/student-gov-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 11400,
        baseConversions: 171,
        targetViews: 32000,
        targetConversions: 480
      },
      {
        id: "post-018-2",
        mediaUrl: "/example-posts/gator-pride-ig-1.jpg",
        platform: "Instagram",
        baseViews: 7600,
        baseConversions: 152,
        targetViews: 20000,
        targetConversions: 300
      }
    ]
  },
  {
    id: "inf-019",
    name: "Mia Roberts",
    college: "University of Wisconsin-Madison",
    year: "Junior",
    orgs: [
      { org: "Pi Beta Phi", role: "Social Chair" },
      { org: "Wisconsin Marketing Association", role: "Events Coordinator" }
    ],
    socials: [
      { platform: "TikTok", handle: "@miawisc", followers: 13800 },
      { platform: "Instagram", handle: "@mia.wisconsin", followers: 12100 },
      { platform: "Pinterest", handle: "MiaRobertsTrends", followers: 6400 }
    ],
    interests: ["Marketing", "Midwest Culture", "Greek Life", "Seasonal Fashion"],
    lat: 43.0731,
    lng: -89.4012,
    engagement: "medium",
    fitScore: 86,
    explanation: "Marketing-savvy with authentic midwest appeal - perfect for seasonal brands, cozy lifestyle products, and marketing education platforms.",
    examplePosts: [
      {
        id: "post-019-1",
        mediaUrl: "/example-posts/wisconsin-winter-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 8200,
        baseConversions: 123,
        targetViews: 23000,
        targetConversions: 345
      },
      {
        id: "post-019-2",
        mediaUrl: "/example-posts/cozy-aesthetic-ig-1.jpg",
        platform: "Instagram",
        baseViews: 5800,
        baseConversions: 116,
        targetViews: 15000,
        targetConversions: 225
      }
    ]
  },
  {
    id: "inf-020",
    name: "Jackson Smith",
    college: "University of Alabama",
    year: "Senior",
    orgs: [
      { org: "Sigma Alpha Epsilon", role: "President" },
      { org: "Alabama Football Student Advisory Board", role: "Member" }
    ],
    socials: [
      { platform: "TikTok", handle: "@jacksonbama", followers: 25600 },
      { platform: "Instagram", handle: "@jackson.alabama", followers: 21300 },
      { platform: "Twitter", handle: "@JacksonS_Bama", followers: 8900 }
    ],
    interests: ["Football", "Southern Culture", "Greek Life", "Traditions"],
    lat: 32.3617,
    lng: -87.1348,
    engagement: "high",
    fitScore: 93,
    explanation: "Elite SEC football culture influencer - top choice for sports brands, southern lifestyle products, and tradition-focused companies.",
    examplePosts: [
      {
        id: "post-020-1",
        mediaUrl: "/example-posts/bama-football-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 18200,
        baseConversions: 273,
        targetViews: 52000,
        targetConversions: 780
      },
      {
        id: "post-020-2",
        mediaUrl: "/example-posts/game-day-traditions-ig-1.jpg",
        platform: "Instagram",
        baseViews: 12600,
        baseConversions: 252,
        targetViews: 34000,
        targetConversions: 510
      }
    ]
  },
  {
    id: "inf-021",
    name: "Ava Johnson",
    college: "Duke University",
    year: "Sophomore",
    orgs: [
      { org: "Duke Student Government", role: "Class Representative" },
      { org: "Kappa Alpha Theta", role: "Scholarship Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@avaduke", followers: 11200 },
      { platform: "Instagram", handle: "@ava.duke", followers: 9800 },
      { platform: "LinkedIn", handle: "Ava Johnson", followers: 2400 }
    ],
    interests: ["Academics", "Public Policy", "Duke Basketball", "Leadership"],
    lat: 36.0014,
    lng: -78.9382,
    engagement: "medium",
    fitScore: 84,
    explanation: "High-achieving student leader at prestigious university - excellent for educational services, leadership programs, and professional development.",
    examplePosts: [
      {
        id: "post-021-1",
        mediaUrl: "/example-posts/duke-campus-life-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 6400,
        baseConversions: 96,
        targetViews: 17000,
        targetConversions: 255
      },
      {
        id: "post-021-2",
        mediaUrl: "/example-posts/student-leader-ig-1.jpg",
        platform: "Instagram",
        baseViews: 4200,
        baseConversions: 84,
        targetViews: 11000,
        targetConversions: 165
      }
    ]
  },
  {
    id: "inf-022",
    name: "Noah Garcia",
    college: "University of Southern California",
    year: "Junior",
    orgs: [
      { org: "USC Film School Association", role: "President" },
      { org: "Lambda Theta Phi", role: "Vice President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@noahusc", followers: 16800 },
      { platform: "Instagram", handle: "@noah.usc", followers: 14200 },
      { platform: "YouTube", handle: "NoahGarciaFilms", followers: 8700 }
    ],
    interests: ["Film", "Content Creation", "Los Angeles", "Latino Culture"],
    lat: 34.0224,
    lng: -118.2851,
    engagement: "high",
    fitScore: 89,
    explanation: "Creative film student in Hollywood - perfect for entertainment brands, production equipment, and content creation tools.",
    examplePosts: [
      {
        id: "post-022-1",
        mediaUrl: "/example-posts/film-behind-scenes-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 12200,
        baseConversions: 183,
        targetViews: 34000,
        targetConversions: 510
      },
      {
        id: "post-022-2",
        mediaUrl: "/example-posts/la-film-student-ig-1.jpg",
        platform: "Instagram",
        baseViews: 8400,
        baseConversions: 168,
        targetViews: 23000,
        targetConversions: 345
      }
    ]
  },
  {
    id: "inf-023",
    name: "Chloe Anderson",
    college: "University of Virginia",
    year: "Senior",
    orgs: [
      { org: "Alpha Phi", role: "President" },
      { org: "UVA Honor Committee", role: "Representative" }
    ],
    socials: [
      { platform: "TikTok", handle: "@chloeuva", followers: 14700 },
      { platform: "Instagram", handle: "@chloe.virginia", followers: 17200 },
      { platform: "VSCO", handle: "chloeanderson", followers: 9100 }
    ],
    interests: ["Preppy Style", "Honor Code", "Charlottesville", "Greek Life"],
    lat: 38.0336,
    lng: -78.5080,
    engagement: "high",
    fitScore: 90,
    explanation: "Classic preppy influencer with honor society leadership - ideal for traditional fashion brands, educational institutions, and luxury lifestyle products.",
    examplePosts: [
      {
        id: "post-023-1",
        mediaUrl: "/example-posts/preppy-style-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 10800,
        baseConversions: 162,
        targetViews: 30000,
        targetConversions: 450
      },
      {
        id: "post-023-2",
        mediaUrl: "/example-posts/uva-traditions-ig-1.jpg",
        platform: "Instagram",
        baseViews: 8600,
        baseConversions: 172,
        targetViews: 23000,
        targetConversions: 345
      }
    ]
  },
  {
    id: "inf-024",
    name: "Mason Taylor",
    college: "Texas A&M University",
    year: "Junior",
    orgs: [
      { org: "Corps of Cadets", role: "Company Commander" },
      { org: "Engineering Honor Society", role: "Secretary" }
    ],
    socials: [
      { platform: "TikTok", handle: "@masontamu", followers: 12600 },
      { platform: "Instagram", handle: "@mason.aggies", followers: 10400 },
      { platform: "LinkedIn", handle: "Mason Taylor", followers: 3200 }
    ],
    interests: ["Military", "Engineering", "Aggie Traditions", "Leadership"],
    lat: 30.6280,
    lng: -96.3344,
    engagement: "medium",
    fitScore: 87,
    explanation: "Military leadership with engineering background - excellent for military/tactical gear, engineering tools, and leadership development programs.",
    examplePosts: [
      {
        id: "post-024-1",
        mediaUrl: "/example-posts/corps-cadets-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 7800,
        baseConversions: 117,
        targetViews: 21000,
        targetConversions: 315
      },
      {
        id: "post-024-2",
        mediaUrl: "/example-posts/aggie-engineering-ig-1.jpg",
        platform: "Instagram",
        baseViews: 5200,
        baseConversions: 104,
        targetViews: 14000,
        targetConversions: 210
      }
    ]
  },
  {
    id: "inf-025",
    name: "Olivia Brown",
    college: "University of Oregon",
    year: "Sophomore",
    orgs: [
      { org: "Oregon Track and Field", role: "Team Member" },
      { org: "Sustainability Club", role: "Co-President" }
    ],
    socials: [
      { platform: "TikTok", handle: "@oliviaoregon", followers: 9800 },
      { platform: "Instagram", handle: "@olivia.oregon", followers: 12700 },
      { platform: "Strava", handle: "OliviaBrownRuns", followers: 4200 }
    ],
    interests: ["Running", "Sustainability", "Pacific Northwest", "Health"],
    lat: 44.0459,
    lng: -123.0689,
    engagement: "medium",
    fitScore: 85,
    explanation: "Authentic athletic sustainability advocate - perfect for eco-friendly athletic gear, outdoor brands, and health/wellness products.",
    examplePosts: [
      {
        id: "post-025-1",
        mediaUrl: "/example-posts/sustainable-running-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 6200,
        baseConversions: 93,
        targetViews: 17000,
        targetConversions: 255
      },
      {
        id: "post-025-2",
        mediaUrl: "/example-posts/oregon-nature-run-ig-1.jpg",
        platform: "Instagram",
        baseViews: 5400,
        baseConversions: 108,
        targetViews: 14000,
        targetConversions: 210
      }
    ]
  },
  {
    id: "inf-026",
    name: "Lucas White",
    college: "Penn State University",
    year: "Senior",
    orgs: [
      { org: "Beta Theta Pi", role: "Social Chair" },
      { org: "Penn State Blue Band", role: "Section Leader" }
    ],
    socials: [
      { platform: "TikTok", handle: "@lucaspsu", followers: 18200 },
      { platform: "Instagram", handle: "@lucas.pennstate", followers: 15600 },
      { platform: "Snapchat", handle: "@lucaswhite", followers: 8900 }
    ],
    interests: ["Music", "School Spirit", "Greek Life", "Pennsylvania"],
    lat: 40.7982,
    lng: -77.8599,
    engagement: "high",
    fitScore: 88,
    explanation: "High-energy school spirit with musical talent - great for musical instruments, school merchandise, and entertainment brands targeting college communities.",
    examplePosts: [
      {
        id: "post-026-1",
        mediaUrl: "/example-posts/penn-state-spirit-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 13200,
        baseConversions: 198,
        targetViews: 37000,
        targetConversions: 555
      },
      {
        id: "post-026-2",
        mediaUrl: "/example-posts/blue-band-performance-ig-1.jpg",
        platform: "Instagram",
        baseViews: 8800,
        baseConversions: 176,
        targetViews: 24000,
        targetConversions: 360
      }
    ]
  },
  {
    id: "inf-027",
    name: "Madison Turner",
    college: "University of Tennessee",
    year: "Junior",
    orgs: [
      { org: "Zeta Tau Alpha", role: "Vice President" },
      { org: "Tennessee Volunteers Student Section", role: "Captain" }
    ],
    socials: [
      { platform: "TikTok", handle: "@madisonvols", followers: 16400 },
      { platform: "Instagram", handle: "@madison.tennessee", followers: 13800 },
      { platform: "Twitter", handle: "@MadisonT_Vols", followers: 5700 }
    ],
    interests: ["SEC Football", "Southern Style", "Greek Life", "Country Music"],
    lat: 35.9544,
    lng: -83.9295,
    engagement: "high",
    fitScore: 91,
    explanation: "Quintessential SEC culture ambassador - perfect for southern lifestyle brands, country music promotion, and college sports merchandise.",
    examplePosts: [
      {
        id: "post-027-1",
        mediaUrl: "/example-posts/vols-gameday-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 11800,
        baseConversions: 177,
        targetViews: 33000,
        targetConversions: 495
      },
      {
        id: "post-027-2",
        mediaUrl: "/example-posts/southern-football-style-ig-1.jpg",
        platform: "Instagram",
        baseViews: 7600,
        baseConversions: 152,
        targetViews: 20000,
        targetConversions: 300
      }
    ]
  },
  {
    id: "inf-028",
    name: "Cameron Lewis",
    college: "University of Illinois",
    year: "Sophomore",
    orgs: [
      { org: "Acacia Fraternity", role: "Pledge Educator" },
      { org: "Engineering Student Council", role: "Representative" }
    ],
    socials: [
      { platform: "TikTok", handle: "@cameronuiuc", followers: 7900 },
      { platform: "Instagram", handle: "@cameron.illinois", followers: 6800 },
      { platform: "LinkedIn", handle: "Cameron Lewis", followers: 1900 }
    ],
    interests: ["Engineering", "Midwest Life", "Greek Life", "Innovation"],
    lat: 40.1020,
    lng: -88.2272,
    engagement: "low",
    fitScore: 78,
    explanation: "Rising engineering student with fraternity connections - good for technical brands, educational tools, and midwest-focused products.",
    examplePosts: [
      {
        id: "post-028-1",
        mediaUrl: "/example-posts/engineering-project-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 3200,
        baseConversions: 48,
        targetViews: 8500,
        targetConversions: 128
      },
      {
        id: "post-028-2",
        mediaUrl: "/example-posts/illinois-campus-ig-1.jpg",
        platform: "Instagram",
        baseViews: 2800,
        baseConversions: 56,
        targetViews: 7500,
        targetConversions: 113
      }
    ]
  },
  {
    id: "inf-029",
    name: "Samantha Davis",
    college: "University of Connecticut",
    year: "Senior",
    orgs: [
      { org: "UConn Women's Basketball Student Manager", role: "Head Manager" },
      { org: "Alpha Delta Pi", role: "Recruitment Chair" }
    ],
    socials: [
      { platform: "TikTok", handle: "@samuconn", followers: 13500 },
      { platform: "Instagram", handle: "@sam.uconn", followers: 11200 },
      { platform: "Twitter", handle: "@SamD_UConn", followers: 4600 }
    ],
    interests: ["Women's Basketball", "Sports Management", "New England", "Greek Life"],
    lat: 41.8077,
    lng: -72.2540,
    engagement: "medium",
    fitScore: 86,
    explanation: "Women's sports advocate with management experience - excellent for sports brands, women's empowerment products, and athletic management tools.",
    examplePosts: [
      {
        id: "post-029-1",
        mediaUrl: "/example-posts/womens-basketball-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 8600,
        baseConversions: 129,
        targetViews: 24000,
        targetConversions: 360
      },
      {
        id: "post-029-2",
        mediaUrl: "/example-posts/uconn-pride-ig-1.jpg",
        platform: "Instagram",
        baseViews: 6200,
        baseConversions: 124,
        targetViews: 16000,
        targetConversions: 240
      }
    ]
  },
  {
    id: "inf-030",
    name: "Joshua Martinez",
    college: "University of Arizona",
    year: "Junior",
    orgs: [
      { org: "Pi Kappa Alpha", role: "President" },
      { org: "Arizona Student Union", role: "Programming Board Member" }
    ],
    socials: [
      { platform: "TikTok", handle: "@joshuauofa", followers: 19800 },
      { platform: "Instagram", handle: "@josh.arizona", followers: 17200 },
      { platform: "Snapchat", handle: "@joshmart", followers: 10400 }
    ],
    interests: ["Desert Life", "Party Scene", "Greek Life", "Southwestern Culture"],
    lat: 32.2319,
    lng: -110.9501,
    engagement: "high",
    fitScore: 89,
    explanation: "Desert party culture leader - ideal for beverage brands, festival/event promotion, and southwestern lifestyle products.",
    examplePosts: [
      {
        id: "post-030-1",
        mediaUrl: "/example-posts/arizona-desert-party-tiktok-1.jpg",
        platform: "TikTok",
        baseViews: 14200,
        baseConversions: 213,
        targetViews: 40000,
        targetConversions: 600
      },
      {
        id: "post-030-2",
        mediaUrl: "/example-posts/southwestern-lifestyle-ig-1.jpg",
        platform: "Instagram",
        baseViews: 9800,
        baseConversions: 196,
        targetViews: 26000,
        targetConversions: 390
      }
    ]
  }
];

// Helper functions for working with the influencer data
export function getInfluencerById(id: string): Influencer | undefined {
  return influencers.find(inf => inf.id === id);
}

export function getInfluencersByIds(ids: string[]): Influencer[] {
  return ids.map(getInfluencerById).filter((inf): inf is Influencer => inf !== undefined);
}

export function calculateTotalFollowers(influencer: Influencer): number {
  return influencer.socials.reduce((total, social) => total + social.followers, 0);
}

export function sortInfluencersByFitScore(influencers: Influencer[]): Influencer[] {
  return [...influencers].sort((a, b) => b.fitScore - a.fitScore);
}

export function sortInfluencersByFollowers(influencers: Influencer[]): Influencer[] {
  return [...influencers].sort((a, b) => calculateTotalFollowers(b) - calculateTotalFollowers(a));
}

export function filterInfluencersByMinFollowers(influencers: Influencer[], minFollowers: number): Influencer[] {
  return influencers.filter(inf => calculateTotalFollowers(inf) >= minFollowers);
}

export function filterInfluencersByInterests(influencers: Influencer[], interests: string[]): Influencer[] {
  if (interests.length === 0) return influencers;
  return influencers.filter(inf => 
    interests.some(interest => 
      inf.interests.some(infInterest => 
        infInterest.toLowerCase().includes(interest.toLowerCase())
      )
    )
  );
}

// Format follower counts for display
export function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// Get influencer tier badge
export function getInfluencerTier(totalFollowers: number): string {
  if (totalFollowers >= 50000) return "Mid-tier";
  if (totalFollowers >= 10000) return "Micro";
  return "Nano";
}
