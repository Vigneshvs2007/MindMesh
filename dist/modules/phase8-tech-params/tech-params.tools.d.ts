import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
/**
 * Phase 8: Technical Parameter Extractor (Stretch, for engineering topics)
 *
 * Extracts detailed technical parameters from papers (sensors, sampling rates, hardware, etc.)
 */
export declare class TechParamsTools {
    private memory;
    private semanticScholar;
    constructor(memory: MemoryStore, semanticScholar: SemanticScholarService);
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
    compareTechnicalParameters(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        parameterCount: number;
        message: string;
        paperCount?: undefined;
        sensors?: undefined;
        hasSamplingRate?: undefined;
        hasDatasetSize?: undefined;
        hasPowerBudget?: undefined;
        platforms?: undefined;
        parameters?: undefined;
    } | {
        sessionId: string;
        paperCount: number;
        sensors: string[];
        hasSamplingRate: boolean;
        hasDatasetSize: boolean;
        hasPowerBudget: boolean;
        platforms: string[];
        parameters: {
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
        }[];
        parameterCount?: undefined;
        message?: undefined;
    }>;
    fetchAndExtractTechParams(input: {
        paperId: string;
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
}
//# sourceMappingURL=tech-params.tools.d.ts.map