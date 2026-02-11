
export type PageType = 'home' | 'work' | 'about' | 'contact' | 'collaborate' | 'privacy' | 'terms' | 'project-detail';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  longDescription?: string;
  client?: string;
  year?: string;
}

export interface NavLink {
  label: string;
  href: PageType;
}
