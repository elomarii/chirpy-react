export interface ArticleProps {
  title: string;
  categories: string[];
  description: string;
  date: string;
  path: string;
  image?: string;
  banner?: string;
}

export interface CategoryListing {
  parent: string;
  children: string[];
}

export interface SitedataState {
  categories: CategoryListing[];
  posts: ArticleProps[];
  projects: ArticleProps[];
  paths: string[];
}
