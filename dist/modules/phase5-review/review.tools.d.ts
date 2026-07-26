import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { GapFinderTools } from '../phase4-gap-finder/gap-finder.tools.js';
/**
 * Phase 5: Adversarial Review Tools
 *
 * Core differentiator - actively searches for counter-evidence against proposed gaps.
 */
export declare class ReviewTools {
    private memory;
    private semanticScholar;
    private gapFinder;
    constructor(memory: MemoryStore, semanticScholar: SemanticScholarService, gapFinder: GapFinderTools);
    simulateAdversarialReview(input: {
        gapId: string;
        sessionId: string;
        adversarialQueries?: string[];
    }, ctx: ExecutionContext): Promise<{
        gapId: string;
        gapClaim: string;
        iteration: number;
        adversarialQueries: string[];
        papersFound: number;
        counterEvidence: string[];
        verdict: "PASS" | "OBJECTION";
        objections: string[];
        objectionStrength: number;
        confidence: number;
        reviewedAt: string;
    }>;
    private generateAdversarialQueries;
    private deduplicatePapers;
    private extractCounterEvidence;
    private generateReview;
    runGapReviewCycle(input: {
        topic: string;
        sessionId: string;
        maxRetries: number;
    }, ctx: ExecutionContext): Promise<{
        passed: boolean;
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
        } | {
            gapId: string;
            claim: string;
            evidence: never[];
            noveltyScore: number;
            feasibility: number;
            impact: number;
            relatedPapers: never[];
            status: "proposed";
            proposedAt: string;
            reviewedAt: undefined;
            reviewIteration: number;
        };
        finalReview: {
            gapId: string;
            gapClaim: string;
            iteration: number;
            adversarialQueries: string[];
            papersFound: number;
            counterEvidence: string[];
            verdict: "PASS" | "OBJECTION";
            objections: string[];
            objectionStrength: number;
            confidence: number;
            reviewedAt: string;
        };
        iterations: number;
        objections?: undefined;
        note?: undefined;
        error?: undefined;
    } | {
        passed: boolean;
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
        } | {
            gapId: string;
            claim: string;
            evidence: never[];
            noveltyScore: number;
            feasibility: number;
            impact: number;
            relatedPapers: never[];
            status: "proposed";
            proposedAt: string;
            reviewedAt: undefined;
            reviewIteration: number;
        };
        finalReview: {
            gapId: string;
            gapClaim: string;
            iteration: number;
            adversarialQueries: string[];
            papersFound: number;
            counterEvidence: string[];
            verdict: "PASS" | "OBJECTION";
            objections: string[];
            objectionStrength: number;
            confidence: number;
            reviewedAt: string;
        };
        objections: string[];
        iterations: number;
        note: string;
        error?: undefined;
    } | {
        passed: boolean;
        error: string;
        gap?: undefined;
        finalReview?: undefined;
        iterations?: undefined;
        objections?: undefined;
        note?: undefined;
    }>;
    private proposeGapLocally;
    getReviewHistory(input: {
        gapId: string;
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        gapId: string;
        sessionId: string;
        totalReviews: number;
        reviews: {
            reviewId: string;
            iteration: number;
            verdict: "PASS" | "OBJECTION";
            objections: string[];
            objectionStrength: number;
            confidence: number;
            reviewedAt: string;
        }[];
    }>;
}
//# sourceMappingURL=review.tools.d.ts.map