import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 10: Writing Assistance Tools
 *
 * Checks academic tone, AI-generic phrasing, meaning preservation, and clarity.
 * Returns flags and suggestions - NEVER rewrites silently.
 */
export declare class WritingTools {
    private memory;
    constructor(memory: MemoryStore);
    checkWriting(input: {
        section: string;
        text: string;
        checkTypes: ('tone' | 'ai-generic' | 'meaning-preserved' | 'clarity')[];
        originalText?: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        section: string;
        checksPassed: number;
        totalChecks: number;
        checks: {
            checkId: string;
            type: "tone" | "ai-generic" | "meaning-preserved" | "clarity";
            passed: boolean;
            issues: string[];
            suggestions: string[];
        }[];
    }>;
    private checkTone;
    private checkAIGeneric;
    private checkMeaningPreserved;
    private extractKeyClaims;
    private claimsMatch;
    private checkClarity;
}
//# sourceMappingURL=writing.tools.d.ts.map