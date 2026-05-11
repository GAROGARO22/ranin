export type PoetryType = 
  | "fusha" 
  | "nabati" 
  | "ghinai" 
  | "tafeela" 
  | "watani" 
  | "romansi" 
  | "munasabat" 
  | "muwashah" 
  | "zawamil";

export interface Poem {
  id?: string;
  userId: string;
  title: string;
  content: string;
  type: PoetryType;
  meter?: string;
  analysis?: ArudAnalysisResult;
  isPublic: boolean;
  likesCount: number;
  createdAt: any;
}

export interface ArudAnalysisResult {
  meterName: string;
  tafeela: string[];
  scansion: string; // e.g. //0//0
  errors: Array<{ line: number; type: string; suggestion: string }>;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  credits: number;
  tier: "free" | "pro" | "creator";
}
