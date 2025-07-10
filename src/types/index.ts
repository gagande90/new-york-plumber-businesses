
// Types for the plumbers directory website

export interface Suburb {
  id: string;
  name: string;
  region: Region;
  slug: string;
  description: string;
  content?: string;
}

export type Region =
  | "Manhattan"
  | "Brooklyn"
  | "Queens"
  | "Bronx"
  | "Staten Island"
  | "Long Island"
  | "Upstate New York"
  | "Hudson Valley"
  | "Capital Region"
  | "Finger Lakes";

export interface Plumber {
  id: string;
  businessName: string;
  description: string;
  services: string[];
  areasServiced: string[]; // Suburb IDs
  phone: string;
  email: string;
  website?: string;
  address?: string;
  reviews?: Review[];
  logo?: string;
  content?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  date: string;
  featuredImage?: string;
  readTime?: string;
}

export type BlogCategory =
  | "DIY Plumbing"
  | "Plumbing Tips"
  | "Industry News"
  | "How-To Guides";

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
