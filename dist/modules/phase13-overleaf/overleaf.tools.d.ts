import { ExecutionContext } from '@nitrostack/core';
import { OverleafService } from '../../core/services/overleaf.service.js';
import { MemoryStore } from '../../core/memory/memory.store.js';
/**
 * Phase 13: Overleaf Integration Tools (Mode 2)
 *
 * Manages Overleaf projects via Git bridge:
 * - Create project from IEEE template
 * - Push section content
 * - Pull limitations from reviewer objections
 * - Export project as ZIP
 */
export declare class OverleafTools {
    private overleaf;
    private memory;
    constructor(overleaf: OverleafService, memory: MemoryStore);
    createProject(input: {
        title: string;
        authors: string[];
        template?: 'ieee' | 'acm' | 'elsevier';
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        projectId: string;
        projectPath: string;
        title: string;
        authors: string[];
        template: "ieee" | "acm" | "elsevier" | undefined;
        sectionsInitialized: number;
    }>;
    pushSection(input: {
        section: string;
        content: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        section: string;
        pushed: boolean;
        contentLength: number;
    }>;
    pushLimitations(input: {
        objections: string[];
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        objectionsCount: number;
        pushed: boolean;
    }>;
    addBibliography(input: {
        bibtex: string;
        sessionId?: string;
    }, ctx: ExecutionContext): Promise<{
        entriesAdded: number;
        pushed: boolean;
    }>;
    syncSession(input: {
        sessionId: string;
        createIfMissing: boolean;
    }, ctx: ExecutionContext): Promise<{
        sessionId: string;
        projectCreated: boolean;
        sectionsSynced: number;
        hasBibliography: boolean;
        hasLimitations: boolean;
    }>;
    private extractSectionsFromSession;
}
//# sourceMappingURL=overleaf.tools.d.ts.map