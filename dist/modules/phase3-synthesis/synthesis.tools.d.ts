import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { EmbeddingsService } from '../../core/services/embeddings.service.js';
/**
 * Phase 3: Synthesis & Clustering Tools
 */
export declare class SynthesisTools {
    private memory;
    private embeddings;
    constructor(memory: MemoryStore, embeddings: EmbeddingsService);
    clusterPapers(input: {
        sessionId: string;
        paperIds?: string[];
        numClusters?: number;
        method?: 'kmeans' | 'hierarchical';
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        paperCount: number;
        clusterCount: number;
        clusters: {
            clusterId: string;
            label: string;
            paperCount: number;
            keyThemes: string[];
            summary: string | undefined;
        }[];
    }>;
    private extractThemes;
    private generateClusterSummary;
    findContradictoryClaims(input: {
        sessionId: string;
        claimIds?: string[];
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        checked: number;
        found: number;
        contradictions: {
            contradictionId: string;
            claimA: {
                claimId: string;
                text: string;
                paperId: string;
            };
            claimB: {
                claimId: string;
                text: string;
                paperId: string;
            };
            explanation: string;
            severity: "low" | "medium" | "high";
        }[];
    }>;
    private checkContradiction;
    synthesizeClusters(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        clusterCount: number;
        syntheses: {
            clusterId: string;
            label: string;
            paperCount: number;
            claimCount: number;
            themes: string[];
            summary: string | undefined;
            claimTypes: ("finding" | "method" | "limitation" | "assumption" | "hypothesis" | "result")[];
            keyFindings: string[];
            limitations: string[];
        }[];
        overallNarrative: string;
    }>;
    private generateOverallNarrative;
}
//# sourceMappingURL=synthesis.tools.d.ts.map