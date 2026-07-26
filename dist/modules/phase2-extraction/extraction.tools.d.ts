import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { EmbeddingsService } from '../../core/services/embeddings.service.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { ExtractClaimsInput } from '../../core/memory/session.schema.js';
/**
 * Phase 2: Paper Extraction Tools
 *
 * Extracts claims, methodologies, datasets, metrics, and technical parameters from papers.
 */
export declare class ExtractionTools {
    private memory;
    private embeddings;
    private semanticScholar;
    constructor(memory: MemoryStore, embeddings: EmbeddingsService, semanticScholar: SemanticScholarService);
    extractPaperClaims(input: ExtractClaimsInput & {
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        claimsCount: number;
        claims: {
            type: "finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result";
            paperId: string;
            extractedAt: string;
            claimId: string;
            text: string;
            confidence: number;
            evidence?: string | undefined;
        }[];
    }>;
    /**
     * Heuristic claim extraction from text.
     * In production, use LLM with structured output.
     */
    private extractClaims;
    extractMethodology(input: {
        paperId: string;
        abstract: string;
        fullText?: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        extractedAt: string;
        name: string;
        description: string;
        methodologyId: string;
        category: "experimental" | "theoretical" | "simulation" | "survey" | "literature-review" | "other";
        keyComponents: string[];
        datasets: string[];
        metrics: string[];
    }>;
    private extractMethodologyDetails;
    private extractMethodName;
    extractDatasets(input: {
        paperId: string;
        text: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        datasetCount: number;
        datasets: {
            paperId: string;
            name: string;
            datasetId: string;
            url?: string | undefined;
            description?: string | undefined;
            size?: string | undefined;
            domain?: string | undefined;
        }[];
    }>;
    extractMetrics(input: {
        paperId: string;
        text: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        metricCount: number;
        metrics: {
            paperId: string;
            name: string;
            metricId: string;
            value?: string | number | undefined;
            unit?: string | undefined;
            baseline?: string | undefined;
        }[];
    }>;
    extractTechnicalParameters(input: {
        paperId: string;
        fullText: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        extractedAt: string;
        other: Record<string, unknown>;
        paramsId: string;
        sensors: string[];
        samplingRateHz?: number | undefined;
        datasetSize?: number | undefined;
        hardwarePlatform?: string | undefined;
        powerBudgetMw?: number | undefined;
        latencyMs?: number | undefined;
        throughput?: string | undefined;
    }>;
    private extractParams;
    fetchPaperFullText(input: {
        paperId: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        available: boolean;
        reason: string;
        pageCount?: undefined;
        text?: undefined;
        textLength?: undefined;
    } | {
        paperId: string;
        available: boolean;
        pageCount: number;
        text: string;
        textLength: number;
        reason?: undefined;
    }>;
}
//# sourceMappingURL=extraction.tools.d.ts.map