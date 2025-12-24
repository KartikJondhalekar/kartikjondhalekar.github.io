export interface Profile {
  name: string;
  title: string;
  location: string;
  tagline: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}

export interface MindsetSection {
  id: string;
  title: string;
  description: string;
  approach: string[];
}

export interface Mindset {
  title: string;
  sections: MindsetSection[];
}

export interface Decision {
  decision: string;
  rationale: string;
}

export interface Architecture {
  overview: string;
  components: string[];
  dataFlow: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  technologies: string[];
  domain: string;
  category: string;
  tier: number;
  visible: boolean;
  github: string | null;
  demo: string | null;
  summary: string;
  problem: string;
  constraints: string[];
  decisions: Decision[];
  outcomes: string[];
  improvements: string[];
  architecture: Architecture;
}

export interface AdditionalProject {
  id: string;
  title: string;
  summary: string;
  technologies: string[];
  category: string;
}

export interface AdditionalProjects {
  enterprise: AdditionalProject[];
  academic: AdditionalProject[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  impact: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  gpa: string;
  graduationDate: string;
}

export interface ContentData {
  profile: Profile;
  mindset: Mindset;
  projects: Project[];
  additionalProjects: AdditionalProjects;
  experience: Experience[];
  education: Education;
}
