import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { GithubService } from '../../core/services/github.service.js';
/**
 * Phase 0: Prior Work Search & Memory Lookup
 */
export declare class PriorWorkTools {
    private memory;
    private semanticScholar;
    private github;
    constructor(memory: MemoryStore, semanticScholar: SemanticScholarService, github: GithubService);
    searchPriorWork(input: {
        topic: string;
        maxPapers: number;
        maxRepos: number;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        topic: string;
        papers: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            venue: string | undefined;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            url: string | undefined;
        }[];
        repos: {
            name: any;
            url: any;
            description: any;
            stars: any;
            language: any;
            updatedAt: any;
        }[];
        priorSessions: {
            sessionId: string;
            topic: string;
            status: "active" | "completed" | "archived";
            verdict: "PASS" | "CONDITIONAL" | "REJECT";
            resilienceScore: number;
            createdAt: string;
        }[];
    }>;
    verifyRepoRelevance(input: {
        repoDescription: string;
        topic: string;
    }, ctx: ExecutionContext): Promise<{
        relevant: boolean;
        matchScore: number;
        reason: string;
    }>;
    getPriorSessions(uri: string, ctx: ExecutionContext): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
    getSession(uri: string, ctx: ExecutionContext): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=prior-work.tools.d.ts.map