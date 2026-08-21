export interface SkillItem {
  id: string;
  name: string;
  category: 'Core Language' | 'AI & ML' | 'Distributed Systems' | 'Cloud & DevOps' | 'Frontend & Web' | 'Database & Storage' | 'Security & Crypto';
  proficiency: number; // 0 - 100
  verified: boolean;
  yearsOfExperience?: number;
  marketDemandPercentile?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  highlightedSkills: string[];
  impactMetrics: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  aiVerificationScore: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  honors?: string;
  coursework: string[];
}

export interface TalentProfile {
  id: string;
  fullName: string;
  handle: string;
  title: string;
  email: string;
  location: string;
  avatar: string;
  bio: string;
  targetRole: string;
  targetSalary: string;
  overallMatchReadiness: number; // 0 - 100
  zeroKnowledgeHash: string;
  skills: SkillItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: { name: string; issuer: string; date: string; verified: boolean }[];
  aiExecutiveSummary: string;
  metrics: {
    codeVelocity: string;
    algorithmicRank: string;
    systemDesignScore: string;
    aiPairingProficiency: string;
  };
}

export interface SkillGap {
  skillName: string;
  category: string;
  importance: 'Critical' | 'Recommended' | 'Bonus';
  difficultyToAcquire: 'Fast (1-2 weeks)' | 'Moderate (3-5 weeks)' | 'In-Depth (2+ months)';
  marketDemand: string;
  suggestedResource: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workStyle: 'Remote' | 'Hybrid' | 'On-Site';
  type: 'Full-Time' | 'Contract' | 'Founding Engineer';
  salaryRange: string;
  experienceLevel: 'Mid-Level' | 'Senior' | 'Staff' | 'Principal' | 'Lead';
  department: string;
  matchScore: number; // Calculated dynamic match percentage
  matchBreakdown: {
    skillMatch: number;
    experienceAlignment: number;
    projectRelevance: number;
    domainFit: number;
  };
  aiRationale: string;
  keyMatchHighlights: string[];
  matchedSkills: string[];
  missingSkills: SkillGap[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
  applied?: boolean;
  saved?: boolean;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  skillTag: string;
  completed: boolean;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  resourceType: 'Interactive Lab' | 'Documentation' | 'Video Course' | 'Hands-on Project' | 'Code Challenge';
  resourceLink?: string;
  resourceTitle?: string;
}

export interface RoadmapSprint {
  id: string;
  sprintNumber: number;
  title: string;
  subtitle: string;
  focusArea: string;
  targetOpportunityId?: string;
  targetOpportunityTitle?: string;
  tasks: RoadmapTask[];
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  timestamp: string;
  text: string;
  suggestedPrompts?: string[];
  actionLink?: {
    label: string;
    route: 'dashboard' | 'profile' | 'resume' | 'opportunities' | 'skills' | 'roadmap' | 'copilot' | 'settings';
    param?: string;
  };
}

export interface SkillAnalysisCategory {
  category: string;
  overallScore: number;
  skillsCount: number;
  marketPercentile: number;
  topSkills: string[];
  growthPotential: string;
}

export interface Candidate {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  matchScore: number;
  skills: { name: string; level: number; verified: boolean }[];
  zeroKnowledgeHash: string;
  aiScreeningSummary: string;
  status: 'Ready for Sandbox' | 'Verified' | 'Screened' | 'Deployable';
  metrics: {
    codeVelocity: string;
    algorithmicRank: string;
    systemDesignScore: string;
    aiPairingProficiency: string;
  };
  recentProject: string;
  githubStars: number;
}

export interface PromptQuery {
  id: string;
  query: string;
  category: string;
  tags: string[];
  reasoningSteps: string[];
  resultCandidateIds: string[];
  matchSummary: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  bio: string;
  previous: string[];
  neuralSignature: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metrics: { label: string; value: string };
  badge: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  cta: string;
}
