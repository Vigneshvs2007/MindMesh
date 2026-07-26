import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { EmbeddingsService } from '../../core/services/embeddings.service.js';
/**
 * Phase 4: Gap Finder Tools
 *
 * Assesses novelty and proposes research gaps.
 */
export declare class GapFinderTools {
    private memory;
    private embeddings;
    constructor(memory: MemoryStore, embeddings: EmbeddingsService);
    assessNovelty(input: {
        proposedClaim: string;
        sessionId: string;
        topK: number;
    }, ctx: ExecutionContext): Promise<{
        proposedClaim: string;
        noveltyScore: number;
        similarClaims: never[];
        note: string;
        maxSimilarity?: undefined;
        topSimilar?: undefined;
        assessment?: undefined;
    } | {
        proposedClaim: string;
        noveltyScore: number;
        maxSimilarity: number;
        topSimilar: {
            claimId: string;
            paperId: string | undefined;
            similarity: number;
            text: string;
        }[];
        assessment: string;
        similarClaims?: undefined;
        note?: undefined;
    }>;
    proposeGap(input: {
        topic: string;
        sessionId: string;
        excludedPaperIds?: string[];
    }, ctx: ExecutionContext): Promise<{
        gap: {
            status: "proposed" | "under-review" | "passed" | "rejected";
            evidence: string[];
            gapId: string;
            claim: string;
            noveltyScore: number;
            feasibility: number;
            impact: number;
            relatedPapers: string[];
            proposedAt: string;
            reviewIteration: number;
            reviewedAt?: string | undefined;
        };
        noveltyResult: {
            proposedClaim: string;
            noveltyScore: number;
            similarClaims: never[];
            note: string;
            maxSimilarity?: undefined;
            topSimilar?: undefined;
            assessment?: undefined;
        } | {
            proposedClaim: string;
            noveltyScore: number;
            maxSimilarity: number;
            topSimilar: {
                claimId: string;
                paperId: string | undefined;
                similarity: number;
                text: string;
            }[];
            assessment: string;
            similarClaims?: undefined;
            note?: undefined;
        };
        basis: {
            topThemes: string[];
            underexploredThemes: string[];
            contradictionCount: number;
        };
    }>;
    private generateGapClaim;
    rankGaps(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        rankedGaps: {
            gapId: string;
            claim: string;
            noveltyScore: number;
            feasibility: number;
            impact: number;
            compositeScore: number;
            status: "proposed" | "under-review" | "passed" | "rejected";
        }[];
    }>;
}
//# sourceMappingURL=gap-finder.tools.d.ts.map