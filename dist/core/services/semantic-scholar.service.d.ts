import { OnModuleInit } from '@nitrostack/core';
import { ConfigService } from '../config/config.service.js';
import { Paper } from '../../core/memory/session.schema.js';
/**
 * Semantic Scholar Service
 *
 * Wrapper around Semantic Scholar API for paper search, metadata, and citation graph.
 * Provides rate limiting and caching.
 */
export declare class SemanticScholarService implements OnModuleInit {
    private config;
    private baseUrl;
    private apiKey;
    private cache;
    private cacheTtlMs;
    constructor(config: ConfigService);
    onModuleInit(): void;
    /**
     * Search for papers by query
     */
    searchPapers(query: string, options?: {
        yearFrom?: number;
        yearTo?: number;
        venues?: string[];
        minCitations?: number;
        limit?: number;
        offset?: number;
    }): Promise<Paper[]>;
    /**
     * Get paper details by ID
     */
    getPaper(paperId: string): Promise<Paper | null>;
    /**
     * Get multiple papers by IDs (batch)
     */
    getPapers(paperIds: string[]): Promise<Paper[]>;
    /**
     * Get citation graph for a paper
     */
    getCitationGraph(paperId: string): Promise<{
        references: Paper[];
        citations: Paper[];
    }>;
    /**
     * Get author information
     */
    getAuthor(authorId: string): Promise<any>;
    /**
     * Get paper recommendations
     */
    getRecommendations(paperId: string, limit?: number): Promise<Paper[]>;
    /**
     * Internal fetch with API key
     */
    private fetch;
    /**
     * Map search results to Paper type
     */
    private mapSearchResults;
    /**
     * Map paper detail to Paper type
     */
    private mapPaperDetail;
    /**
     * Infer quartile from venue and citation count (simplified)
     */
    private inferQuartile;
    private getCached;
    private setCache;
    /**
     * Clear the cache
     */
    clearCache(): void;
}
//# sourceMappingURL=semantic-scholar.service.d.ts.map