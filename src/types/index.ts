export type PageType = 'home' | 'search' | 'ai' | 'admin' | 'about';

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface TranslationSet {
  searchPlaceholder: string;
  aiMode: string;
  feelingLucky: string;
  about: string;
  store: string;
  gmail: string;
  images: string;
  signin: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSettings: string;
}