import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { EmbeddingsService } from '../../core/services/embeddings.service.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
/**
 * Phase 7: Cross-Domain Analogist (Stretch)
 *
 * Finds analogies from other domains that could apply to the research topic.
 */
export declare class AnalogyTools {
    private memory;
    private embeddings;
    private semanticScholar;
    constructor(memory: MemoryStore, embeddings: EmbeddingsService, semanticScholar: SemanticScholarService);
    findCrossDomainAnalogs(input: {
        technique: string;
        sourceDomain: string;
        targetDomain?: string;
        excludeDomains?: string[];
        limit?: number;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        technique: string;
        sourceDomain: string;
        targetDomain: string | undefined;
        analogiesFound: number;
        analogies: {
            analogyId: string;
            targetDomain: string;
            targetApplication: string;
            similarityScore: number;
            transferability: "low" | "medium" | "high";
        }[];
    }>;
    private buildAnalogQueries;
    private deduplicatePapers;
    private inferDomain;
    private isSameDomain;
    private assessTransferability;
    verifyTechniqueMatch(input: {
        analogyId: string;
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        analogyId: string;
        verified: boolean;
        transferability: "low" | "medium" | "high";
        confidence: number;
        notes: string;
    }>;
}
//# sourceMappingURL=analogy.tools.d.ts.map