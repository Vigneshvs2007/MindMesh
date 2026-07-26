import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 6: Verdict & Resilience Score Tools
 *
 * Computes final verdict and resilience score after adversarial review.
 */
export declare class VerdictTools {
    private memory;
    constructor(memory: MemoryStore);
    computeResilienceScore(input: {
        gapId: string;
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        gapId: string;
        gapClaim: string;
        objectionStrength: number;
        closestPriorYear: number;
        citationDensity: number;
        recencyPenalty: number;
        rawScore: number;
        resilienceScore: number;
        formula: {
            explanation: string;
            objectionStrength: number;
            recencyPenalty: number;
            citationDensity: number;
        };
    }>;
    renderVerdict(input: {
        gapId: string;
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        gapId: string;
        gapClaim: string;
        finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
        resilienceScore: number;
        verdictId: string;
        iterations: number;
        objections: string[];
        reasoning: string;
        breakdown: {
            objectionStrength: number;
            recencyPenalty: number;
            citationDensityPenalty: number;
        };
        recommendations: string[];
    }>;
    private buildReasoning;
    private getRecommendations;
    getVerdictHistory(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        verdictCount: number;
        verdicts: {
            verdictId: string;
            gapId: string;
            finalVerdict: "PASS" | "CONDITIONAL" | "REJECT";
            resilienceScore: number;
            iterations: number;
            decidedAt: string;
        }[];
    }>;
}
//# sourceMappingURL=verdict.tools.d.ts.map