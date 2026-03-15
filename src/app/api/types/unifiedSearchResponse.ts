import { SearchProvider } from "./searchProvider";

type UnifiedSearchMetadataValue =
  | boolean
  | null
  | number
  | string
  | undefined;

type UnifiedSearchMetadata = {
  numResults?: number;
  searchTime?: number;
  [key: string]: UnifiedSearchMetadataValue;
};

/**
 * Unified search response that works with both Gemini and Exa search providers
 */
export interface UnifiedSearchResponse {
  provider: SearchProvider;
  searchQuery: string;
  content?: string; // For Gemini's generated response
  results?: Array<{
    title: string;
    url: string;
    content?: string;
    snippet?: string;
    publishedDate?: string;
    author?: string;
  }>; // For Exa's structured results
  metadata?: UnifiedSearchMetadata;
}

/**
 * Type guard to check if response is from Gemini
 */
export const isGeminiResponse = (
  response: UnifiedSearchResponse,
): response is UnifiedSearchResponse & { content: string } => {
  return response.provider === SearchProvider.GEMINI && !!response.content;
};

/**
 * Type guard to check if response is from Exa
 */
export const isExaResponse = (
  response: UnifiedSearchResponse,
): response is UnifiedSearchResponse & {
  results: NonNullable<UnifiedSearchResponse["results"]>;
} => {
  return response.provider === SearchProvider.EXA && !!response.results;
};
