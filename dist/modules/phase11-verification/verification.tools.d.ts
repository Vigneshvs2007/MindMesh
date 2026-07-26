import { ExecutionContext } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 11: Research Verification Engine
 *
 * Aggregates verification checks for claims, citations, methodology consistency.
 */
export declare class VerificationTools {
    private memory;
    constructor(memory: MemoryStore);
    verifyClaim(input: {
        claimId: string;
        evidence: string[];
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        claimId: string;
        claimText: string;
        checkType: string;
        passed: boolean;
        detail: string;
        evidenceCount: number;
    }>;
    verifyCitation(input: {
        paperId: string;
        citationText: string;
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        paperId: string;
        passed: boolean;
        issues: string[];
        paperMetadata: {
            title: string;
            authors: string[];
            year: number;
        };
    }>;
    verifyMethodologyConsistency(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        passed: boolean;
        methodologyCount: number;
        issues: string[];
    }>;
    compileVerificationSummary(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        summary: string;
        totalChecks: number;
        passedChecks: number;
        failedChecks: number;
        byType: {
            type: string;
            passed: number;
            total: number;
            rate: string;
        }[];
        flaggedChecks: {
            checkId: string;
            type: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
            claimId: string;
            detail: string;
        }[];
    }>;
    runAllVerifications(input: {
        sessionId: string;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        claimVerifications: {
            claimId: string;
            claimText: string;
            checkType: string;
            passed: boolean;
            detail: string;
            evidenceCount: number;
        }[];
        citationVerifications: {
            paperId: string;
            passed: boolean;
            issues: string[];
            paperMetadata: {
                title: string;
                authors: string[];
                year: number;
            };
        }[];
        methodologyConsistency: {
            sessionId: string;
            passed: boolean;
            methodologyCount: number;
            issues: string[];
        };
        summary: {
            sessionId: string;
            summary: string;
            totalChecks: number;
            passedChecks: number;
            failedChecks: number;
            byType: {
                type: string;
                passed: number;
                total: number;
                rate: string;
            }[];
            flaggedChecks: {
                checkId: string;
                type: "claim-support" | "citation-accuracy" | "methodology-consistency" | "statistical-validity";
                claimId: string;
                detail: string;
            }[];
        };
    }>;
    private areContradictory;
}
//# sourceMappingURL=verification.tools.d.ts.map