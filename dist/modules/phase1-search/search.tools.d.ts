import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { QuartileLookupService } from '../../core/services/quartile-lookup.service.js';
import { Paper, SearchPapersInput } from '../../core/memory/session.schema.js';
/**
 * Phase 1: Paper Search Tools
 */
export declare class SearchTools {
    private memory;
    private semanticScholar;
    private quartileLookup;
    constructor(memory: MemoryStore, semanticScholar: SemanticScholarService, quartileLookup: QuartileLookupService);
    searchPapers(input: SearchPapersInput & {
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        query: string;
        count: number;
        papers: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
    }>;
    getPaperMetadata(input: {
        paperId: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        title: string;
        authors: string[];
        year: number;
        citationCount: number;
        quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
        fieldsOfStudy: string[];
        isOpenAccess: boolean;
        venue?: string | undefined;
        abstract?: string | undefined;
        doi?: string | undefined;
        url?: string | undefined;
        pdfUrl?: string | null | undefined;
        extractedAt?: string | undefined;
    }>;
    scorePaperRelevance(input: {
        paperId: string;
        researchQuestion: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        researchQuestion: string;
        relevanceScore: number;
        breakdown: {
            keywordMatches: number;
            citationBoost: number;
            venueBoost: number;
        };
    }>;
    filterByQuartile(input: {
        papers: Paper[];
        allowed: ('Q1' | 'Q2' | 'Q3' | 'Q4')[];
    }, ctx: ExecutionContext): Promise<{
        papers: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
        allowed: ("Q1" | "Q2" | "Q3" | "Q4")[];
    }>;
    sortByRecency(input: {
        papers: Paper[];
    }, ctx: ExecutionContext): Promise<{
        papers: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
    }>;
    getCitationGraph(input: {
        paperId: string;
        depth: number;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        references: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
        citations: {
            paperId: string;
            title: string;
            authors: string[];
            year: number;
            citationCount: number;
            quartile: "unknown" | "Q1" | "Q2" | "Q3" | "Q4";
            fieldsOfStudy: string[];
            isOpenAccess: boolean;
            venue?: string | undefined;
            abstract?: string | undefined;
            doi?: string | undefined;
            url?: string | undefined;
            pdfUrl?: string | null | undefined;
            extractedAt?: string | undefined;
        }[];
        referenceCount: number;
        citationCount: number;
    }>;
}
//# sourceMappingURL=search.tools.d.ts.map