export interface Profile {
  id?: number;
  name: string;
  hero_tagline: string;
  about_title: string;
  about_text_1: string;
  about_text_2: string;
  connect_text?: string;
  profile_image: string;
  about_image: string;
  resume_url: string;
}

export interface Highlight {
  id?: number;
  name: string;
  sort_order?: number;
}

export interface Education {
  id?: number;
  period: string;
  title: string;
  sub_title: string;
  sort_order?: number;
}

export interface Experience {
  id?: number;
  period: string;
  is_current: boolean | number;
  title: string;
  company: string;
  sort_order?: number;
}

export interface Skill {
  id?: number;
  name: string;
  image_url: string;
  category: 'skill' | 'framework' | string;
  sort_order?: number;
}

export interface Certificate {
  id?: number;
  title: string;
  image_url: string;
  issue_date?: string;
  description?: string;
  sort_order?: number;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  tech: string[];
  images: string[];
  sort_order?: number;
  currentImageIndex?: number;
}

export interface Framework {
  id?: number;
  name: string;
  slug: string;
}

export interface RelationalProject {
  id?: number;
  framework_id?: number;
  framework_name?: string;
  name: string;
  description: string;
  images: string;
}

export interface PortfolioData {
  profile: Profile;
  highlights: Highlight[];
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
  certificates: Certificate[];
  projects: Project[];
  frameworks?: Framework[];
  relationalProjects?: RelationalProject[];
}
