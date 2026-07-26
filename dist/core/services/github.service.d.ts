import { ConfigService } from '../config/config.service.js';
/**
 * GitHub Service
 *
 * Searches GitHub repositories for prior art code implementations.
 */
export declare class GithubService {
    private config;
    private apiKey;
    private baseUrl;
    constructor(config: ConfigService);
    /**
     * Search repositories by topic
     */
    searchRepos(topic: string, maxResults?: number): Promise<any[]>;
    /**
     * Search code by topic
     */
    searchCode(topic: string, maxResults?: number): Promise<any[]>;
    /**
     * Get repository details
     */
    getRepo(owner: string, repo: string): Promise<any>;
    /**
     * Calculate relevance score based on topic match
     */
    private calculateRelevance;
    /**
     * Fetch from GitHub API
     */
    private fetch;
}
//# sourceMappingURL=github.service.d.ts.map